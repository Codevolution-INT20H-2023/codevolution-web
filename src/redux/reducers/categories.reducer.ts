import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoryType } from '@/types/categories';
import {
  AddCategoryAction,
  CategoriesStore,
  EditCategoryAction,
  RemoveCategoryAction,
  SetCategoriesAction,
} from '@/types/redux/categories';

const initialState: CategoriesStore = {
  categories: {
    [CategoryType.INGREDIENT]: [],
    [CategoryType.RECIPE]: [],
  },
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, { payload }: PayloadAction<SetCategoriesAction>) => {
      state.categories[payload.type] = payload.categories;
    },
    addCategory: (state, { payload }: PayloadAction<AddCategoryAction>) => {
      state.categories[payload.type].push(payload.category);
    },
    editCategory: (state, { payload }: PayloadAction<EditCategoryAction>) => {
      const index = state.categories[payload.type].findIndex(
        ({ id }) => id === payload.id,
      );
      state.categories[payload.type][index] = {
        ...state.categories[payload.type][index],
        ...payload.category,
      };
    },
    removeCategory: (
      state,
      { payload }: PayloadAction<RemoveCategoryAction>,
    ) => {
      state.categories[payload.type] = state.categories[payload.type].filter(
        ({ id }) => id !== payload.id,
      );
    },
  },
});

export const { addCategory, editCategory, removeCategory, setCategories } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
