import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { FormControlLabel, Switch } from '@mui/material';
import { isAxiosError } from 'axios';

import GroupTable from '@/components/common/group-table';
import { columns } from '@/components/pages/refrigerator-page/components/recipes-tab/constants';
import { transformData } from '@/components/pages/refrigerator-page/components/recipes-tab/utils';
import { useAppSelector } from '@/hooks';
import { showToast } from '@/redux/reducers/toast.reducer';
import { setUserRecipes } from '@/redux/reducers/user-recipes.reducer';
import { UserService } from '@/services';
import { TOAST_STATUS } from '@/types/redux/toast';

import * as Styled from './recipes-tab.styled';

const RecipesPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [groupItems, setGroupItems] = useState(false);

  const dispatch = useDispatch();

  const { availableRecipes } = useAppSelector(state => state.userRecipes);

  const handleGroupChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setGroupItems(event.target.checked);
    },
    [],
  );

  const rows = useMemo(
    () => transformData(availableRecipes),
    [availableRecipes],
  );

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { availableRecipes } = await UserService.getAllRecipes();
      dispatch(setUserRecipes({ availableRecipes }));
    } catch (e) {
      if (isAxiosError(e)) {
        dispatch(
          showToast({
            status: TOAST_STATUS.ERROR,
            message: e.response?.data.message,
          }),
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  return (
    <Styled.Container>
      <FormControlLabel
        control={<Switch checked={groupItems} onChange={handleGroupChange} />}
        label="Групувати за категоріями"
      />

      <GroupTable
        groupFields={[groupItems ? 'category' : '']}
        columns={columns}
        rows={rows}
      />
    </Styled.Container>
  );
};

export default RecipesPage;
