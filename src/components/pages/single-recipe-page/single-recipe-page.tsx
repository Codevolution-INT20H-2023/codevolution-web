import { FC, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';

import RecipeForm from '@/components/pages/recipes-page/components/recipe-form';
import { useAppSelector } from '@/hooks';
import { editRecipe } from '@/redux/reducers/recipes.reducer';
import { showToast } from '@/redux/reducers/toast.reducer';
import { RecipesService } from '@/services';
import { Category } from '@/types/categories';
import { ROUTES } from '@/types/common';
import { Ingredient } from '@/types/ingredients';
import { EditRecipePayload, Recipe } from '@/types/recipes';
import { TOAST_STATUS } from '@/types/redux/toast';

const SingleRecipePage: FC = () => {
  const { push, query } = useRouter();
  const recipeId = query.id;

  const { recipes } = useAppSelector(state => state.recipes);
  const categories = useAppSelector(
    state => state.categories.categories.recipe,
  );
  const { ingredients } = useAppSelector(state => state.ingredients);

  const dispatch = useDispatch();

  const recipe = useMemo(
    () => recipes.find(({ id }) => id === recipeId) as Recipe,
    [recipes, recipeId],
  );

  const onSubmit = useCallback(
    async (data: EditRecipePayload) => {
      try {
        await RecipesService.edit(recipeId as string, data);
        dispatch(
          editRecipe({
            id: recipeId as string,
            recipe: {
              name: data.name,
              category: categories.find(
                category => category.id === data.categoryId,
              ) as Category,
              description: data.description,
              difficulty: data.difficulty,
              products: data.products.map(
                ({ ingredientId, measure, amount }) => ({
                  amount,
                  measure,
                  ingredient: ingredients.find(
                    item => item.id === ingredientId,
                  ) as Ingredient,
                }),
              ),
            },
          }),
        );
        await push(ROUTES.RECIPES);
      } catch (e) {
        if (isAxiosError(e)) {
          dispatch(
            showToast({
              status: TOAST_STATUS.ERROR,
              message: e.response?.data.message,
            }),
          );
        }
      }
    },
    [categories, dispatch, ingredients, push, recipeId],
  );

  return <RecipeForm onSubmit={onSubmit} recipe={recipe} />;
};

export default SingleRecipePage;
