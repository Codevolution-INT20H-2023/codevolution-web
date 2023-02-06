import { Category } from '@/types/categories';

import { EditIngredientPayload, Ingredient } from '../ingredients';

export interface IngredientsStore {
  ingredients: Ingredient[];
}

export interface SetIngredientsAction {
  ingredients: Ingredient[];
}

export interface AddIngredientAction {
  ingredient: Ingredient;
}

export interface EditIngredientAction {
  ingredient: Omit<EditIngredientPayload, 'categoryId'> & {
    category?: Category;
  };
  id: string;
}

export interface RemoveIngredientAction {
  id: string;
}
