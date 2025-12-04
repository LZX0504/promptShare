export interface User {
  id: string;
  name: string;
  avatar?: string;
  email: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  author: string;
  likes: number;
  isPaid: boolean;
  price?: number; // In CNY
  createdAt: string;
  comments: Comment[];
}

export type MainCategory = '全部' | '写作' | '编程' | '绘画' | '商业' | '聊天';

export interface CategoryNode {
  name: MainCategory;
  icon?: any;
  subCategories: string[];
}

export interface CreatePromptForm {
  title: string;
  description: string;
  content: string;
  tags: string;
  isPaid: boolean;
  price: string;
}