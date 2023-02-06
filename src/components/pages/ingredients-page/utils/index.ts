import { GridIngredient, Ingredient } from '@/types/ingredients';

const transformData = (data: Ingredient[]): GridIngredient[] =>
  data.map((ingredient, index) => ({
    id: ingredient.id,
    index: index + 1,
    category: ingredient.category.name,
    name: ingredient.name,
    standard: ingredient.standard,
    ingredient: ingredient,
  }));

export default transformData;
