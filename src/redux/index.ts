import { configureStore } from '@reduxjs/toolkit';

import toastReducer from '@/redux/reducers/toast.reducer';

const store = configureStore({
  reducer: {
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
