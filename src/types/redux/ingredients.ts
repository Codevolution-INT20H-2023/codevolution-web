import { EditIngredientPayload, Ingredient } from '../ingredients';

export interface IngredientsStore {
  ingredients: Ingredient[];
}

export interface AddIngredientAction {
  ingredient: Ingredient;
}

export interface EditIngredientAction {
  ingredient: EditIngredientPayload;
  id: string;
}

export interface RemoveIngredientAction {
  id: string;
}
