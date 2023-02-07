import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';

import Button from '@/components/common/button';
import CreateCategory from '@/components/common/create-category';
import GroupTable from '@/components/common/group-table';
import NavLink from '@/components/common/styles/nav-link';
import { useAppSelector } from '@/hooks';
import { CategoryType } from '@/types/categories';
import { ROUTES } from '@/types/common';

import { columns } from './constants';
import * as Styled from './recipes-page.styled';
import { transformData } from './utils';

const RecipesPage: FC = () => {
  const [groupItems, setGroupItems] = useState(false);

  const { recipes } = useAppSelector(state => state.recipes);

  const handleGroupChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setGroupItems(event.target.checked);
    },
    [],
  );

  const rows = useMemo(() => transformData(recipes), [recipes]);

  return (
    <Styled.Container>
      <CreateCategory type={CategoryType.RECIPE} />
      <Button
        text="Створити рецепт"
        href={`${ROUTES.RECIPES}/create`}
        LinkComponent={NavLink}
        fullWidth
      />
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

export default RecipesPage;
