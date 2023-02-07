import { Category } from '@/types/categories';
import { MeasureType } from '@/types/common';

export interface Product {
  ingredient: {
    id: string;
    name: string;
    category: Category;
  };
  amount: number;
  measure: MeasureType;
}

export interface Recipe {
  id: string;
  name: string;
  category: Category;
  difficulty: number;
  description: string;
  products: Product[];
}

export interface GetAllResponse {
  recipes: Recipe[];
}

export type GetOneResponse = Recipe;

export interface CreateRecipePayload {
  name: string;
  description: string;
  difficulty: number;
  categoryId: string;
  products: {
    ingredientId: string;
    amount: number;
    measure: MeasureType;
  }[];
}

export type CreateRecipeResponse = Recipe;

export interface EditRecipePayload {
  name: string;
  description: string;
  difficulty: number;
  categoryId: string;
  products: {
    ingredientId: string;
    amount: number;
    measure: MeasureType;
  }[];
}

export interface GridRecipe {
  id: string;
  index: number;
  name: string;
  category: string;
  difficulty: number;
  recipe: Recipe;
}

export interface ModifyRecipeForm
  extends Omit<Recipe, 'id' | 'category' | 'products'> {
  categoryId: string;
  products: {
    ingredientId: string;
    amount: number;
    measure: MeasureType;
  }[];
}
