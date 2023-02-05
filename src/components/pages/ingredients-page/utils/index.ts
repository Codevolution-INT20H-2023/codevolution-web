import { GridIngredient, Ingredient } from '@/types/ingredients';

const transformData = (data: Ingredient[]): GridIngredient[] =>
  data.map(({ id, category, name }, index) => ({
    id: id,
    index: index + 1,
    category: category?.name,
    name,
  }));

export default transformData;
