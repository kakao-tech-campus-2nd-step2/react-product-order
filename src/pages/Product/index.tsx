import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Image, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetThemeProductDetail } from '@/api/hooks/useGetThemeProductDetail';
import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

export const ProductPage = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const { data } = useGetThemeProductDetail(productId);
  const navigate = useNavigate();
  const authInfo = useAuth();

  const detail = data?.detail;

  const [quantity, setQuantity] = useState(1);
  const price = detail?.price?.basicPrice ?? 0;
  const totalPrice = price * quantity;

  const handleIncrease = () => setQuantity(quantity + 1);

  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleBtnClick = () => {
    if (!authInfo) {
      const redirectUrl = getDynamicPath.product(productId);
      navigate(getDynamicPath.login(redirectUrl));
    } else {
      navigate(RouterPath.order, {
        state: { name: detail?.name, imageURL: detail?.imageURL, totalPrice: totalPrice },
      });
    }
  };

  return (
    <Container>
      <Flex p={5} align="flex-start" justify="space-between">
        <Box w="35%">
          <Image src={detail?.imageURL} alt={detail?.name} />
        </Box>

        <Box w="30%">
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            {detail?.name}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            {detail?.price.basicPrice}원
          </Text>
          <Text fontSize="sm" mb={4}>
            카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
          </Text>
        </Box>

        <Box w="30%">
          <Flex direction="column" align="center" justify="center">
            <Box w="full" borderWidth="1px" borderRadius="lg" overflow="hidden" p={3} mb={10}>
              <Text fontWeight="bold" mb={2}>
                {detail?.name}
              </Text>
              <Flex align="center" justify="center" mb={10}>
                <IconButton aria-label="-" icon={<MinusIcon />} onClick={handleDecrease} />
                <Input width="50px" textAlign="center" value={quantity} readOnly mx={2} />
                <IconButton aria-label="+" icon={<AddIcon />} onClick={handleIncrease} />
              </Flex>
            </Box>

            <Flex w="full" p={4} bg="gray.100" borderRadius="md" justify="space-between" mb={4}>
              <Text>총 결제 금액</Text>
              <Text fontWeight="bold">{totalPrice.toLocaleString()}원</Text>
            </Flex>

            <Flex w="full">
              <Button bg="black" color="white" w="full" onClick={handleBtnClick}>
                나에게 선물하기
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};
