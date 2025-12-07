export interface User {
  id: string;
  name: string;
  avatar?: string;
  email: string;
}

export interface Comment {
  id: string;
  author_name: string;
  author_id?: string;
  content: string;
  created_at: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  author_name: string;
  author_id?: string;
  likes: number;
  is_paid: boolean;
  price?: number;
  created_at: string;
  comments?: Comment[];
}

export type MainCategory = '全部' | '写作' | '编程' | '绘画' | '商业' | '聊天' | '视频';

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