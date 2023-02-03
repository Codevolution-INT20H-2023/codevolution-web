import { FC, ReactNode } from 'react';

import * as Styled from './page.styled';

interface PageProps {
  children?: ReactNode;
}

const Page: FC<PageProps> = ({ children }) => {
  return (
    <Styled.Wrapper>
      <Styled.Content>{children}</Styled.Content>
    </Styled.Wrapper>
  );
};

export default Page;
