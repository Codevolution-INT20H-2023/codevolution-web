import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  AddRecipeAction,
  EditRecipeAction,
  RecipeStore,
  RemoveRecipeAction,
  SetAllRecipesAction,
  SetSingleRecipeAction,
} from '@/types/redux/recipes';

const initialState: RecipeStore = {
  recipes: [],
  current: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setAllRecipes: (state, { payload }: PayloadAction<SetAllRecipesAction>) => {
      state.recipes = payload.recipes;
    },
    setSingleRecipe: (
      state,
      { payload }: PayloadAction<SetSingleRecipeAction>,
    ) => {
      state.current = payload.recipe;
    },
    addRecipe: (state, { payload }: PayloadAction<AddRecipeAction>) => {
      state.recipes.push(payload.recipe);
    },
    editRecipe: (state, { payload }: PayloadAction<EditRecipeAction>) => {
      const index = state.recipes.findIndex(({ id }) => id === payload.id);
      state.recipes[index] = { ...state.recipes[index], ...payload.recipe };
    },
    removeRecipe: (state, { payload }: PayloadAction<RemoveRecipeAction>) => {
      state.current = null;
      state.recipes = state.recipes.filter(({ id }) => id !== payload.id);
    },
  },
});

export const {
  addRecipe,
  editRecipe,
  removeRecipe,
  setAllRecipes,
  setSingleRecipe,
} = recipesSlice.actions;
export default recipesSlice.reducer;
