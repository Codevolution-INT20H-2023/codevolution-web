import React, { FC } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

import { LOCAL_STORAGE_KEYS } from '@/types/common';

import * as Styled from '../../header.styled';

const DesktopMenu: FC = () => {
  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  };

  return (
    <>
      <Button
        color="inherit"
        startIcon={<LogoutIcon />}
        href="/login"
        LinkComponent={Styled.NavLink}
        onClick={handleLogout}
      >
        log out
      </Button>
      <Button
        color="inherit"
        startIcon={<AddCircleOutlineIcon />}
        LinkComponent={Styled.NavLink}
        href="/signup"
      >
        Sign up
      </Button>
    </>
  );
};

export default DesktopMenu;
