import { Typography } from '@mui/material';
import styled from 'styled-components';

import NavLink from '@/components/common/styles/nav-link';

export const BottomLinkWrapper = styled(Typography)`
  margin-top: 1rem;
  ${NavLink} {
    text-decoration: underline;
  }
`;
