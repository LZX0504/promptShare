import { GoogleGenAI } from "@google/genai";

const STORAGE_KEY = 'user_provided_gemini_key';

// 穷举所有可能的模型版本，确保至少有一个能用
// 优先尝试 2.0 (新且快)，然后是 1.5 的各种变体
const MODELS_TO_TRY = [
  'gemini-2.0-flash-exp',
  'gemini-1.5-flash', 
  'gemini-1.5-flash-002',
  'gemini-1.5-flash-latest',
  'gemini-1.5-pro',
  'gemini-1.5-flash-8b'
];

export const setStoredApiKey = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, key.trim());
  }
};

const getApiKey = () => {
  // 1. Try browser local storage (User manually entered)
  if (typeof window !== 'undefined') {
    const storedKey = localStorage.getItem(STORAGE_KEY);
    if (storedKey) return storedKey;
  }

  // 2. Try standard Vite env var
  const meta = import.meta as any;
  if (meta && meta.env && meta.env.VITE_API_KEY) {
    return meta.env.VITE_API_KEY;
  }

  // 3. Try process.env (Legacy/Node)
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    return process.env.API_KEY;
  }
  
  return "";
};

// Helper to get the client dynamically
const getAIClient = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Helper function to try multiple models until one works.
 */
const generateContentWithFallback = async (prompt: string, isJsonMode: boolean = false) => {
    const ai = getAIClient();
    let lastError: any = null;

    for (const model of MODELS_TO_TRY) {
        try {
            console.log(`Trying model: ${model}...`);
            const response = await ai.models.generateContent({
                model: model,
                contents: prompt,
                config: isJsonMode ? { responseMimeType: "application/json" } : undefined
            });
            console.log(`Success with model: ${model}`);
            return response; // Success
        } catch (error: any) {
            console.warn(`Model ${model} failed:`, error);
            lastError = error;
            
            // Check for specific error types to decide whether to abort or continue
            const errorStr = String(error);
            const errorMsg = error.message || errorStr;

            // If it's an API Key/Auth error, don't try other models, fail immediately
            if (
                errorStr.includes('API key') || 
                errorStr.includes('403') || 
                errorStr.includes('401') ||
                errorMsg.includes('API_KEY_INVALID')
            ) {
                throw error;
            }
            
            // For 404 (Not Found) or 503 (Overloaded) or 429 (Quota), we continue to the next model
        }
    }
    throw lastError || new Error("All models failed. Please check your API Key or Quota.");
};

/**
 * Optimizes a rough prompt draft into a professional, high-quality prompt.
 */
export const optimizePromptDraft = async (draft: string): Promise<string> => {
  if (!draft.trim()) return "";

  try {
    const response = await generateContentWithFallback(
      `你是一位专业的提示词工程师（Prompt Engineer）。你的任务是将以下 AI 提示词的原始想法或草稿重写为一个高效、结构化且专业的提示词。
      
      规则：
      1. 提高清晰度、特异性和结构。
      2. 添加必要的背景或约束条件（例如，“作为...”，“格式为...”）。
      3. 保持像 [主题] 或 [关键字] 这样的占位符明显。
      4. 仅返回优化后的提示词文本。不要添加任何对话填充语。
      5. 请使用中文输出优化后的内容。

      原始草稿: "${draft}"`
    );

    return response.text?.trim() || draft;
  } catch (error: any) {
    console.error("Failed to optimize prompt with Gemini:", error);
    if (String(error).includes("MISSING_API_KEY")) throw error;
    // Don't throw others, just return original draft so user can continue
    return draft;
  }
};
