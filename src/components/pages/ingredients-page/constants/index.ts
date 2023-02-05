import { GridColDef } from '@mui/x-data-grid';

import { GridIngredient } from '@/types/ingredients';

export const columns: GridColDef[] = [
  { field: 'index', headerName: 'No.', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'category', headerName: 'Category', width: 150 },
];

export const mockData: GridIngredient[] = [
  {
    id: '1',
    index: 1,
    name: 'test name 1',
    category: 'category 1',
  },
  {
    id: '2',
    index: 2,
    name: 'test name 2',
    category: 'category 2',
  },
  {
    id: '3',
    index: 3,
    name: 'test name 3',
    category: 'category 3',
  },
  {
    id: '4',
    index: 4,
    name: 'test name 4',
    category: 'category 1',
  },
  {
    id: '5',
    index: 5,
    name: 'test name 5',
    category: 'category 2',
  },
  {
    id: '6',
    index: 6,
    name: 'test name 6',
    category: 'category 3',
  },
  {
    id: '7',
    index: 7,
    name: 'test name 7',
    category: 'category 1',
  },
  {
    id: '8',
    index: 8,
    name: 'test name 8',
    category: 'category 2',
  },
];
