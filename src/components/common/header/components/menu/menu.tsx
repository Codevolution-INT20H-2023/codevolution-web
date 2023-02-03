import React, { FC } from 'react';
import { useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';

const DesktopMenu = dynamic(() => import('../desktop-menu'));
const Drawer = dynamic(() => import('../drawer'));

const Menu: FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <Drawer /> : <DesktopMenu />;
};

export default Menu;
