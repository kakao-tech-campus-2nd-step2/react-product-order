import styled from '@emotion/styled';

import { HeadingText } from '../Common/HeaderText';
import { MessageCardsFields } from '../Fields/MessageCardsFields';

export const OrderFormMessageCard = () => {
  return (
    <Wrapper>
      <TitleWrapper>
        <HeadingText>나에게 주는 선물</HeadingText>
      </TitleWrapper>
      <MessageCardsFields />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 44px 0 32px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
