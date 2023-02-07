import { MeasureTypeMapper } from '@/types/ingredients';
import { GridProduct, Product } from '@/types/user';

const transformData = (data: Product[]): GridProduct[] =>
  data.map((product, index) => ({
    id: product.ingredient.id,
    index: index + 1,
    name: product.ingredient.name,
    category: product.ingredient.category.name,
    measure: MeasureTypeMapper[product.ingredient.standard],
    amount: product.amount,
    product: product,
  }));

export default transformData;
