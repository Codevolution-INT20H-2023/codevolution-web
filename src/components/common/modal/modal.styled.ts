import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

export const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  background: #fff;
  outline: none;
  padding: 1.5rem;
  border-radius: 0.25rem;
`;

export const Title = styled(Typography)`
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;
