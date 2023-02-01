import { ChangeEvent, FC, ReactNode } from 'react';
import { InputAdornment, TextFieldProps } from '@mui/material';
import { useField } from 'formik';

import * as Styled from './field.styled';

type FieldProps = TextFieldProps & {
  name: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

const Field: FC<FieldProps> = ({ startIcon, endIcon, name, ...props }) => {
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField<string>(name);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    setValue(e.target.value);
  };

  return (
    <Styled.Input
      value={value}
      helperText={touched && error}
      onChange={onChange}
      error={touched && !!error}
      name={name}
      {...props}
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ),
        endAdornment: endIcon && (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ),
      }}
    />
  );
};

export default Field;
