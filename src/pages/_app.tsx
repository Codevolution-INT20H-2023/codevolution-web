import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Router } from '@mui/icons-material';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import Header from '@/components/common/header';
import Toast from '@/components/common/toast';
import { useIsLoggedIn } from '@/hooks';
import store from '@/redux';
import { ROUTES } from '@/types/common';

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const isLoggedIn = useIsLoggedIn();
  const router = useRouter();

  useEffect(() => {
    console.log('IS LOGGED IN: ' + isLoggedIn);
    if (
      !isLoggedIn &&
      !router.asPath.includes('signup') &&
      !router.asPath.includes('login')
    ) {
      router.push(ROUTES.LOGIN);
    }
  }, [isLoggedIn, router]);

  return (
    <Provider store={store}>
      <Header />
      <Toast />
      <Component {...pageProps} />
    </Provider>
  );
}
