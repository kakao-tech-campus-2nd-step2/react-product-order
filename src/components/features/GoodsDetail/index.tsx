import styled from '@emotion/styled';

import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';

import { GoodsHeaderSection } from './GoodsHeaderSection';

export const GoodsDetail = () => {
  return (
    <Wrapper>
      <GoodsHeaderSection />
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  margin: 0 auto;
  padding: 14px 14px 3px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 45px 52px 23px;
  }
`;
