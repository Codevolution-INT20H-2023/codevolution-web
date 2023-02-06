import { FC } from 'react';
import { CircularProgress } from '@mui/material';

import * as Styled from './loader.styled';

const Loader: FC = () => {
  return (
    <Styled.Container>
      <CircularProgress />
    </Styled.Container>
  );
};

export default Loader;
