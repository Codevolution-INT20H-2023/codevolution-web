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
import AddIngredient from '@/components/pages/refrigerator-page/components/ingredients-tab/components/add-product';
import { useAppSelector } from '@/hooks';
import { setIngredients } from '@/redux/reducers/ingredients.reducer';
import { setProducts } from '@/redux/reducers/products.reducer';
import { showToast } from '@/redux/reducers/toast.reducer';
import { IngredientsService, UserService } from '@/services';
import { TOAST_STATUS } from '@/types/redux/toast';

import { columns } from './constants';
import * as Styled from './ingredients-tab.styled';
import transformData from './utils';

const IngredientsTab: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [groupItems, setGroupItems] = useState(false);

  const { products } = useAppSelector(state => state.products);
  console.log(products);
  const dispatch = useDispatch();

  const handleGroupChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setGroupItems(event.target.checked);
    },
    [],
  );

  const rows = useMemo(() => transformData(products), [products]);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { products } = await UserService.getAllProducts();
      const { ingredients } = await IngredientsService.getAll();
      dispatch(setIngredients({ ingredients }));

      dispatch(setProducts({ products }));
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
      <AddIngredient />

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

export default IngredientsTab;
