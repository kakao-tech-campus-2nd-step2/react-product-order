import { Box, Image, Input, Flex, Text, Container, Button } from '@chakra-ui/react';
import '@/styles/productPage.css';

const ProductPage = () => {
  return (
    <Flex align="center" h="100vh">
      <Container p="32px 32px 80px">
        <Flex>
          <Image
            boxSize="450"
            src="https://st.kakaocdn.net/product/gift/product/20240701091842_fff1dd1c0fc84e9fbf0fa61d1b4bd273.png"
          ></Image>
          <Box pl="24px">
            <Text fontSize={24} pt="17px">
              [하트 선물포장] 퍼퓸 핸드크림
            </Text>
            <Text fontSize={30} pt="17px">
              32000원
            </Text>
            <Box
              fontSize={14}
              p="24px 12px"
              borderTop="1px"
              borderBottom="1px"
              borderColor="inherit"
              mt="50px"
              fontWeight="bold"
            >
              카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
            </Box>
          </Box>
        </Flex>
      </Container>
      <Container
        h="100%"
        p="30px 12px 30px 30px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box w="100%" border="1px solid rgb(237, 237, 237)" p="12px 14px 16px" borderRadius="2px">
          <Text fontWeight="bold">[하트 선물포장] 퍼퓸 핸드크림</Text>
          <Flex align="center" justifyContent="space-between" pt="8px">
            <Button w="40px" h="40px" borderRadius="4px" className="btn" fontWeight="bold">
              -
            </Button>
            <Input variant="outline" value="1" p="0px 16px"></Input>
            <Button w="40px" h="40px" borderRadius="4px" className="btn" fontWeight="bold">
              +
            </Button>
          </Flex>
        </Box>
        <Box pt="12px">
          <Flex
            justifyContent="space-between"
            p="18px 20px"
            mb="20px"
            backgroundColor="rgb(245, 245, 245)"
          >
            <Text fontWeight="bold">결제 금액</Text>
            <Text fontWeight="bold">0원</Text>
          </Flex>
          <Button
            backgroundColor="#111"
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="100%"
            fontSize="16px"
            color="#FFF"
            h="60px"
            borderRadius="4px"
          >
            나에게 선물하기
          </Button>
        </Box>
      </Container>
    </Flex>
  );
};

export default ProductPage;
