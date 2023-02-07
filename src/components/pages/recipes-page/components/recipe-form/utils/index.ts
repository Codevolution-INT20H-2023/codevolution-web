import { Ingredient } from '@/types/ingredients';

export const transformIngredients = (data: Ingredient[]) =>
  data.map(({ id, name }) => ({ label: name, value: id }));
