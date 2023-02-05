import { NextPage } from 'next';

import Page from '@/components/common/page';
import IngredientsPage from '@/components/pages/ingredients-page';

const Ingredients: NextPage = () => {
  return (
    <Page>
      <IngredientsPage />
    </Page>
  );
};

export default Ingredients;
