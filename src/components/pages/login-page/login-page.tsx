import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Send } from '@mui/icons-material';
import { isAxiosError } from 'axios';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import Button from '@/components/common/button';
import {
  FormButtonsContainer,
  FormField,
  FormWrapper,
} from '@/components/common/form';
import { showToast } from '@/redux/reducers/toast.reducer';
import { AuthService } from '@/services';
import { LoginForm } from '@/types/auth';
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/types/common';
import { TOAST_STATUS } from '@/types/redux/toast';

import { initialValues } from './constants';
import { validationSchema } from './validation';

const LoginPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { push } = useRouter();

  const onSubmit = useCallback(
    async (data: LoginForm) => {
      try {
        setIsLoading(true);
        const { accessToken, refreshToken } = await AuthService.login(data);
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        await push(ROUTES.HOME);
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
    },
    [dispatch, push],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      validateOnChange
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <FormWrapper onSubmit={handleSubmit}>
          <FormField required name="email" label="Email" type="email" />
          <FormField
            required
            name="password"
            label="Password"
            type="password"
          />
          <FormButtonsContainer>
            <Button
              type="submit"
              text="login"
              endIcon={<Send />}
              loading={isLoading}
              disabled={isLoading}
            />
          </FormButtonsContainer>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default LoginPage;
