import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { LOCAL_STORAGE_KEYS } from '@/types/common';

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { asPath } = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    setIsLoggedIn(!!token);
  }, [asPath]);

  return isLoggedIn;
};

export default useIsLoggedIn;
