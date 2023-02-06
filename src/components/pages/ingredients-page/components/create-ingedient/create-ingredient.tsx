import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isAxiosError } from 'axios';

import Button from '@/components/common/button';
import Modal from '@/components/common/modal';
import { addIngredient } from '@/redux/reducers/ingredients.reducer';
import { showToast } from '@/redux/reducers/toast.reducer';
import { IngredientsService } from '@/services';
import { CreateIngredientPayload } from '@/types/ingredients';
import { TOAST_STATUS } from '@/types/redux/toast';

import IngredientForm from '../ingredient-form';

const CreateIngredient: FC = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(
    async (data: CreateIngredientPayload) => {
      try {
        const ingredient = await IngredientsService.create(data);
        dispatch(addIngredient({ ingredient }));
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
      <Button text="Створити інгредієнт" fullWidth onClick={handleOpen} />
      <Modal open={open} onClose={handleClose}>
        <IngredientForm onSubmit={onSubmit} />
      </Modal>
    </>
  );
};

export default CreateIngredient;
