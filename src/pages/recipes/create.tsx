import { NextPage } from 'next';

import Page from '@/components/common/page';
import CreateRecipe from '@/components/pages/create-recipe-page';

const Create: NextPage = () => {
  return (
    <Page>
      <CreateRecipe />
    </Page>
  );
};

export default Create;
