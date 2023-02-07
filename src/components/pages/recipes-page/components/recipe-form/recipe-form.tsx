import { FC, useCallback, useMemo } from 'react';
import { Alert, MenuItem } from '@mui/material';
import { FieldArray, Formik } from 'formik';

import Button from '@/components/common/button';
import {
  FormButtonsContainer,
  FormField,
  FormWrapper,
} from '@/components/common/form';
import { transformIngredients } from '@/components/pages/recipes-page/components/recipe-form/utils';
import { useAppSelector } from '@/hooks';
import {
  CreateRecipePayload,
  EditRecipePayload,
  ModifyRecipeForm,
  Recipe,
} from '@/types/recipes';

import { MeasureOptions } from './constants';
import * as Styled from './recipe-form.styled';
import { validationSchema } from './validation';

interface RecipeFormProps {
  recipe?: Recipe;
  onSubmit: (data: CreateRecipePayload | EditRecipePayload) => Promise<void>;
}

const RecipeForm: FC<RecipeFormProps> = ({ recipe, onSubmit }) => {
  const { ingredients } = useAppSelector(state => state.ingredients);
  const categories = useAppSelector(
    state => state.categories.categories.recipe,
  );

  const formattedIngredients = useMemo(
    () => transformIngredients(ingredients),
    [ingredients],
  );

  const initialValues: ModifyRecipeForm = useMemo(
    () => ({
      name: recipe?.name || '',
      categoryId: recipe?.category.id || '',
      description: recipe?.description || '',
      difficulty: recipe?.difficulty || 0,
      products:
        recipe?.products.map(({ amount, ingredient, measure }) => ({
          amount,
          measure,
          ingredientId: ingredient.id,
        })) || [],
    }),
    [recipe],
  );

  const handleSubmit = useCallback(
    async (data: ModifyRecipeForm) => {
      await onSubmit({
        ...data,
        difficulty: +data.difficulty,
        products: data.products.map(({ amount, ingredientId, measure }) => ({
          measure,
          ingredientId,
          amount: +amount,
        })),
      });
    },
    [onSubmit],
  );

  if (!categories.length) {
    return (
      <Alert severity="error">
        Для того щоб створити рецепт, спершу створіть категорію
      </Alert>
    );
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      validateOnChange
    >
      {({ isSubmitting, handleSubmit, values }) => (
        <FormWrapper onSubmit={handleSubmit}>
          <FormField required name="name" label="Назва" />
          <FormField required name="description" label="Опис" />
          <FormField
            required
            name="difficulty"
            label="Складність"
            type="number"
          />
          <FormField required name="categoryId" select label="Категорія">
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </FormField>

          <FieldArray
            name="products"
            render={({ pop, push }) => (
              <Styled.ArrayContainer>
                {values.products.map((item, index) => (
                  <Styled.ArrayItem key={item.measure}>
                    <FormField
                      name={`products.${index}.amount`}
                      required
                      type="number"
                      label="Кількість"
                    />
                    <FormField
                      name={`products.${index}.measure`}
                      required
                      select
                      label="Міра виміру"
                    >
                      {MeasureOptions.filter(
                        option =>
                          option.value === values.products[index].measure ||
                          !values.products.find(
                            v => v.measure === option.value,
                          ),
                      ).map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </FormField>
                    <FormField
                      name={`products.${index}.ingredientId`}
                      required
                      select
                      label="Інгредієнт"
                    >
                      {formattedIngredients
                        .filter(
                          option =>
                            option.value ===
                              values.products[index].ingredientId ||
                            !values.products.find(
                              v => v.ingredientId === option.value,
                            ),
                        )
                        .map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </FormField>
                  </Styled.ArrayItem>
                ))}
                <FormButtonsContainer>
                  <Button
                    text="+"
                    variant="text"
                    onClick={() =>
                      push({ amount: 0, measure: '', ingredientId: '' })
                    }
                  />
                  <Button text="-" variant="text" color="error" onClick={pop} />
                </FormButtonsContainer>
              </Styled.ArrayContainer>
            )}
          />

          <FormButtonsContainer>
            <Button
              text="Зберегти"
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </FormButtonsContainer>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default RecipeForm;
