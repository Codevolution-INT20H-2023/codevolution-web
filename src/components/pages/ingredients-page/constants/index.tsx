import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import EditIngredient from '@/components/pages/ingredients-page/components/edit-ingredient';
import { Ingredient } from '@/types/ingredients';

import RemoveIngredient from '../components/remove-ingredient';
import * as Styled from '../ingredients-page.styled';

export const columns: GridColDef[] = [
  { field: 'index', headerName: 'No.', width: 90 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'category', headerName: 'Category', width: 200 },
  { field: 'standard', headerName: 'Standard', width: 200 },
  {
    field: 'ingredient',
    width: 350,
    headerName: '',
    renderCell: (props: GridRenderCellParams<Ingredient>) =>
      !props.rowNode.children &&
      props.value && (
        <Styled.Actions>
          <EditIngredient ingredient={props.value} />
          <RemoveIngredient ingredientId={props.value.id} />
        </Styled.Actions>
      ),
  },
];
