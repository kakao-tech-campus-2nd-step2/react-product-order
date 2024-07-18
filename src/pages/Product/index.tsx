import {
  Box,
  Button,
  Flex,
  Image,
  NumberInput,
  NumberInputField,
  Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'src/components/common/Spinner';

interface Product {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
}

export const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setFetchError(null);

      try {
        const response = await fetch(`https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/${productId}/detail`);
        if (!response.ok) {
          throw new Error('상품을 불러오는 중 오류가 발생했습니다.');
        }
        const data: { detail: Product } = await response.json();
        setProduct(data.detail);
        setIsLoading(false);
      } catch (error) {
        setFetchError('상품을 불러오는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleProceedToPayment = () => {
    navigate(`/payment?productId=${productId}`);
  };

  if (isLoading) {
    return (
      <Flex alignItems="center" justifyContent="center">
        <Spinner />
      </Flex>
    );
  }

  if (fetchError) {
    return <Text>{fetchError}</Text>;
  }

  if (!product) {
    return <Text>상품을 찾을 수 없습니다.</Text>;
  }

  const totalPrice = product.price.sellingPrice * quantity;

  return (
    <Box p={14} position="relative">
      <Flex direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'center', md: 'flex-start' }} maxWidth="1000px" mx="auto">
        <Image src={product.imageURL} alt={product.name} maxW="400px" />
        <Box ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }} textAlign={{ base: 'center', md: 'left' }}>
          <Text fontSize="xl" fontWeight="bold">
            {product.name}
          </Text>
          <Box position="absolute" right={50} p={4} border="1px solid lightgray" textAlign="left" maxWidth="300px" wordBreak="break-word">
            <Text fontWeight="bold" mb={2}>{product.name}</Text>
            <Flex alignItems="center" justifyContent="center">
              <Button 
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                isDisabled={quantity === 1}
                w="23px"
                h="23px"
                borderRadius="4px"
                bg="lightgray"
                fontSize="20px"
                _hover={{ bg: "#dcdcdc"}}
              >
                -
              </Button>
              <NumberInput 
                value={quantity} 
                onChange={(valueString) => setQuantity(Number(valueString))}
                maxW="200px"
                mx={4}
                mt={2}
                mb={6}
              >
                <NumberInputField />
              </NumberInput>
              <Button 
                onClick={() => setQuantity((prev) => prev + 1)}
                w="23px"
                h="23px"
                borderRadius="4px"
                bg="lightgray"
                fontSize="20px"
                _hover={{ bg: "#dcdcdc"}}
              >
                +
              </Button>
            </Flex>
          </Box>
          <Text color="gray.500">{product.price.sellingPrice}원</Text>
          <Text fontWeight="bold" mt={4} position="absolute" right={50} bottom={60} p={20} width="260px">총 결제 금액 {totalPrice}원</Text>
          <Button mt={4} bg="black" color="white" onClick={handleProceedToPayment} position="absolute" right={50} bottom={0} p={20} width="260px">
            나에게 선물하기
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};