import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isAxiosError } from 'axios';
import { Formik } from 'formik';

import Button from '@/components/common/button';
import {
  FormButtonsContainer,
  FormField,
  FormWrapper,
} from '@/components/common/form';
import Modal from '@/components/common/modal';
import { addCategory } from '@/redux/reducers/categories.reducer';
import { showToast } from '@/redux/reducers/toast.reducer';
import { CategoriesService } from '@/services';
import { CreateCategoryForm } from '@/types/categories';
import { TOAST_STATUS } from '@/types/redux/toast';

import { initialValues } from './constants';
import { validationSchema } from './validation';

const CreateCategory: FC = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(
    async (data: CreateCategoryForm) => {
      try {
        const category = await CategoriesService.create(data);
        dispatch(addCategory({ category }));
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
      }
    },
    [dispatch],
  );

  return (
    <>
      <Button text="Створити категорію" onClick={handleOpen} fullWidth />
      <Modal open={open} onClose={handleClose} title="Створіть нову категорію">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          validateOnChange
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <FormWrapper onSubmit={handleSubmit}>
              <FormField name="name" required label="Назва" />
              <FormButtonsContainer>
                <Button
                  text="Створити"
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                />
              </FormButtonsContainer>
            </FormWrapper>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default CreateCategory;
