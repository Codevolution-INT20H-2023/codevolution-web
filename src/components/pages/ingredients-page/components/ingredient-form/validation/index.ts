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
  standard: yup.string().required("Стандартна міра є обов'язковим полем"),
  categoryId: yup.string().required("Категорія є обов'язковим полем"),
  measure: yup.array().of(
    yup.object().shape({
      toStandard: yup.number().required("Поле обоа'язкове для заповення"),
      measure: yup.string().required("Поле обоа'язкове для заповення"),
    }),
  ),
});
