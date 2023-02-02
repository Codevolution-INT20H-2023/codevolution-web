import { FC, ReactNode } from 'react';

import Header from '@/components/common/header';
import Toast from '@/components/common/toast';

import * as Styled from './page.styled';

interface PageProps {
  children?: ReactNode;
}

const Page: FC<PageProps> = ({ children }) => {
  return (
    <Styled.Wrapper>
      <Header />
      <Toast />
      <Styled.Content>{children}</Styled.Content>
    </Styled.Wrapper>
  );
};

export default Page;
