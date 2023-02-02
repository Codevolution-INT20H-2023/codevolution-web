import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';

import { useAppSelector } from '@/hooks';
import { hideToast } from '@/redux/reducers/toast.reducer';

const Toast: FC = () => {
  const { open, message, status } = useAppSelector(state => state.toast);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Alert severity={status} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
