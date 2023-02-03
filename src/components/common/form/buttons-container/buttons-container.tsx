import { FC } from 'react';
import { BoxProps } from '@mui/material';

import * as Styled from './buttons-container.styled';

const ButtonsContainer: FC<BoxProps> = props => {
  return <Styled.Container {...props} />;
};

export default ButtonsContainer;
