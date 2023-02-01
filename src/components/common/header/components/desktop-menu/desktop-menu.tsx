import React, { FC } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

import * as Styled from '../../header.styled';

const DesktopMenu: FC = () => {
  return (
    <>
      <Button
        color="inherit"
        startIcon={<LogoutIcon />}
        href="/login"
        LinkComponent={Styled.NavLink}
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
