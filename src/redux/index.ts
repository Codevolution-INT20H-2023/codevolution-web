import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from '@/redux/reducers/categories.reducer';
import ingredientsReducer from '@/redux/reducers/ingredients.reducer';
import toastReducer from '@/redux/reducers/toast.reducer';

const store = configureStore({
  reducer: {
    toast: toastReducer,
    ingredients: ingredientsReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
