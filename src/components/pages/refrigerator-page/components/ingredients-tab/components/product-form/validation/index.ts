import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  ingredientId: yup.string().required("Інгредієнт є обов'язковим полем"),
  amount: yup.number().positive().required("Кількість є обов'язковим полем"),
  measure: yup.string().required("Міра є обов'язковим полем"),
});
