import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  AddProductAction,
  EditProductAction,
  ProductsStore,
  RemoveProductAction,
  SetProductsAction,
} from '@/types/redux/products';

const initialState: ProductsStore = {
  products: [],
};

const productsSlide = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, { payload }: PayloadAction<SetProductsAction>) => {
      state.products = payload.products;
    },
    addProduct: (state, { payload }: PayloadAction<AddProductAction>) => {
      state.products.push(payload.product);
    },
    editProduct: (state, { payload }: PayloadAction<EditProductAction>) => {
      const index = state.products.findIndex(
        ({ ingredient }) => ingredient.id === payload.product.ingredient.id,
      );
      state.products[index] = {
        ...state.products[index],
        ...payload.product,
      };
    },
    removeProduct: (state, { payload }: PayloadAction<RemoveProductAction>) => {
      state.products = state.products.filter(
        ({ ingredient }) => ingredient.id !== payload.ingredientId,
      );
    },
  },
});

export const { addProduct, editProduct, removeProduct, setProducts } =
  productsSlide.actions;
export default productsSlide.reducer;
