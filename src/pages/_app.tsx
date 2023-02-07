import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isAxiosError } from 'axios';
import type { AppProps } from 'next/app';

import Header from '@/components/common/header';
import Toast from '@/components/common/toast';
import { wrapper } from '@/redux';
import { setCategories } from '@/redux/reducers/categories.reducer';
import { setIngredients } from '@/redux/reducers/ingredients.reducer';
import { setAllRecipes } from '@/redux/reducers/recipes.reducer';
import { showToast } from '@/redux/reducers/toast.reducer';
import {
  CategoriesService,
  IngredientsService,
  RecipesService,
} from '@/services';
import { CategoryType } from '@/types/categories';
import { TOAST_STATUS } from '@/types/redux/toast';

import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    const { ingredients } = await IngredientsService.getAll();
    const { recipes } = await RecipesService.getAll();
    const { categories: ingredientCategories } = await CategoriesService.getAll(
      CategoryType.INGREDIENT,
    );
    const { categories: recipeCategories } = await CategoriesService.getAll(
      CategoryType.RECIPE,
    );
    dispatch(setIngredients({ ingredients }));
    dispatch(
      setCategories({
        type: CategoryType.INGREDIENT,
        categories: ingredientCategories,
      }),
    );
    dispatch(
      setCategories({
        type: CategoryType.RECIPE,
        categories: recipeCategories,
      }),
    );
    dispatch(setAllRecipes({ recipes }));
    try {
    } catch (e) {
      if (isAxiosError(e)) {
        dispatch(
          showToast({
            status: TOAST_STATUS.ERROR,
            message: e.response?.data.message,
          }),
        );
      }
    } finally {
      setIsLoaded(true);
    }
  }, [dispatch]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  return (
    isLoaded && (
      <>
        <Header />
        <Toast />
        <Component {...pageProps} />
      </>
    )
  );
}

export default wrapper.withRedux(App);
