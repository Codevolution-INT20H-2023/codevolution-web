import { GridRecipe, Recipe } from '@/types/recipes';

export const transformData = (data: Recipe[]): GridRecipe[] =>
  data.map((recipe, index) => ({
    id: recipe.id,
    category: recipe.category.name,
    difficulty: recipe.difficulty,
    index: index + 1,
    name: recipe.name,
    recipe,
  }));
