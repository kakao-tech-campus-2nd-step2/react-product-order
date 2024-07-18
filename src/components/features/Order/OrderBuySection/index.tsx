import * as S from './styles';
import { AsideBox } from '@/components/features/Product/ProductBuySection/styles.ts';
import { Box, Checkbox, Divider, Input, Select, Text } from '@chakra-ui/react';

type Props = {
  price: number;
};
const OrderBuySection = ({ price }: Props) => {
  return (
    <AsideBox>
      <Box
        width='100%'
        height='100%'
        borderLeft='1px solid rgb(237, 237, 237)'
        borderRight='1px solid rgb(237, 237, 237)'
        padding='16px'
      >
        <S.AsideTitleBox>
          <Text
            fontSize='18px'
            lineHeight='21px'
            color='rgb(34, 34, 34)'
            fontWeight='bold'
          >
            결제 정보
          </Text>
        </S.AsideTitleBox>
        <Divider borderWidth='0px 0px 1px' color='rgb(237, 237, 237)' />
        <Box width='100%' padding='16px'>
          <Checkbox>
            <Text
              fontSize='15px'
              lineHeight='24px'
              fontWeight='700'
              color='rgb(0, 0, 0)'
            >
              현금영수증 신청
            </Text>
          </Checkbox>
          <Box width='100%' backgroundColor='inherit' height='16px'></Box>
          <Select width='100%'>
            <S.OptionItems value='PERSONAL'>개인소득공제</S.OptionItems>
            <S.OptionItems value='BUSINESS'>사업자증빙용</S.OptionItems>
          </Select>
          <Box height='8px' width='100%' backgroundColor='inherit'></Box>
          <Input
            width='100%'
            name='cashReceiptNumber'
            placeholder='(-없이) 숫자만 입력해주세요.'
          />
        </Box>
        <Divider />
        <S.PriceBox>
          <Text
            fontSize='15px'
            lineHeight='24px'
            fontWeight='700'
            color='rgb(0, 0, 0)'
          >
            최종 결제금액
          </Text>
          <Text
            fontSize='18px'
            lineHeight='21px'
            fontWeight='700'
            color='rgb(34, 34, 34)'
            boxSizing='border-box'
          >
            {price}원
          </Text>
        </S.PriceBox>
        <Divider />
        <Box width='100%' height='32px' backgroundColor='inherit'></Box>
        <S.SubmitButton>{price}원 결제하기</S.SubmitButton>
      </Box>
    </AsideBox>
  );
};

export default OrderBuySection;
