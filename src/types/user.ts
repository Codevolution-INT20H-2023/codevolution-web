import { Category } from '@/types/categories';
import { MeasureType } from '@/types/ingredients';
import { Recipe } from '@/types/recipes';

export interface Product {
  ingredient: {
    id: string;
    name: string;
    category: Category;
  };
  amount: number;
  measure: MeasureType;
}

export interface CreateProductPayload {
  ingredientId: string;
  amount: number;
}

export type CreateProductResponse = Product;

export interface editProductPayload {
  amount: number;
}

export interface getAllProductsResponse {
  products: Product[];
}

export type getOneProductResponse = Product;

export interface getAllRecipesResponse {
  recipes: Recipe[];
}
