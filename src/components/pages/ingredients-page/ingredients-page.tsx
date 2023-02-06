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
import Loader from '@/components/common/loader';
import CreateIngredient from '@/components/pages/ingredients-page/components/create-ingedient';
import { columns } from '@/components/pages/ingredients-page/constants';
import transformData from '@/components/pages/ingredients-page/utils';
import { useAppSelector } from '@/hooks';
import { setCategories } from '@/redux/reducers/categories.reducer';
import { setIngredients } from '@/redux/reducers/ingredients.reducer';
import { showToast } from '@/redux/reducers/toast.reducer';
import { CategoriesService, IngredientsService } from '@/services';
import { TOAST_STATUS } from '@/types/redux/toast';

import CreateCategory from './components/create-category';
import * as Styled from './ingredients-page.styled';

const IngredientsPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [groupItems, setGroupItems] = useState(false);

  const { ingredients } = useAppSelector(state => state.ingredients);
  const dispatch = useDispatch();

  const handleGroupChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setGroupItems(event.target.checked);
    },
    [],
  );

  const rows = useMemo(() => transformData(ingredients), [ingredients]);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { ingredients } = await IngredientsService.getAll();
      const { categories } = await CategoriesService.getAll();
      dispatch(setIngredients({ ingredients }));
      dispatch(setCategories({ categories }));
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Styled.Container>
      <CreateIngredient />
      <CreateCategory />
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

export default IngredientsPage;
