import { Controller, useFormContext } from 'react-hook-form';

import * as S from './styles';
import { MainBox } from '@/components/features/Product/ProductInfoSection/styles.ts';
import { Box, Divider, Image, Text, Textarea } from '@chakra-ui/react';

type Props = {
  imageSrc: string;
  title: string;
  subtitle: string;
  quantity: number;
  isError: (isError: boolean) => void;
};

const OrderDetailSection = ({
  imageSrc,
  title,
  subtitle,
  quantity,
  isError,
}: Props) => {
  const { control, watch } = useFormContext();
  const message = watch('message');

  return (
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
            <Box width='100%' paddingTop='12px' px='30px' paddingBottom='16px'>
              <Controller
                name='message'
                control={control}
                rules={{
                  validate: (value) => {
                    if (value.length > 100) {
                      isError(true);
                      return '카드 메시지가 100글자를 초과하였습니다. 100자 이내로 입력해주세요.';
                    } else if (value.length < 1) {
                      isError(true);
                      return '카드 메시지를 입력해주세요.';
                    }
                    isError(false);
                    return true;
                  },
                }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    name='messageCardTextMessage'
                    placeholder='선물과 함께 보낼 메시지를 적어보세요'
                    width='100%'
                    height='100px'
                    background='var(--chakra-colors-gray-100)'
                    resize='none'
                    borderWidth='2px'
                    borderColor='var(--chakra-colors-transparent)'
                    borderStyle='solid'
                  />
                )}
              />
              {message.length > 100 && (
                <Text fontSize='12px' color='red' mt='5px'>
                  카드 메시지가 100글자를 초과하였습니다. 100자 이내로
                  입력해주세요.
                </Text>
              )}
              {message.length < 1 && (
                <Text fontSize='12px' color='red' mt='5px'>
                  카드 메시지를 입력해주세요.
                </Text>
              )}
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
                src={imageSrc}
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
                {subtitle}
              </Text>
              <Text
                fontSize='14px'
                lineHeight='18px'
                marginTop='3px'
                color='rgb(34, 34, 34)'
                fontWeight={400}
                overflow='hidden'
              >
                {title} x {quantity}개
              </Text>
            </Box>
          </Box>
        </S.giftDetailBox>
      </S.giftListSection>
    </MainBox>
  );
};

export default OrderDetailSection;
