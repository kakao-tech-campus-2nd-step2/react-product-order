import styled from '@emotion/styled';

import { GiftHistory } from './GiftHistory';
import { MessageCard } from './MessageCard';

export const GiftMessageSection = ({
  orderHistory,
  inputRef,
}: {
  orderHistory: { id: number; count: number };
  inputRef: React.RefObject<HTMLInputElement>;
}) => {
  return (
    <GiftMessageSectionWrapper>
      <MessageCard ref={inputRef} />
      <CustomDivider></CustomDivider>
      <GiftHistory orderHistory={orderHistory} />
    </GiftMessageSectionWrapper>
  );
};
const GiftMessageSectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const CustomDivider = styled.div`
  height: 8px;
  background-color: #ededed;
`;
