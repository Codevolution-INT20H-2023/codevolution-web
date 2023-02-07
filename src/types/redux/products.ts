import { Product } from '@/types/user';

export interface ProductsStore {
  products: Product[];
}

export interface SetProductsAction {
  products: Product[];
}

export interface AddProductAction {
  product: Product;
}

export interface EditProductAction {
  product: Product;
}

export interface RemoveProductAction {
  ingredientId: string;
}
