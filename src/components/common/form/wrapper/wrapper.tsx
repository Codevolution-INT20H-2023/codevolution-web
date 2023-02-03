import { DetailedHTMLProps, FC, FormHTMLAttributes, Ref } from 'react';

import * as Styled from './wrapper.styled';

interface WrapperProps
  extends DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  ref?: Ref<HTMLFormElement>;
}

const Wrapper: FC<WrapperProps> = props => {
  return <Styled.Wrapper {...props} />;
};

export default Wrapper;
