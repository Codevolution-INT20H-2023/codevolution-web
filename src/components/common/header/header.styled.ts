import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled(Box)`
  flex-grow: 1;
`;

export const Title = styled(Typography)`
  flex-grow: 1;
`;

export const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const Menu = styled(Box)`
  display: flex;
  justify-content: end;
  gap: 1rem;
`;
