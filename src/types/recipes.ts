import { Category } from '@/types/categories';

export interface Recipe {
  id: string;
  name: string;
  category: Category;
  difficulty: number;
  description: string;
}
