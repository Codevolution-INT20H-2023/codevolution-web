import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isAxiosError } from 'axios';

import GroupTable from '@/components/common/group-table';
import Loader from '@/components/common/loader';
import {
  columns,
  mockData,
} from '@/components/pages/ingredients-page/constants';
import transformData from '@/components/pages/ingredients-page/utils';
import { useAppSelector } from '@/hooks';
import { setIngredients } from '@/redux/reducers/ingredients.reducer';
import { showToast } from '@/redux/reducers/toast.reducer';
import { IngredientsService } from '@/services';
import { TOAST_STATUS } from '@/types/redux/toast';

const IngredientsPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { ingredients } = useAppSelector(state => state.ingredients);
  const dispatch = useDispatch();

  const rows = useMemo(() => transformData(ingredients), [ingredients]);

  const loadIngredients = useCallback(async () => {
    try {
      setIsLoading(true);
      const { ingredients } = await IngredientsService.getAll();
      dispatch(setIngredients({ ingredients }));
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
    void loadIngredients();
  }, [loadIngredients]);

  if (isLoading) {
    return <Loader />;
  }

  return <GroupTable groupField="category" columns={columns} rows={mockData} />;
};

export default IngredientsPage;
