import {
  Box,
  Container,
  Input,
  Checkbox,
  Select,
  Textarea,
  Text,
  Image,
  Flex,
} from '@chakra-ui/react';

import { Button } from '@/components/common/Button/index';

const OrderPage = () => {
  return (
    <Flex w="100vw">
      <Container w="70%">
        <Flex p="44px 0px 32px" flexDirection="column">
          <Text as="span" fontSize="18px" fontWeight="bold" textAlign="center">
            나에게 주는 선물
          </Text>
          <Textarea
            placeholder="선물과 함께 보낼 메시지를 적어보세요"
            p="8px 16px 8px"
            m="26px 60px 30px"
            backgroundColor="#EDF2F7"
            h="100px"
          ></Textarea>
        </Flex>
        <Box backgroundColor="#EDEDED" h="8px" w="100%" />
        <Box p="16px">
          <Text fontWeight="bold" fontSize="15px" lineHeight="24px">
            선물내역
          </Text>
          <Box
            p="20px 16px 16px"
            display="flex"
            border="1px solid rgb(237, 237, 237)"
            borderRadius="8px"
            mt="16px"
          >
            <Image
              src="https://st.kakaocdn.net/product/gift/product/20240701091842_fff1dd1c0fc84e9fbf0fa61d1b4bd273.png"
              boxSize="86"
            ></Image>
            <Box pl="8px">
              <Text fontSize="13px" color="#888">
                브랜드명
              </Text>
              <Text fontSize="14px" lineHeight="18px" pt="3px">
                상품이름
              </Text>
            </Box>
          </Box>
        </Box>
      </Container>
      <Container
        p="16px"
        borderLeft="1px solid rgb(237, 237, 237)"
        borderRight="1px solid rgb(237, 237, 237)"
        w="30%"
      >
        <Text
          as="h6"
          p="24px 0px 20px"
          fontWeight="bold"
          borderBottom="1px solid rgb(237, 237, 237)"
        >
          결제 정보
        </Text>
        <Box display="flex" flexDirection="column" p="16px">
          <Checkbox mb="16px" fontSize="15px" fontWeight="bold">
            현금영수증 신청
          </Checkbox>
          <Select p="0px 32px 1px 16px" w="100%" h="40px" border="1px solid rgb(237, 237, 237)">
            <option value="personal">개인소득공제</option>
            <option value="business">사업자증빙용</option>
          </Select>
          <Input
            placeholder="(-없이) 숫자만 입력해주세요."
            h="40px"
            mt="8px"
            p="0px 16px"
            border="1px solid rgb(237, 237, 237)"
            borderRadius="4px"
          ></Input>
        </Box>
        <Flex
          justifyContent="space-between"
          borderTop="1px solid rgb(237, 237, 237)"
          borderBottom="1px solid rgb(237, 237, 237)"
          p="16px"
          mb="3px"
        >
          <Text fontSize="16px" fontWeight="bold">
            최종 결제금액
          </Text>
          <Text fontSize="16px" fontWeight="bold">
            42000원
          </Text>
        </Flex>
        <Button>42000원 결제하기</Button>
      </Container>
    </Flex>
  );
};

export default OrderPage;
