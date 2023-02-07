import { FC } from 'react';
import { AppBar, Toolbar } from '@mui/material';

import NavLink from '@/components/common/styles/nav-link';
import { ROUTES } from '@/types/common';

import Menu from './components/menu';
import * as Styled from './header.styled';

const Header: FC = () => {
  return (
    <Styled.Container>
      <AppBar position="static">
        <Toolbar>
          <Styled.Title variant="h6">
            <NavLink href={ROUTES.RECIPES}>Codevolution</NavLink>
          </Styled.Title>
          <Menu />
        </Toolbar>
      </AppBar>
    </Styled.Container>
  );
};

export default Header;
