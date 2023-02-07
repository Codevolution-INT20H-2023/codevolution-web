import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import EditProduct from '@/components/pages/refrigerator-page/components/ingredients-tab/components/edit-product';
import RemoveProduct from '@/components/pages/refrigerator-page/components/ingredients-tab/components/remove-product';
import { Product } from '@/types/user';

import * as Styled from '../ingredients-tab.styled';

export const columns: GridColDef[] = [
  { field: 'index', headerName: 'Номер', width: 70 },
  { field: 'name', headerName: 'Назва', width: 200 },
  { field: 'category', headerName: 'Категорія', width: 200 },
  { field: 'amount', headerName: 'Кількість', width: 100 },
  { field: 'measure', headerName: 'Міра', width: 130 },
  {
    field: 'product',
    width: 330,
    headerName: '',
    renderCell: (props: GridRenderCellParams<Product>) =>
      !props.rowNode.children &&
      props.value && (
        <Styled.Actions>
          <EditProduct product={props.value} />
          <RemoveProduct ingredientId={props.value.ingredient.id} />
        </Styled.Actions>
      ),
  },
];
