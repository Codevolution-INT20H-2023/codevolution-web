import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Назва обов'язкова для заповнення")
    .min(2)
    .max(30)
    .matches(
      /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя\-' ]+$/g,
      'Назва може бути складатись тільки з українських літер, дифісу та апострофа',
    ),
  description: yup.string().required("Поле обов'язкове для заповнення"),
  difficulty: yup.number().required("Поле обов'язкове для заповнення"),
  categoryId: yup.string().required("Категорія є обов'язковим полем"),
  products: yup.array().of(
    yup.object().shape({
      ingredientId: yup.string().required("Поле обов'язкове для заповнення"),
      amount: yup.number().required("Поле обоа'язкове для заповення"),
      measure: yup.string().required("Поле обоа'язкове для заповення"),
    }),
  ),
});
