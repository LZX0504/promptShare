import { Prompt, CategoryNode } from './types';
import { PenTool, Code, Palette, Briefcase, MessageSquare, LayoutGrid, Video } from 'lucide-react';

const TEXT_MODELS = [
  'ChatGPT', 'Gemini', 'Claude', 'Grok', 'DeepSeek', // International
  '豆包', '文心一言', 'Kimi', '通义千问', '智谱AI' // Chinese
];

const IMAGE_MODELS = [
  'Midjourney', 'Stable Diffusion', 'DALL-E', 'Flux', '即梦AI'
];

const VIDEO_MODELS = [
  'Sora', 'Runway', 'Pika', 'Luma', '可灵 AI', 'Vidu'
];

export const CATEGORY_DATA: CategoryNode[] = [
  { 
    name: '全部', 
    icon: LayoutGrid,
    subCategories: [] 
  },
  { 
    name: '写作', 
    icon: PenTool,
    subCategories: TEXT_MODELS
  },
  { 
    name: '编程', 
    icon: Code,
    subCategories: TEXT_MODELS
  },
  { 
    name: '绘画', 
    icon: Palette,
    subCategories: IMAGE_MODELS
  },
  { 
    name: '视频',
    icon: Video,
    subCategories: VIDEO_MODELS
  },
  { 
    name: '商业', 
    icon: Briefcase,
    subCategories: TEXT_MODELS
  },
  { 
    name: '聊天', 
    icon: MessageSquare,
    subCategories: TEXT_MODELS
  }
];

// High quality seed data for database population
export const SAMPLE_PROMPTS: Omit<Prompt, 'id' | 'created_at' | 'comments' | 'author_name' | 'author_id'>[] = [
  {
    title: '小红书爆款文案生成器',
    description: '一键生成吸引眼球的小红书风格种草文案，包含Emoji和标签。',
    content: '你现在是小红书爆款文案写手。请针对 [产品/主题] 写一篇种草笔记。要求：\n1. 标题要足够吸引人，使用感叹号和夸张语气。\n2. 正文多使用Emoji表情，段落短小精悍。\n3. 语气亲切活泼，像闺蜜聊天。\n4. 结尾加上相关的热门标签 #。\n5. 重点突出产品的 [核心卖点]。',
    tags: ['写作', 'ChatGPT', '小红书', '营销'],
    likes: 342,
    is_paid: false,
    price: 0
  },
  {
    title: 'Python 全能爬虫脚本',
    description: '基于 Scrapy 或 BeautifulSoup 的通用网页爬虫框架代码。',
    content: '请写一个 Python 爬虫脚本，用于抓取 [目标网站 URL] 的数据。要求：\n1. 使用 requests 和 BeautifulSoup 库。\n2. 包含 User-Agent 伪装，防止被反爬。\n3. 将抓取到的 [具体字段] 保存为 CSV 文件。\n4. 添加异常处理机制 (try-except)。\n5. 代码需要有详细的中文注释。',
    tags: ['编程', 'DeepSeek', 'Python', '爬虫'],
    likes: 89,
    is_paid: true,
    price: 19.9
  },
  {
    title: 'Midjourney 赛博朋克少女',
    description: '生成高质量、电影感的赛博朋克风格人物肖像。',
    content: '/imagine prompt: A futuristic cyberpunk girl with neon glowing hair, standing in a rainy Tokyo street at night, reflection in puddles, cinematic lighting, volumetric fog, high detail, 8k resolution, photorealistic, unreal engine 5 render, cyberpunk 2077 style --ar 9:16 --v 6.0',
    tags: ['绘画', 'Midjourney', '赛博朋克', '人像'],
    likes: 520,
    is_paid: false,
    price: 0
  },
  {
    title: 'Sora 电影级视频提示词',
    description: '生成具有电影质感的 60s 长视频提示词，包含运镜描述。',
    content: 'A stylish woman walks down a Tokyo street filled with warm glowing neon and animated city signage. She wears a black leather jacket, a long red dress, and black boots, and carries a black purse. She wears sunglasses and red lipstick. She walks confidently and casually. The street is damp and reflective, creating a mirror effect of the colorful lights. Many pedestrians walk about.',
    tags: ['视频', 'Sora', '电影感', '写实'],
    likes: 888,
    is_paid: true,
    price: 29.9
  },
  {
    title: '商业计划书 (BP) 撰写助手',
    description: '为创业项目生成专业的商业计划书大纲和核心内容。',
    content: '作为一名资深投资经理，请帮我为 [项目名称] 写一份商业计划书大纲。项目属于 [行业领域]。请包含以下部分：\n1. 项目痛点与解决方案\n2. 市场规模分析 (TAM/SAM/SOM)\n3. 核心商业模式\n4. 竞争对手分析\n5. 融资计划与资金用途\n请用专业、客观的商业语言撰写。',
    tags: ['商业', 'Claude', '创业', 'BP'],
    likes: 156,
    is_paid: true,
    price: 15.0
  },
  {
    title: 'React + Tailwind 组件生成',
    description: '快速生成美观、响应式的 React UI 组件代码。',
    content: '请使用 React (TypeScript) 和 Tailwind CSS 编写一个 [组件名称，如：登录卡片]。\n要求：\n1. 界面现代简洁，黑白灰配色。\n2. 包含响应式设计 (Mobile First)。\n3. 使用 Lucide React 图标。\n4. 代码完全模块化，可以直接复制使用。\n5. 不要使用额外的 CSS 文件。',
    tags: ['编程', 'ChatGPT', 'React', 'Frontend'],
    likes: 210,
    is_paid: false,
    price: 0
  },
  {
    title: '私人英语口语教练',
    description: '模拟雅思/托福口语考试场景，进行一对一对话练习。',
    content: '你现在是我的英语口语私教。请以 [话题，如：旅游] 为主题与我进行对话。\n规则：\n1. 你先问我一个问题。\n2. 等我回答后，指出我的语法错误（如果有）并给出更地道的表达方式。\n3. 然后继续问下一个问题。\n4. 保持对话轻松自然，但富有教育意义。',
    tags: ['聊天', 'Gemini', '英语学习', '教育'],
    likes: 78,
    is_paid: false,
    price: 0
  },
  {
    title: 'SWOT 分析专家',
    description: '对任何公司、产品或个人进行深度 SWOT 分析。',
    content: '请对 [公司/产品名称] 进行详细的 SWOT 分析。\n- Strengths (优势): 列出内部核心竞争力。\n- Weaknesses (劣势): 列出内部短板。\n- Opportunities (机会): 列出外部市场机会。\n- Threats (威胁): 列出外部竞争威胁。\n最后请给出基于分析的 3 条战略建议。',
    tags: ['商业', '通义千问', '分析', '策略'],
    likes: 95,
    is_paid: false,
    price: 0
  },
  {
    title: '可灵 AI 功夫熊猫视频',
    description: '生成中国风武侠动作视频的提示词。',
    content: '一只穿着中国古代侠客长袍的熊猫，在竹林中练习太极拳。动作流畅自然，竹叶随风飘落，光影斑驳。高画质，电影级构图，特写镜头捕捉熊猫的眼神和手部动作，背景虚化。4k resolution, highly detailed.',
    tags: ['视频', '可灵 AI', '国潮', '动画'],
    likes: 330,
    is_paid: false,
    price: 0
  },
  {
    title: '塔罗牌占卜师',
    description: '神秘风格的塔罗牌解读，提供心理暗示和指引。',
    content: '你是一位神秘的塔罗牌占卜师。我心里默念的问题是：[输入问题]。\n请随机抽取三张牌（过去、现在、未来），并为我详细解读牌面含义。解读风格需要神秘、充满隐喻，同时给出积极的心理暗示和生活指引。',
    tags: ['聊天', 'Claude', '占卜', '娱乐'],
    likes: 112,
    is_paid: false,
    price: 0
  }
];

// Fallback for UI before DB load (empty now as we prefer DB data)
export const MOCK_PROMPTS: Prompt[] = [];