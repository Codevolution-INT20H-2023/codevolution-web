import { NextPage } from 'next';

import Page from '@/components/common/page';
import SignupPage from '@/components/pages/signup-page';

const Signup: NextPage = () => {
  return (
    <Page>
      <SignupPage />
    </Page>
  );
};

export default Signup;
