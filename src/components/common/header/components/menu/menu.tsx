import React, { FC } from 'react';
import { useMediaQuery } from '@mui/material';

import DesktopMenu from '../desktop-menu';
import Drawer from '../drawer';

const Menu: FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <Drawer /> : <DesktopMenu />;
};

export default Menu;
