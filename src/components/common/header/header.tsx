import { FC } from 'react';
import { AppBar, Toolbar } from '@mui/material';

import Menu from './components/menu';
import * as Styled from './header.styled';

const Header: FC = () => {
  return (
    <Styled.Container>
      <AppBar position="static">
        <Toolbar>
          <Styled.Title variant="h6">
            <Styled.NavLink href="/">Codevolution</Styled.NavLink>
          </Styled.Title>
          <Menu />
        </Toolbar>
      </AppBar>
    </Styled.Container>
  );
};

export default Header;
