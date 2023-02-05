import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  AddIngredientAction,
  EditIngredientAction,
  IngredientsStore,
  RemoveIngredientAction,
} from '@/types/redux/ingredients';

const initialState: IngredientsStore = {
  ingredients: [],
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredient: (state, { payload }: PayloadAction<AddIngredientAction>) => {
      state.ingredients.push(payload.ingredient);
    },
    editIngredient: (
      state,
      { payload }: PayloadAction<EditIngredientAction>,
    ) => {
      const index = state.ingredients.findIndex(({ id }) => id === payload.id);
      state.ingredients[index] = {
        ...state.ingredients[index],
        ...payload.ingredient,
      };
    },
    removeIngredient: (
      state,
      { payload }: PayloadAction<RemoveIngredientAction>,
    ) => {
      state.ingredients = state.ingredients.filter(
        ({ id }) => id !== payload.id,
      );
    },
  },
});

export const { addIngredient, editIngredient, removeIngredient } =
  ingredientsSlice.actions;
export default ingredientsSlice.reducer;
