import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';

import RecipeForm from '@/components/pages/recipes-page/components/recipe-form';
import { addRecipe } from '@/redux/reducers/recipes.reducer';
import { showToast } from '@/redux/reducers/toast.reducer';
import { RecipesService } from '@/services';
import { ROUTES } from '@/types/common';
import { CreateRecipePayload } from '@/types/recipes';
import { TOAST_STATUS } from '@/types/redux/toast';

const CreateRecipe: FC = () => {
  const { push } = useRouter();

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    async (data: CreateRecipePayload) => {
      try {
        const recipe = await RecipesService.create(data);
        dispatch(addRecipe({ recipe }));
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
    [dispatch, push],
  );

  return <RecipeForm onSubmit={onSubmit} />;
};

export default CreateRecipe;
