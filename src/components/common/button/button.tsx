import { FC } from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

import * as Styled from './button.styled';

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
  text: string;
}

const Button: FC<ButtonProps> = ({
  loading = false,
  variant = 'contained',
  text,
  ...props
}) => {
  return (
    <Styled.Container>
      <MuiButton variant={variant} {...props}>
        {text}
      </MuiButton>
      {loading && <Styled.Loader size={24} />}
    </Styled.Container>
  );
};

export default Button;
