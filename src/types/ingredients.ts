import { Category } from '@/types/categories';

export enum MeasureType {
  KILOGRAMMS = 'KILOGRAMMS',
  LITERS = 'LITERS',
  GRAMMS = 'GRAMMS',
  MILLILITERS = 'MILLILITERS',
  PIECES = 'PIECES',
  BUNCH = 'BUNCH',
  TABLE_SPOON = 'TABLE_SPOON',
  TEA_SPOON = 'TEA_SPOON',
  CUP = 'CUP',
  PINCH = 'PINCH',
  CLOVE = 'CLOVE',
}

export const MeasureTypeMapper = {
  [MeasureType.KILOGRAMMS]: 'кг',
  [MeasureType.LITERS]: 'л',
  [MeasureType.GRAMMS]: 'г',
  [MeasureType.MILLILITERS]: 'мл',
  [MeasureType.PIECES]: 'шт',
  [MeasureType.BUNCH]: 'пучок',
  [MeasureType.TABLE_SPOON]: 'столова ложка',
  [MeasureType.TEA_SPOON]: 'чайна ложка',
  [MeasureType.CUP]: 'чашка',
  [MeasureType.PINCH]: 'щіпка',
  [MeasureType.CLOVE]: 'зубчик',
};

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
  standard: string;
  ingredient: Ingredient;
}

export interface ModifyIngredientForm
  extends Omit<Ingredient, 'id' | 'category'> {
  categoryId: string;
  measures: Measure[];
}
