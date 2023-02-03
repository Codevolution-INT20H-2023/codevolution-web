import { Box, CircularProgress } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Box)`
  position: relative;
`;

export const Loader = styled(CircularProgress)`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -0.75rem;
  margin-left: -0.75rem;
`;
