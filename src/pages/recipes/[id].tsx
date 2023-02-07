import { NextPage } from 'next';

import Page from '@/components/common/page';
import SingleRecipePage from '@/components/pages/single-recipe-page';

const Recipe: NextPage = () => {
  return (
    <Page>
      <SingleRecipePage />
    </Page>
  );
};

export default Recipe;
