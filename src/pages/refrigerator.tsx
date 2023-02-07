import { NextPage } from 'next';

import Page from '@/components/common/page';
import RefrigeratorPage from '@/components/pages/refrigerator-page';

const Refrigerator: NextPage = () => {
  return (
    <Page>
      <RefrigeratorPage />
    </Page>
  );
};

export default Refrigerator;
