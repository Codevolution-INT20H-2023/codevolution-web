import { Ingredient, MeasureType } from '@/types/ingredients';
import { Recipe } from '@/types/recipes';

export interface Product {
  ingredient: Omit<Ingredient, 'measures'>;
  amount: number;
}

export interface CreateProductPayload {
  ingredientId: string;
  amount: number;
}

export type CreateProductResponse = Product;

export interface EditProductPayload {
  amount: number;
}

export interface getAllProductsResponse {
  products: Product[];
}

export type getOneProductResponse = Product;

export interface getAllRecipesResponse {
  recipes: Recipe[];
}

export interface GridProduct {
  id: string;
  index: number;
  name: string;
  category: string;
  measure: MeasureType;
  amount: number;
  product: Product;
}

export interface ModifyProductForm {
  ingredientId: string;
  amount: number;
  measure: MeasureType;
}
