import React, { FC } from 'react';
import { Egg, Kitchen, LocalDining } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

import { useIsLoggedIn } from '@/hooks';
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/types/common';

import * as Styled from '../../header.styled';

const DesktopMenu: FC = () => {
  const isLoggedIn = useIsLoggedIn();

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  };

  return (
    <Styled.Menu>
      <Button
        color="inherit"
        startIcon={<LocalDining />}
        LinkComponent={Styled.NavLink}
        href={ROUTES.HOME}
      >
        Рецепти
      </Button>
      <Button
        color="inherit"
        startIcon={<Egg />}
        LinkComponent={Styled.NavLink}
        href={ROUTES.INGREDIENTS}
      >
        Інгредієнти
      </Button>
      {isLoggedIn && (
        <Button
          color="inherit"
          startIcon={<Kitchen />}
          href={ROUTES.REFRIGERATOR}
          LinkComponent={Styled.NavLink}
        >
          Холодильник
        </Button>
      )}
      <Button
        color="inherit"
        startIcon={isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
        href={isLoggedIn ? '' : ROUTES.LOGIN}
        LinkComponent={Styled.NavLink}
        onClick={handleLogout}
      >
        {isLoggedIn ? 'Вийти' : 'Увійти'}
      </Button>
    </Styled.Menu>
  );
};

export default DesktopMenu;
