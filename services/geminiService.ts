import { GoogleGenAI } from "@google/genai";

// ⚠️ SECURITY NOTE: Ideally, use environment variables (VITE_API_KEY) in Vercel.
// However, to ensure the app works immediately for you, we are using the provided key as a fallback.
const FALLBACK_KEY = 'AIzaSyD1GzwLXgdv4b-I2WNFBVbg2qnZDopBc5E';

const getApiKey = () => {
  // 1. Try standard Vite env var (Recommended for Vercel)
  // We use optional chaining and typeof check to prevent crashes in non-Vite environments
  // Cast import.meta to any to resolve TS error: Property 'env' does not exist on type 'ImportMeta'
  const meta = import.meta as any;
  if (meta && meta.env && meta.env.VITE_API_KEY) {
    return meta.env.VITE_API_KEY;
  }
  
  // 2. Try process.env (Legacy/Node/Next.js)
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    return process.env.API_KEY;
  }
  
  // 3. Use provided fallback
  return FALLBACK_KEY;
};

const apiKey = getApiKey();

if (!apiKey) {
  console.error("Gemini API Key is missing! AI features will not work.");
}

// Initialize Gemini API Client
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

/**
 * Optimizes a rough prompt draft into a professional, high-quality prompt.
 * Uses the gemini-1.5-flash model for speed and compatibility.
 */
export const optimizePromptDraft = async (draft: string): Promise<string> => {
  if (!draft.trim()) return "";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash', // CHANGED: 2.5 -> 1.5 for stability
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
      model: 'gemini-1.5-flash', // CHANGED: 2.5 -> 1.5 for stability
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "[]";
    
    // Clean up potential markdown code blocks if the model ignores the mime type instruction
    const jsonString = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse JSON from AI response:", text);
        return [];
    }
  } catch (error: any) {
    console.error("Failed to batch generate prompts:", error);
    // Throw error so UI knows something went wrong
    throw new Error(error.message || "Unknown API Error");
  }
};