import { FC } from 'react';
import { TypographyProps } from '@mui/material';

import * as Styled from './bottom-link-wrapper.styled';

const BottomLinkWrapper: FC<TypographyProps> = props => {
  return <Styled.BottomLinkWrapper variant="body2" {...props} />;
};

export default BottomLinkWrapper;
