import { FC, ReactNode } from 'react';

import Header from '@/components/common/header';

import * as Styled from './page.styled';

interface PageProps {
  children?: ReactNode;
}

const Page: FC<PageProps> = ({ children }) => {
  return (
    <Styled.Wrapper>
      <Header />
      <Styled.Content>{children}</Styled.Content>
    </Styled.Wrapper>
  );
};

export default Page;
