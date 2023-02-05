import { FC } from 'react';
import {
  DataGridPremium,
  GridColumns,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';

import * as Styled from './group-table.styled';

interface GroupTableProps {
  groupField: string;
  columns: GridColumns;
  rows: object[];
}

const GroupTable: FC<GroupTableProps> = ({ columns, groupField, rows }) => {
  const apiRef = useGridApiRef();
  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      rowGrouping: {
        model: [groupField],
      },
    },
  });

  return (
    <Styled.Container>
      <DataGridPremium
        columns={columns}
        rows={rows}
        apiRef={apiRef}
        initialState={initialState}
        rowGroupingColumnMode="single"
      />
    </Styled.Container>
  );
};

export default GroupTable;
