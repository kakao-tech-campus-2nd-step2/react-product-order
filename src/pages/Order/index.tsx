import { Box, Checkbox, Flex, Image, Input, Select, Text, Textarea } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/layouts/Container';

export const OrderPage = () => {
  const location = useLocation();
  const { name, imageURL, totalPrice } = location.state || {};

  return (
    <Container>
      <Flex w="full" p={5} align="flex-start" justify="center">
        <Box w="65%">
          <Flex direction="column" align="center" justify="center">
            <Box w="full" borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
              <Text fontWeight="bold" mb={4} textAlign="center">
                나에게 주는 선물
              </Text>
              <Textarea
                placeholder="선물과 함께 보낼 메시지를 적어보세요"
                bg="gray.100"
                h="100px"
              />
              <Box bg="gray.100" w="100%" p={1} mt={10} mb={10}></Box>
              <Text fontWeight="bold" mb={4} textAlign="left">
                선물내역
              </Text>
              <Flex borderWidth="1px" borderRadius="lg" p={4} align="flex-start" mb={4}>
                <Image src={imageURL} alt={name} boxSize="100px" objectFit="cover" mr={4} />
                <Text fontSize="sm">{name}</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>

        <Box w="35%">
          <Flex direction="column" align="center" justify="center">
            <Box w="full" borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
              <Flex direction="column" align="flex-start" mb={4}>
                <Text fontWeight="bold" mb={4}>
                  결제 정보
                </Text>
                <Flex align="center" mb={2}>
                  <Checkbox colorScheme="yellow">현금영수증 신청</Checkbox>
                </Flex>
                <Select placeholder="개인소득공제" mb={2}>
                  <option value="personal">개인소득공제</option>
                  <option value="business">사업자 지출증빙</option>
                </Select>
                <Input placeholder="(-없이) 숫자만 입력해주세요." mb={4} />
                <Flex justify="space-between" w="full" p={4} borderRadius="md" mb={4}>
                  <Text>최종 결제금액</Text>
                  <Text fontWeight="bold">{totalPrice}원</Text>
                </Flex>
                <Button>{totalPrice}원 결제하기</Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default OrderPage;
