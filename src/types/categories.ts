export enum CategoryType {
  INGREDIENT = 'ingredient',
  RECIPE = 'recipe',
}

export interface Category {
  id: string;
  name: string;
}

export interface GetAllQuery {
  search?: string;
}

export interface GetAllResponse {
  categories: Category[];
}

export interface CreateCategoryPayload {
  name: string;
}

export type CreateCategoryResponse = Category;

export interface EditCategoryPayload {
  name: string;
}

export type CreateCategoryForm = CreateCategoryPayload;
