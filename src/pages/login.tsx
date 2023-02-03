import { NextPage } from 'next';

import Page from '@/components/common/page';
import LoginPage from '@/components/pages/login-page';

const Login: NextPage = () => {
  return (
    <Page>
      <LoginPage />
    </Page>
  );
};

export default Login;
