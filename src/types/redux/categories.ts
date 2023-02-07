import {
  Category,
  CategoryType,
  EditCategoryPayload,
} from '@/types/categories';

export interface CategoriesStore {
  categories: Record<CategoryType, Category[]>;
}

export interface SetCategoriesAction {
  type: CategoryType;
  categories: Category[];
}

export interface AddCategoryAction {
  type: CategoryType;
  category: Category;
}

export interface EditCategoryAction {
  id: string;
  type: CategoryType;
  category: EditCategoryPayload;
}

export interface RemoveCategoryAction {
  id: string;
  type: CategoryType;
}
