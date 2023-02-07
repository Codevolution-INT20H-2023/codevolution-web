import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  SetAllUserRecipesAction,
  UserRecipeStore,
} from '@/types/redux/recipes';

const initialState: UserRecipeStore = {
  availableRecipes: [],
};

const userRecipesSlice = createSlice({
  name: 'user-recipes',
  initialState,
  reducers: {
    setUserRecipes: (
      state,
      { payload }: PayloadAction<SetAllUserRecipesAction>,
    ) => {
      state.availableRecipes = payload.availableRecipes;
    },
  },
});

export const { setUserRecipes } = userRecipesSlice.actions;
export default userRecipesSlice.reducer;
