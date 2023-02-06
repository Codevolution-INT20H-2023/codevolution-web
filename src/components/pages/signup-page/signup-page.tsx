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
import { NavLink } from '@/components/common/header/header.styled';
import { NavLinkWrapper } from '@/components/pages/signup-page/signup-page.styled';
import { showToast } from '@/redux/reducers/toast.reducer';
import { AuthService } from '@/services';
import { SignupForm } from '@/types/auth';
import { LOCAL_STORAGE_KEYS, ROUTES } from '@/types/common';
import { TOAST_STATUS } from '@/types/redux/toast';

import { initialValues } from './constants';
import { validationSchema } from './validation';

const SignupPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { push } = useRouter();

  const onSubmit = useCallback(
    async ({ email, password }: SignupForm) => {
      try {
        setIsLoading(true);
        const { accessToken, refreshToken } = await AuthService.signup({
          email,
          password,
        });
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
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
        validateOnChange
      >
        {({ handleSubmit }) => (
          <FormWrapper onSubmit={handleSubmit}>
            <FormField required name="email" type="email" label="Email" />
            <FormField
              required
              name="password"
              type="password"
              label="Password"
            />
            <FormField
              required
              name="confirmPassword"
              type="password"
              label="Confirm Password"
            />

            <FormButtonsContainer>
              <Button
                type="submit"
                text="signup"
                endIcon={<Send />}
                loading={isLoading}
                disabled={isLoading}
              />
            </FormButtonsContainer>
          </FormWrapper>
        )}
      </Formik>
      <NavLinkWrapper variant="body2">
        <NavLink href={ROUTES.LOGIN}>Вже зареєстровані?</NavLink>
      </NavLinkWrapper>
    </>
  );
};

export default SignupPage;
