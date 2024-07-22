import styled from '@emotion/styled';

import { breakpoints } from '@/styles/variants';

import { DefaultGoodsItems, type DefaultGoodsItemsProps } from './Default';

type Props = {
  rankingIndex: number;
  onClick?: () => void; // onClick prop 추가
} & DefaultGoodsItemsProps;

export const RankingGoodsItems = ({ rankingIndex, onClick, ...props }: Props) => {
  return (
    <Wrapper onClick={onClick}>
      <RankingLabel rankingIndex={rankingIndex}>{rankingIndex}</RankingLabel>
      <DefaultGoodsItems {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer; 
`;

const RankingLabel = styled.span<Pick<Props, 'rankingIndex'>>`
  position: absolute;
  z-index: 2;
  width: 20px;
  min-width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  line-height: 1;
  font-weight: 700;
  top: 4px;
  left: 4px;
  color: #fff;
  background-color: ${({ rankingIndex }) => (rankingIndex <= 3 ? '#fd7364' : '#bbb')};

  @media screen and (min-width: ${breakpoints.sm}) {
    width: 30px;
    min-width: 30px;
    height: 30px;
    border-radius: 6px;
    font-size: 18px;
  }
`;
