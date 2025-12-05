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