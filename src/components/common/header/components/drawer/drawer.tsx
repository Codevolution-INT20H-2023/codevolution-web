import { FC, useState } from 'react';
import { Egg, Kitchen, LocalDining } from '@mui/icons-material';
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

import NavLink from '@/components/common/styles/nav-link';
import { useIsLoggedIn } from '@/hooks';
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/types/common';

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
                startIcon={<LocalDining />}
                LinkComponent={NavLink}
                href={ROUTES.RECIPES}
              >
                Рецепти
              </Button>
            </ListItem>
            <ListItem>
              <Button
                color="inherit"
                startIcon={<Egg />}
                LinkComponent={NavLink}
                href={ROUTES.INGREDIENTS}
              >
                Інгредієнти
              </Button>
            </ListItem>
            {isLoggedIn && (
              <ListItem>
                <Button
                  color="inherit"
                  startIcon={<Kitchen />}
                  href={ROUTES.REFRIGERATOR}
                  LinkComponent={NavLink}
                >
                  Холодильник
                </Button>
              </ListItem>
            )}
            <ListItem>
              <Button
                color="inherit"
                startIcon={<LogoutIcon />}
                href={ROUTES.LOGIN}
                LinkComponent={NavLink}
                onClick={handleLogout}
              >
                {isLoggedIn ? 'Вийти' : 'Увійти'}
              </Button>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default Drawer;
