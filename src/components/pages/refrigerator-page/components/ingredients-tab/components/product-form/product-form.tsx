import { FC, useCallback, useMemo } from 'react';
import { Alert, MenuItem } from '@mui/material';
import { Formik } from 'formik';

import Button from '@/components/common/button';
import {
  FormButtonsContainer,
  FormField,
  FormWrapper,
} from '@/components/common/form';
import { useAppSelector } from '@/hooks';
import { MeasureType } from '@/types/common';
import { CreateProductPayload, ModifyProductForm, Product } from '@/types/user';

import { validationSchema } from './validation';

interface IngredientFormProps {
  product?: Product;
  onSubmit: (data: CreateProductPayload) => Promise<void>;
  type: 'add' | 'edit';
}

const ProductForm: FC<IngredientFormProps> = ({ product, onSubmit, type }) => {
  const { ingredients } = useAppSelector(state => state.ingredients);
  const { products } = useAppSelector(state => state.products);

  const filteredIngredients = ingredients.filter(
    option =>
      !products.find(
        v =>
          v.ingredient.id === option.id &&
          v.ingredient.id !== product?.ingredient.id,
      ),
  );

  const initialValues: ModifyProductForm = useMemo(
    () => ({
      ingredientId: product?.ingredient.id || '',
      measure: product?.ingredient.standard || MeasureType.KILOGRAMMS,
      amount: product?.amount || 0,
    }),
    [product],
  );

  const handleSubmit = useCallback(
    async (data: ModifyProductForm) => {
      await onSubmit({
        ...data,
        amount: +data.amount,
      });
    },
    [onSubmit],
  );

  if (type === 'add' && !filteredIngredients.length) {
    return <Alert severity="error">Немає інгредієнтів, які можна додати</Alert>;
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
          <FormField required name="ingredientId" select label="Інгредієнт">
            {filteredIngredients.map(ingredient => (
              <MenuItem key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </MenuItem>
            ))}
          </FormField>
          <FormField required name="amount" label="Кількість" />
          <FormField required name="measure" disabled label="Міра" />
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

export default ProductForm;
