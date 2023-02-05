import { FC } from 'react';
import { AppBar, Toolbar } from '@mui/material';

import { ROUTES } from '@/types/common';

import Menu from './components/menu';
import * as Styled from './header.styled';

const Header: FC = () => {
  return (
    <Styled.Container>
      <AppBar position="static">
        <Toolbar>
          <Styled.Title variant="h6">
            <Styled.NavLink href={ROUTES.RECIPES}>Codevolution</Styled.NavLink>
          </Styled.Title>
          <Menu />
        </Toolbar>
      </AppBar>
    </Styled.Container>
  );
};

export default Header;
