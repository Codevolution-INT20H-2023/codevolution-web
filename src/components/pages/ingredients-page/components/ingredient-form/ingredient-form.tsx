import { FC, useCallback, useMemo } from 'react';
import { Alert, MenuItem } from '@mui/material';
import { FieldArray, Formik } from 'formik';

import Button from '@/components/common/button';
import {
  FormButtonsContainer,
  FormField,
  FormWrapper,
} from '@/components/common/form';
import { useAppSelector } from '@/hooks';
import {
  CreateIngredientPayload,
  EditIngredientPayload,
  Ingredient,
  MeasureType,
  ModifyIngredientForm,
} from '@/types/ingredients';

import { MeasureOptions } from './constants';
import * as Styled from './ingredient-form.styled';
import { validationSchema } from './validation';

interface IngredientFormProps {
  ingredient?: Ingredient;
  onSubmit: (
    data: CreateIngredientPayload | EditIngredientPayload,
  ) => Promise<void>;
}

const IngredientForm: FC<IngredientFormProps> = ({ ingredient, onSubmit }) => {
  const { categories } = useAppSelector(state => state.categories);

  const initialValues: ModifyIngredientForm = useMemo(
    () => ({
      name: ingredient?.name || '',
      categoryId: ingredient?.category.id || '',
      standard: ingredient?.standard || MeasureType.KILOGRAMMS,
      measures: ingredient?.measures || [],
    }),
    [ingredient],
  );

  const handleSubmit = useCallback(
    async (data: ModifyIngredientForm) => {
      await onSubmit({
        ...data,
        measures: data.measures.map(({ toStandard, measure }) => ({
          measure,
          toStandard: +toStandard,
        })),
      });
    },
    [onSubmit],
  );

  if (!categories.length) {
    return (
      <Alert severity="error">
        Для того щоб створити інгредієнт, спершу створіть категорію
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
          <FormField required name="standard" select label="Стандартна міра">
            {MeasureOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </FormField>
          <FormField required name="categoryId" select label="Категорія">
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </FormField>

          <FieldArray
            name="measures"
            render={({ pop, push }) => (
              <Styled.ArrayContainer>
                {values.measures.map((item, index) => (
                  <Styled.ArrayItem key={item.measure}>
                    <FormField
                      name={`measures.${index}.toStandard`}
                      required
                      type="number"
                      label="Коефіцієнт"
                    />
                    <FormField
                      name={`measures.${index}.measure`}
                      required
                      select
                      label="Міра виміру"
                    >
                      {MeasureOptions.filter(
                        option =>
                          option.value === values.measures[index].measure ||
                          !values.measures.find(
                            v => v.measure === option.value,
                          ),
                      ).map(option => (
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
                    onClick={() => push({ toStandard: 0, measure: '' })}
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

export default IngredientForm;
