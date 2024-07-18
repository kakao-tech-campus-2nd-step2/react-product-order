import * as S from './styles';
import { Text, Button, Input } from '@chakra-ui/react';

type Props = {
  title: string;
  amount: number;
};
const ProductBuySection = ({ title, amount }: Props) => {
  return (
    <S.AsideBox>
      <S.AsideWrapper>
        <S.ProductNumberBox>
          <Text
            fontWeight='700'
            lineHeight='22px'
            color='rgb(17, 17, 17)'
            overflowWrap='break-word'
            wordBreak='break-all'
          >
            {title}
          </Text>
          <S.ItemNumberBox>
            <Button
              type='button'
              aria-label='수량 1개 감소'
              role='button'
              tabIndex={-1}
              aria-disabled='true'
            >
              <Text fontSize='24px' fontWeight='700'>
                -
              </Text>
            </Button>
            <Input
              inputMode='decimal'
              type='text'
              pattern='[0-9]*(.[0-9]+)?'
              role='spinbutton'
              aria-valuemin={1}
              aria-valuemax={100}
              aria-valuenow={1}
              aria-valuetext='1'
              autoComplete='off'
              autoCorrect='off'
              value='1'
            />
            <Button
              type='button'
              aria-label='수량 1개 추가'
              role='button'
              tabIndex={-1}
              aria-disabled='true'
            >
              <Text fontSize='20px' fontWeight='700'>
                +
              </Text>
            </Button>
          </S.ItemNumberBox>
        </S.ProductNumberBox>
        <S.ButtonBox>
          <S.TotalPriceBox>
            총 결제 금액 <S.PriceText>{amount}원</S.PriceText>
          </S.TotalPriceBox>
          <S.ButtonItem>나에게 선물하기</S.ButtonItem>
        </S.ButtonBox>
      </S.AsideWrapper>
    </S.AsideBox>
  );
};

export default ProductBuySection;
