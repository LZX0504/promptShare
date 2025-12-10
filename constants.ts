import { CategoryNode } from './types';
import { PenTool, Code, Palette, Briefcase, MessageSquare, LayoutGrid, Video } from 'lucide-react';

const TEXT_MODELS = [
  'ChatGPT', 'Gemini', 'Claude', 'Grok', 'DeepSeek', // International & Hot
  '豆包', '文心一言', 'Kimi', '通义千问', '智谱AI', '秘塔' // Chinese
];

const IMAGE_MODELS = [
  'Midjourney', 'Stable Diffusion', 'DALL-E', 'Flux', '即梦AI'
];

const VIDEO_MODELS = [
  'Sora', 'Runway', 'Pika', 'Luma', '可灵 AI', 'Vidu', 'Haiper'
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
