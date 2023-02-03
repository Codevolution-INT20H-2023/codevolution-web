import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import Header from '@/components/common/header';
import Toast from '@/components/common/toast';
import store from '@/redux';

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Toast />
      <Component {...pageProps} />
    </Provider>
  );
}
