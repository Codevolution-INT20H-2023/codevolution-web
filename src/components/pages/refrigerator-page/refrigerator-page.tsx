import React, { FC, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';

import IngredientsTab from '@/components/pages/refrigerator-page/components/ingredients-tab';

const RefrigeratorPage: FC = () => {
  const [value, setValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Мої інгредієнти" value="1" />
            <Tab label="Мої страви" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <IngredientsTab />
        </TabPanel>
        <TabPanel value="2">{'RecipesTab'}</TabPanel>
      </TabContext>
    </Box>
  );
};

export default RefrigeratorPage;
