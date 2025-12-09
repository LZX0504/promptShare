import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API Client
// Note: We use the API_KEY from process.env as per strict instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Optimizes a rough prompt draft into a professional, high-quality prompt.
 * Uses the gemini-2.5-flash model for speed and efficiency.
 */
export const optimizePromptDraft = async (draft: string): Promise<string> => {
  if (!draft.trim()) return "";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `你是一位专业的提示词工程师（Prompt Engineer）。你的任务是将以下 AI 提示词的原始想法或草稿重写为一个高效、结构化且专业的提示词。
      
      规则：
      1. 提高清晰度、特异性和结构。
      2. 添加必要的背景或约束条件（例如，“作为...”，“格式为...”）。
      3. 保持像 [主题] 或 [关键字] 这样的占位符明显。
      4. 仅返回优化后的提示词文本。不要添加任何对话填充语。
      5. 请使用中文输出优化后的内容。

      原始草稿: "${draft}"`,
    });

    return response.text?.trim() || draft;
  } catch (error) {
    console.error("Failed to optimize prompt with Gemini:", error);
    // Fallback: return original draft if AI fails
    return draft;
  }
};

/**
 * Generates a batch of high-quality prompts for a specific category.
 * Returns a JSON array of prompt objects.
 */
export const generateBatchPrompts = async (category: string, count: number = 3): Promise<any[]> => {
  try {
    const prompt = `
      请作为一位资深的 Prompt Engineer，为"${category}"这个分类生成 ${count} 个高质量、专业且有趣的 AI 提示词（Prompt）。
      
      要求：
      1. 内容必须是中文。
      2. 覆盖该分类下的不同子领域（例如如果是编程，可以覆盖 Python, React, SQL 等）。
      3. 返回格式必须是严格的 JSON 数组，不要包含任何 Markdown 格式（如 \`\`\`json）。
      4. JSON 对象结构必须如下：
         {
           "title": "简短有吸引力的标题",
           "description": "一句话简介",
           "content": "完整的提示词内容，包含具体指令、角色设定和输出要求",
           "tags": ["标签1", "标签2", "${category}"]
         }
      5. 内容要有创意，不要生成千篇一律的通用模板。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "[]";
    
    // Clean up potential markdown code blocks if the model ignores the mime type instruction
    const jsonString = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to batch generate prompts:", error);
    return [];
  }
};