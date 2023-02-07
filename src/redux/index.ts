import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import categoriesReducer from '@/redux/reducers/categories.reducer';
import ingredientsReducer from '@/redux/reducers/ingredients.reducer';
import productsReducer from '@/redux/reducers/products.reducer';
import recipesReducer from '@/redux/reducers/recipes.reducer';
import toastReducer from '@/redux/reducers/toast.reducer';
import userRecipesReducer from '@/redux/reducers/user-recipes.reducer';

const makeStore = () =>
  configureStore({
    reducer: {
      toast: toastReducer,
      ingredients: ingredientsReducer,
      categories: categoriesReducer,
      recipes: recipesReducer,
      products: productsReducer,
      userRecipes: userRecipesReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
