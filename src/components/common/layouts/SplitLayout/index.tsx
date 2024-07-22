import styled from '@emotion/styled';

import { breakpoints } from '@/styles/variants';

import { Container } from '../Container';

type Props = {
  mainChildren: React.ReactNode;
  asideChildren: React.ReactNode;
};

export const SplitLayout = ({ mainChildren, asideChildren }: Props) => {
  return (
    <Wrapper>
      <Container maxWidth={breakpoints.lg}>
        <Inner>
          <Main>{mainChildren}</Main>
          <Aside>{asideChildren}</Aside>
        </Inner>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`;

const Main = styled.main`
  width: 100%;
  max-width: 900px;
`;

const Aside = styled.aside`
  display: none;
  position: sticky;
  top: 54px;
  width: 100%;
  max-width: 360px;
  height: calc(100vh - 54px);

  @media screen and (min-width: ${breakpoints.sm}) {
    display: block;
  }
`;
