import { Category } from '@/types/categories';
import {
  CreateRecipeResponse,
  EditRecipePayload,
  Product,
  Recipe,
} from '@/types/recipes';

export interface UserRecipeStore {
  availableRecipes: Recipe[];
}

export interface RecipeStore {
  recipes: Recipe[];
  current: Recipe | null;
}

export interface SetAllRecipesAction {
  recipes: Recipe[];
}

export interface SetAllUserRecipesAction {
  availableRecipes: Recipe[];
}

export interface AddRecipeAction {
  recipe: CreateRecipeResponse;
}

export interface EditRecipeAction {
  id: string;
  recipe: Omit<EditRecipePayload, 'categoryId' | 'products'> & {
    category: Category;
    products: Product[];
  };
}

export interface RemoveRecipeAction {
  id: string;
}

export interface SetSingleRecipeAction {
  recipe: Recipe;
}
