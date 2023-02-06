import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Edit } from '@mui/icons-material';
import { isAxiosError } from 'axios';

import Button from '@/components/common/button';
import Modal from '@/components/common/modal';
import { useAppSelector } from '@/hooks';
import { editIngredient } from '@/redux/reducers/ingredients.reducer';
import { showToast } from '@/redux/reducers/toast.reducer';
import { IngredientsService } from '@/services';
import { EditIngredientPayload, Ingredient } from '@/types/ingredients';
import { TOAST_STATUS } from '@/types/redux/toast';

import IngredientForm from '../ingredient-form';

interface EditIngredientProps {
  ingredient: Ingredient;
}

const EditIngredient: FC<EditIngredientProps> = ({ ingredient }) => {
  const [open, setOpen] = useState(false);
  const { categories } = useAppSelector(state => state.categories);

  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(
    async (data: EditIngredientPayload) => {
      try {
        await IngredientsService.edit(ingredient?.id, data);
        dispatch(
          editIngredient({
            id: ingredient.id,
            ingredient: {
              ...data,
              category: categories.find(
                category => category.id === data.categoryId,
              ),
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
    [categories, dispatch, handleClose, ingredient],
  );

  return (
    <>
      <Button text="Редагувати" onClick={handleOpen} startIcon={<Edit />} />
      <Modal open={open} onClose={handleClose}>
        <IngredientForm onSubmit={onSubmit} ingredient={ingredient} />
      </Modal>
    </>
  );
};

export default EditIngredient;
