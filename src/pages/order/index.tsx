import * as S from './styles';
import { Container } from '@/components/common/layouts/Container';
import { AsideBox } from '@/components/features/Product/ProductBuySection/styles.ts';
import { MainBox } from '@/components/features/Product/ProductInfoSection/styles.ts';
import {
  Box,
  Checkbox,
  Divider,
  Image,
  Input,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';

const OrderPage = () => {
  return (
    <form action=''>
      <Box width='100%'>
        <Container maxWidth='1280px'>
          <Box
            display='flex'
            width='100%'
            justifyContent='flex-start'
            alignItems='flex-start'
            position='relative'
          >
            <MainBox>
              <S.giftBox>
                <S.giftSection>
                  <Box display='flex' width='100%' justifyContent='center'>
                    <Text
                      fontSize='18px'
                      fontWeight='bold'
                      lineHeight='21px'
                      boxSizing='border-box'
                      color='rgb(34, 34, 34)'
                    >
                      나에게 주는 선물
                    </Text>
                  </Box>
                  <Box width='100%' px='14px' py='30px'>
                    <Box
                      width='100%'
                      paddingTop='12px'
                      px='30px'
                      paddingBottom='16px'
                    >
                      <Textarea
                        name='messageCardTextMessage'
                        placeholder='선물과 함께 보낼 메시지를 적어보세요'
                        width='100%'
                        height='100px'
                        background='var(--chakra-colors-gray-100)'
                        resize='none'
                        borderWidth='2px'
                        borderColor='var(--chakra-colors-transparent)'
                        borderStyle='solid'
                      ></Textarea>
                    </Box>
                  </Box>
                </S.giftSection>
                <Divider
                  height='8px'
                  width='100%'
                  backgroundColor='rgb(237, 237, 237)'
                />
              </S.giftBox>
              <S.giftListSection>
                <Text
                  fontSize='15px'
                  lineHeight='24px'
                  fontWeight='bold'
                  color='rgb(0, 0, 0)'
                >
                  선물내역
                </Text>
                <Box width='100%' backgroundColor='inherit' height='16px'></Box>
                <S.giftDetailBox>
                  <Box display='flex'>
                    <S.giftImgBox>
                      <Image
                        src='https://st.kakaocdn.net/product/gift/product/20230719172408_647e86454c9a4b11990595786acd7405.jpg'
                        objectFit='cover'
                        objectPosition='center center'
                        borderRadius='0px'
                        aspectRatio='1/1'
                        width={86}
                      />
                    </S.giftImgBox>
                    <Box paddingLeft='8px'>
                      <Text
                        fontSize='13px'
                        lineHeight='14px'
                        color='rgb(136, 136, 136)'
                        fontWeight={400}
                      >
                        빤쮸토끼
                      </Text>
                      <Text
                        fontSize='14px'
                        lineHeight='18px'
                        marginTop='3px'
                        color='rgb(34, 34, 34)'
                        fontWeight={400}
                        overflow='hidden'
                      >
                        빤쮸토끼 얼굴 파우치 키링 X 1개
                      </Text>
                    </Box>
                  </Box>
                </S.giftDetailBox>
              </S.giftListSection>
            </MainBox>
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
                  <Box
                    width='100%'
                    backgroundColor='inherit'
                    height='16px'
                  ></Box>
                  <Select width='100%'>
                    <S.OptionItems value='PERSONAL'>개인소득공제</S.OptionItems>
                    <S.OptionItems value='BUSINESS'>사업자증빙용</S.OptionItems>
                  </Select>
                  <Box
                    height='8px'
                    width='100%'
                    backgroundColor='inherit'
                  ></Box>
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
                    11500원
                  </Text>
                </S.PriceBox>
                <Divider />
                <Box width='100%' height='32px' backgroundColor='inherit'></Box>
                <S.SubmitButton>11500원 결제하기</S.SubmitButton>
              </Box>
            </AsideBox>
          </Box>
        </Container>
      </Box>
    </form>
  );
};

export default OrderPage;
