import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isAxiosError } from 'axios';

import Button from '@/components/common/button';
import Modal from '@/components/common/modal';
import { addProduct } from '@/redux/reducers/products.reducer';
import { showToast } from '@/redux/reducers/toast.reducer';
import { UserService } from '@/services';
import { TOAST_STATUS } from '@/types/redux/toast';
import { CreateProductPayload } from '@/types/user';

import ProductForm from '../product-form';

const AddIngredient: FC = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(
    async (data: CreateProductPayload) => {
      try {
        const product = await UserService.createProduct(data);
        dispatch(addProduct({ product }));
        handleClose();
      } catch (e) {
        if (isAxiosError(e)) {
          dispatch(
            showToast({
              status: TOAST_STATUS.ERROR,
              message: e.response?.data.message,
            }),
          );
        }
      }
    },
    [dispatch, handleClose],
  );

  return (
    <>
      <Button text="Додати інгредієнт" fullWidth onClick={handleOpen} />
      <Modal open={open} onClose={handleClose}>
        <ProductForm onSubmit={onSubmit} type="add" />
      </Modal>
    </>
  );
};

export default AddIngredient;
