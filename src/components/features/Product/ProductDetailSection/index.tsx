import { Box, Divider, Flex, Image, Text } from '@chakra-ui/react';

type Props = {
  imageUrl: string;
  name: string;
  price: string;
};

const mock: Props = {
  imageUrl:
    'https://st.kakaocdn.net/product/gift/product/20240703140657_19263fd5455146b0a308a4e0d6bacc6a.png',
  name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
  price: '145000원',
};

export const ProductDetailSection = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = () => {
  return (
    <Flex>
      <Image boxSize="450px" src={mock.imageUrl} />
      <Box>
        <Box>{mock.name}</Box>
        <Box>{mock.price}</Box>
        <Box>
          <Divider />
          <Text as="b">카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Text>
          <Divider />
        </Box>
      </Box>
    </Flex>
  );
};
