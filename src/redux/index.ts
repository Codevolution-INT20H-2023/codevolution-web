import { configureStore } from '@reduxjs/toolkit';

import ingredientsReducer from '@/redux/reducers/ingredients.reducer';
import toastReducer from '@/redux/reducers/toast.reducer';

const store = configureStore({
  reducer: {
    toast: toastReducer,
    ingredients: ingredientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
