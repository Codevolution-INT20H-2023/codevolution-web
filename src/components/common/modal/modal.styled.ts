import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 40rem;
  width: calc(100% - 3rem);
  background: #fff;
  outline: none;
  padding: 1.5rem;
  border-radius: 0.25rem;
`;

export const Title = styled(Typography)`
  font-weight: 600 !important;
  font-size: 1.5rem !important;
  margin-bottom: 1rem !important;
`;
