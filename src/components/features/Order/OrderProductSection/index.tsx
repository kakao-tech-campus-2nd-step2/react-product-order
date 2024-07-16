import { Box, Container, Image, Text } from '@chakra-ui/react';

type Props = {
  imageSrc: string;
  subtitle: string;
  title: string;
  count: number;
};

const mock: Props = {
  imageSrc:
    'https://st.kakaocdn.net/product/gift/product/20240709153502_a2722681b7e8490d9db2a696e079995c.png',
  subtitle: '다니엘트루스',
  title: '"집들이선물" 디켄터 리드 디퓨저 300ml (미니2종&메시지카드 증정)',
  count: 1,
};

export const OrderProductSection = () => {
  return (
    <>
      <Wrapper></Wrapper>
    </>
  );
};

const Wrapper = () => {
  return (
    <Container>
      <Text>선물내역</Text>
      <Box>
        <Image boxSize="66px" src={mock.imageSrc} />
        <Box>
          <Text>{mock.subtitle}</Text>
          <Text>
            {mock.title} X {mock.count}개
          </Text>
        </Box>
      </Box>
    </Container>
  );
};
