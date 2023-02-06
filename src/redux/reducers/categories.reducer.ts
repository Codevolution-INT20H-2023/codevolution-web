import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  AddCategoryAction,
  CategoriesStore,
  EditCategoryAction,
  RemoveCategoryAction,
  SetCategoriesAction,
} from '@/types/redux/categories';

const initialState: CategoriesStore = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, { payload }: PayloadAction<SetCategoriesAction>) => {
      state.categories = payload.categories;
    },
    addCategory: (state, { payload }: PayloadAction<AddCategoryAction>) => {
      state.categories.push(payload.category);
    },
    editCategory: (state, { payload }: PayloadAction<EditCategoryAction>) => {
      const index = state.categories.findIndex(({ id }) => id === payload.id);
      state.categories[index] = {
        ...state.categories[index],
        ...payload.category,
      };
    },
    removeCategory: (
      state,
      { payload }: PayloadAction<RemoveCategoryAction>,
    ) => {
      state.categories = state.categories.filter(({ id }) => id !== payload.id);
    },
  },
});

export const { addCategory, editCategory, removeCategory, setCategories } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
