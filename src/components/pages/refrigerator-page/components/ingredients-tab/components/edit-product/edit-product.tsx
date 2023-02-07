import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Edit } from '@mui/icons-material';
import { isAxiosError } from 'axios';

import Button from '@/components/common/button';
import Modal from '@/components/common/modal';
import { editProduct } from '@/redux/reducers/products.reducer';
import { showToast } from '@/redux/reducers/toast.reducer';
import { UserService } from '@/services';
import { TOAST_STATUS } from '@/types/redux/toast';
import { EditProductPayload, Product } from '@/types/user';

import ProductForm from '../product-form';

interface EditIngredientProps {
  product: Product;
}

const EditProduct: FC<EditIngredientProps> = ({ product }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(
    async (data: EditProductPayload) => {
      try {
        await UserService.editProduct(product.ingredient.id, data);
        dispatch(
          editProduct({
            product: {
              ...product,
              ...data,
            },
          }),
        );
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
    [dispatch, handleClose, product],
  );

  return (
    <>
      <Button text="Редагувати" onClick={handleOpen} startIcon={<Edit />} />
      <Modal open={open} onClose={handleClose}>
        <ProductForm onSubmit={onSubmit} product={product} type="edit" />
      </Modal>
    </>
  );
};

export default EditProduct;
