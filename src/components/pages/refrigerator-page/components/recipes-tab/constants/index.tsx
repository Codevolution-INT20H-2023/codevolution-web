import { Edit } from '@mui/icons-material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import Button from '@/components/common/button';
import NavLink from '@/components/common/styles/nav-link';
import RemoveRecipe from '@/components/pages/recipes-page/components/remove-recipe';
import { ROUTES } from '@/types/common';
import { Recipe } from '@/types/recipes';

import * as Styled from '../recipes-tab.styled';

export const columns: GridColDef[] = [
  { field: 'index', headerName: 'No.', width: 90 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'category', headerName: 'Category', width: 200 },
  { field: 'difficulty', headerName: 'Difficulty', width: 200 },
  {
    field: 'recipe',
    width: 350,
    headerName: '',
    renderCell: (props: GridRenderCellParams<Recipe>) =>
      !props.rowNode.children &&
      props.value && (
        <Styled.Actions>
          <Button
            text="Редагувати"
            startIcon={<Edit />}
            LinkComponent={NavLink}
            href={`${ROUTES.RECIPES}/${props.value.id}`}
          />
          <RemoveRecipe recipeId={props.value.id} />
        </Styled.Actions>
      ),
  },
];
