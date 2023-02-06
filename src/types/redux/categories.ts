import { Category, EditCategoryPayload } from '@/types/categories';

export interface CategoriesStore {
  categories: Category[];
}

export interface SetCategoriesAction {
  categories: Category[];
}

export interface AddCategoryAction {
  category: Category;
}

export interface EditCategoryAction {
  id: string;
  category: EditCategoryPayload;
}

export interface RemoveCategoryAction {
  id: string;
}
