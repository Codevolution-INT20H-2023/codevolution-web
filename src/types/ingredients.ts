import { Category } from '@/types/categories';
import { MeasureType } from '@/types/common';

export interface Measure {
  measure: MeasureType;
  toStandard: number;
}

export interface Ingredient {
  id: string;
  name: string;
  standard: MeasureType;
  category: Category;
  measures?: Measure[];
}

export interface GetAllQuery {
  search?: string;
  measures?: boolean;
  category?: boolean;
}

export interface GetAllResponse {
  ingredients: Ingredient[];
}

export interface GetOneQuery {
  measures?: boolean;
}

export type GetOneResponse = Ingredient;

export interface CreateIngredientPayload {
  name: string;
  standard: MeasureType;
  categoryId: string;
  measures?: Measure[];
}

export type CreateIngredientResponse = Ingredient;

export interface EditIngredientPayload {
  name: string;
  standard: MeasureType;
  categoryId: string;
  measures?: Measure[];
}

export interface GridIngredient {
  id: string;
  index: number;
  name: string;
  category: string;
  standard: MeasureType;
  ingredient: Ingredient;
}

export interface ModifyIngredientForm
  extends Omit<Ingredient, 'id' | 'category'> {
  categoryId: string;
  measures: Measure[];
}
