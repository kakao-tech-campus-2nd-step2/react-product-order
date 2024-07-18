import { useState } from 'react';

import * as S from './styles';
import { MainBox } from '@/components/features/Product/ProductInfoSection/styles.ts';
import { Box, Divider, Image, Text, Textarea } from '@chakra-ui/react';

type Props = {
  imageSrc: string;
  title: string;
  subtitle: string;
  quantity: number;
};

const OrderDetailSection = ({ imageSrc, title, subtitle, quantity }: Props) => {
  const [message, setMessage] = useState<string>('');

  const handleChangeMessage = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    if (value.length <= 100) {
      setMessage(value);
    }
  };

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
                onChange={handleChangeMessage}
              ></Textarea>
              {message.length > 100 && ( // 100자 초과 시 안내 표시
                <Text fontSize='12px' color='red'>
                  카드 메시지가 100글자를 초과하였습니다. 100자 이내로
                  입력해주세요.
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
