import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Delete } from '@mui/icons-material';
import { isAxiosError } from 'axios';

import Button from '@/components/common/button';
import Modal from '@/components/common/modal';
import { removeIngredient } from '@/redux/reducers/ingredients.reducer';
import { showToast } from '@/redux/reducers/toast.reducer';
import { IngredientsService } from '@/services';
import { TOAST_STATUS } from '@/types/redux/toast';

import * as Styled from './remove-ingredient.styles';

interface RemoveIngredientProps {
  ingredientId: string;
}

const RemoveIngredient: FC<RemoveIngredientProps> = ({ ingredientId }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await IngredientsService.remove(ingredientId);
      dispatch(removeIngredient({ id: ingredientId }));
      setOpen(false);
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
  }, [dispatch, ingredientId]);

  return (
    <>
      <Button
        text="Видалити"
        onClick={handleOpen}
        color="error"
        startIcon={<Delete />}
      />
      <Modal
        open={open}
        onClose={handleClose}
        title="Ви дійсно хочете видалити інгредієнт?"
      >
        <Styled.ButtonsContainer>
          <Button text="Відміна" color="error" onClick={handleClose} />
          <Button
            text="Видалити"
            onClick={onDelete}
            loading={isLoading}
            disabled={isLoading}
          />
        </Styled.ButtonsContainer>
      </Modal>
    </>
  );
};

export default RemoveIngredient;
