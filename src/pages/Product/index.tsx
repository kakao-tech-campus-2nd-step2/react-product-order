import {
      Box,
      Button,
      Flex,
      Heading,
      HStack,
      Image,
      Input,
      Spinner,
      Text,
      VStack,
    } from '@chakra-ui/react';
    import React, { useEffect, useRef, useState } from 'react';
    import { useNavigate, useParams } from 'react-router-dom';

    import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
    import { useAuth } from '@/provider/Auth/index';

    const ProductDetail: React.FC = () => {
      const { id } = useParams<{ id: string }>();
      const { data, isLoading, isError } = useGetProductDetail(Number(id));
      const [quantity, setQuantity] = useState(1);
      const navigate = useNavigate();
      const auth = useAuth();
      const formRef = useRef<HTMLFormElement>(null);

      useEffect(() => {
        // 상품 정보가 없을 경우 메인 페이지로 리디렉션
        if (!isLoading && !data) {
          navigate('/');
        }
      }, [isLoading, data, navigate]);

      if (isLoading)
        return (
          <Box textAlign="center">
            <Spinner />
          </Box>
        );
      if (isError) return <Box textAlign="center">에러가 발생했습니다.</Box>;
      if (!data) return null;

      const handleIncrease = () => setQuantity((prev) => prev + 1);
      const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
      const totalPrice = data.price.sellingPrice * quantity;

      // 나에게 선물하기 버튼 클릭 핸들러
      const handleGift = (event: React.FormEvent) => {
        event.preventDefault();
        // 로그인이 되어 있지 않으면 로그인 페이지로 이동 확인
        if (!auth) {
          if (window.confirm('로그인이 필요한 메뉴입니다. 로그인 페이지로 이동하시겠습니까?')) {
            navigate('/login');
          }
          return;
        }
        navigate('/order', { state: { product: data, quantity } });
      };

      return (
        <Flex direction="column" maxWidth="1800px" margin="auto" padding={4}>
          <Flex direction={{ base: 'column', md: 'row' }} alignItems="start">
            <Image src={data.imageURL} alt={data.name} objectFit="cover" boxSize="450" />
            <VStack spacing={5} align="start" padding={5}>
              <Text width="450px" fontSize="4xl">
                {data.name}
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                {data.price.sellingPrice.toLocaleString()}원
              </Text>
              <Text>카톡 친구가 아니어도 선물 코드로 선물할 수 있어요!</Text>
            </VStack>
            <VStack spacing={5} padding={5}>
              <Box p={5} mt={10} w="full" border="1px" borderRadius="10px" borderColor="#ccd0d5">
                <Heading as="h2" size="m" marginBottom={5}>
                  {data.name}
                </Heading>
                <form ref={formRef} onSubmit={handleGift}>
                  <HStack>
                    <Button size="sm" onClick={handleDecrease} type="button">
                      -
                    </Button>
                    <Input readOnly value={quantity} textAlign="center" width="100%" />
                    <Button size="sm" onClick={handleIncrease} type="button">
                      +
                    </Button>
                  </HStack>
                  <Text fontSize="2xl" fontWeight="bold" mt={4}>
                    총 결제 금액: {totalPrice.toLocaleString()}원
                  </Text>
                  <Button colorScheme="gray" size="lg" width="300px" height="60px" type="submit">
                    나에게 선물하기
                  </Button>
                </form>
              </Box>
            </VStack>
          </Flex>
        </Flex>
      );
    };

    export default ProductDetail;
