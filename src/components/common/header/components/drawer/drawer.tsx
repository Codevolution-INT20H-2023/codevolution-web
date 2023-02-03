import { FC, useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
} from '@mui/material';

import { useIsLoggedIn } from '@/hooks';
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/types/common';

import * as Styled from '../../header.styled';

const drawerWidth = 320;

const Drawer: FC = () => {
  const [open, setOpen] = useState(false);
  const isLoggedIn = useIsLoggedIn();

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={openDrawer}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        open={open}
        anchor="right"
        onClose={closeDrawer}
        onOpen={openDrawer}
      >
        <IconButton
          sx={{ marginRight: 'auto', paddingTop: '16px', paddingLeft: '16px' }}
          onClick={closeDrawer}
        >
          <ChevronRightIcon />
        </IconButton>
        <Box
          sx={{ width: drawerWidth }}
          role="presentation"
          onClick={closeDrawer}
        >
          <List>
            <ListItem>
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                LinkComponent={Styled.NavLink}
                href={ROUTES.LOGIN}
                onClick={handleLogout}
              >
                log {isLoggedIn ? 'out' : 'in'}
              </Button>
            </ListItem>
            <ListItem>
              <Button
                color="inherit"
                startIcon={<AddCircleOutlineIcon />}
                LinkComponent={Styled.NavLink}
                href={ROUTES.SIGNUP}
              >
                sign up
              </Button>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default Drawer;
