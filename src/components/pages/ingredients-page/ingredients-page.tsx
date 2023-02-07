import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';

import CreateCategory from '@/components/common/create-category';
import GroupTable from '@/components/common/group-table';
import CreateIngredient from '@/components/pages/ingredients-page/components/create-ingedient';
import { columns } from '@/components/pages/ingredients-page/constants';
import transformData from '@/components/pages/ingredients-page/utils';
import { useAppSelector } from '@/hooks';
import { CategoryType } from '@/types/categories';

import * as Styled from './ingredients-page.styled';

const IngredientsPage: FC = () => {
  const [groupItems, setGroupItems] = useState(false);

  const { ingredients } = useAppSelector(state => state.ingredients);

  const handleGroupChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setGroupItems(event.target.checked);
    },
    [],
  );

  const rows = useMemo(() => transformData(ingredients), [ingredients]);

  return (
    <Styled.Container>
      <CreateIngredient />
      <CreateCategory type={CategoryType.INGREDIENT} />
      <FormControlLabel
        control={<Switch checked={groupItems} onChange={handleGroupChange} />}
        label="Групувати за категоріями"
      />

      <GroupTable
        groupFields={[groupItems ? 'category' : '']}
        columns={columns}
        rows={rows}
      />
    </Styled.Container>
  );
};

export default IngredientsPage;
