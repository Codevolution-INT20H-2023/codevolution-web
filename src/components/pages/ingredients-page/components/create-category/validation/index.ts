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
});
