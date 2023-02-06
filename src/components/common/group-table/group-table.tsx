import { FC, useCallback, useState } from 'react';
import { DataGridPremium, GridColumns } from '@mui/x-data-grid-premium';

import * as Styled from './group-table.styled';

interface GroupTableProps {
  groupFields?: string[];
  columns: GridColumns;
  rows: object[];
}

const GroupTable: FC<GroupTableProps> = ({
  columns,
  groupFields = [],
  rows,
}) => {
  const [pageSize, setPageSize] = useState(5);

  const onPageSizeChange = useCallback((size: number) => {
    setPageSize(size);
  }, []);

  return (
    <Styled.Container>
      <DataGridPremium
        columns={columns}
        rows={rows}
        rowGroupingModel={groupFields}
        rowGroupingColumnMode="single"
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        rowsPerPageOptions={[5, 10, 15]}
        pagination
      />
    </Styled.Container>
  );
};

export default GroupTable;
