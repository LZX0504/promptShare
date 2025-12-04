import { Prompt, CategoryNode } from './types';
import { PenTool, Code, Palette, Briefcase, MessageSquare, LayoutGrid } from 'lucide-react';

const TEXT_MODELS = [
  'ChatGPT', 'Gemini', 'Claude', 'Grok', 'DeepSeek', // International
  '豆包', '文心一言', 'Kimi', '通义千问', '智谱AI' // Chinese
];

const IMAGE_MODELS = [
  'Midjourney', 'Stable Diffusion', 'DALL-E', 'Flux', '即梦AI'
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

export const MOCK_PROMPTS: Prompt[] = [
  {
    id: '1',
    title: 'SEO 爆款文章生成器',
    description: '生成具有特定语气和结构的高排名 SEO 博客文章。',
    content: '作为一名专业的 SEO 文案撰写人。写一篇关于 [主题] 的 1500 字博客文章。在整篇文章中自然地使用关键字 [关键字]。使用 H2 和 H3 标签构建文章结构。语气应该专业且引人入胜。包括元描述和建议的标题标签。',
    tags: ['写作', 'ChatGPT', 'SEO'],
    author: 'AlexWriter',
    likes: 124,
    isPaid: false,
    createdAt: '2023-10-25',
    comments: [
      { id: 'c1', author: 'User123', content: '非常有用的提示词，排名提升很快！', createdAt: '2023-10-26' },
      { id: 'c2', author: 'ContentKing', content: '结构很清晰，推荐。', createdAt: '2023-10-27' }
    ]
  },
  {
    id: '2',
    title: 'Python 数据分析仪表盘',
    description: '生成用于可视化 CSV 数据的 Streamlit 仪表盘代码。',
    content: '编写一个使用 Streamlit 和 Pandas 的完整 Python 脚本，以创建一个交互式数据分析仪表板。该脚本应允许用户上传 CSV 文件，使用 Plotly 条形图和折线图可视化数据，并根据列值过滤数据框。包括对无效文件格式的错误处理。',
    tags: ['编程', 'DeepSeek', '数据分析'],
    author: 'DevMaster',
    likes: 89,
    isPaid: true,
    price: 19.9,
    createdAt: '2023-10-26',
    comments: []
  },
  {
    id: '3',
    title: 'Midjourney 超写实人像',
    description: '用于生成具有戏剧性照明的超写实人像的提示词。',
    content: '/imagine prompt: A hyper-realistic portrait of a futuristic cyberpunk warrior, neon lighting, rain-soaked streets in background, 8k resolution, cinematic lighting, shot on 35mm lens, f/1.8 --ar 16:9 --v 5.2',
    tags: ['绘画', 'Midjourney', '写实摄影'],
    author: 'ArtAI',
    likes: 342,
    isPaid: false,
    createdAt: '2023-10-27',
    comments: [
      { id: 'c3', author: 'DesignerX', content: '光影效果绝了。', createdAt: '2023-10-28' }
    ]
  },
  {
    id: '4',
    title: '知心姐姐 - 情感咨询',
    description: '一个富有同理心的情感咨询助手，帮助解决人际关系问题。',
    content: '你现在是一位经验丰富的心理咨询师，也被称为“知心姐姐”。请用温暖、包容、不评判的语气倾听用户的烦恼。针对用户提出的情感问题，首先表示共情，确认他们的感受，然后提供理性的分析和可行的建议。',
    tags: ['聊天', '豆包', '情感咨询', '心理'],
    author: 'LoveGuru',
    likes: 156,
    isPaid: true,
    price: 9.9,
    createdAt: '2023-10-28',
    comments: []
  },
  {
    id: '5',
    title: 'React 组件生成器',
    description: '生成带有 Tailwind 的干净、类型化的 React 函数组件。',
    content: '作为一名高级 React 工程师。使用 React、TypeScript 和 Tailwind CSS 创建一个可复用的 [组件名称] 组件。确保它具有可访问性（符合 a11y）并处理 [属性列表] 的 props。除 lucide-react 用于图标外，不要使用外部库。',
    tags: ['编程', 'Claude', 'Web开发'],
    author: 'ReactPro',
    likes: 210,
    isPaid: false,
    createdAt: '2023-10-29',
    comments: []
  },
  {
    id: '6',
    title: '英语口语陪练',
    description: '模拟雅思口语考试场景，帮助用户练习英语对话。',
    content: '你现在是雅思口语考官。请开始第一部分的考试，询问我关于 [话题] 的问题。每次只问一个问题，等待我回答后，纠正我的语法错误（如果有），给出更好的表达方式建议，然后继续下一个问题。',
    tags: ['聊天', 'Gemini', '教育'],
    author: 'TeacherLee',
    likes: 78,
    isPaid: false,
    createdAt: '2023-11-01',
    comments: [
      { id: 'c4', author: 'Student007', content: '对于备考雅思非常有帮助！', createdAt: '2023-11-02' }
    ]
  }
];