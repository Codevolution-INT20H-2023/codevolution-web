import { FC, ReactNode } from 'react';
import { Modal as MuiModal, ModalProps as MuiModalProps } from '@mui/material';

import * as Styled from './modal.styled';

type ModalProps = Omit<MuiModalProps, 'children'> & {
  children?: ReactNode;
  title?: string;
};

const Modal: FC<ModalProps> = ({ children, title, ...props }) => {
  return (
    <MuiModal {...props}>
      <Styled.ModalContent>
        <Styled.Title>{title}</Styled.Title>
        {children}
      </Styled.ModalContent>
    </MuiModal>
  );
};

export default Modal;
