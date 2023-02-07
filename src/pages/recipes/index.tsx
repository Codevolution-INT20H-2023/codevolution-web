import { NextPage } from 'next';

import Page from '@/components/common/page';
import RecipesPage from '@/components/pages/recipes-page';

const Recipes: NextPage = () => {
  return (
    <Page>
      <RecipesPage />
    </Page>
  );
};

export default Recipes;
