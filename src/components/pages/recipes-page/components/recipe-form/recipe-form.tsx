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
import { Ingredient } from '@/types/ingredients';
import {
  CreateRecipePayload,
  EditRecipePayload,
  ModifyRecipeForm,
  Recipe,
} from '@/types/recipes';

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

  const getIngredientMeasures = useCallback(
    (ingredientId: string) => {
      if (!ingredientId) return [];

      const ingredient = ingredients.find(
        ({ id }) => id === ingredientId,
      ) as Ingredient;
      const measures = ingredient.measures;
      const standard = ingredient.standard;

      if (measures?.length) {
        return measures.map(({ measure }) => ({
          label: measure,
          value: measure,
        }));
      } else {
        return [{ label: standard, value: standard }];
      }
    },
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
        ?????? ???????? ?????? ???????????????? ????????????, ???????????? ???????????????? ??????????????????
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
          <FormField required name="name" label="??????????" />
          <FormField required name="description" label="????????" />
          <FormField
            required
            name="difficulty"
            label="????????????????????"
            type="number"
          />
          <FormField required name="categoryId" select label="??????????????????">
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
                      label="??????????????????"
                    />
                    <FormField
                      name={`products.${index}.measure`}
                      required
                      select
                      label="???????? ????????????"
                    >
                      {getIngredientMeasures(
                        values.products[index].ingredientId,
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
                      label="????????????????????"
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
              text="????????????????"
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
