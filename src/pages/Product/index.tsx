import {
  Box,
  Button,
  Flex,
  Image,
  Text,
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
  const [fetchError, setFetchError] = useState<string | null>(null); // Changed variable name to avoid shadowing 'error'

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

  return (
    <Box p={4}>
      <Flex>
        <Image src={product.imageURL} alt={product.name} maxW="400px" />
        <Box ml={4}>
          <Text fontSize="xl" fontWeight="bold">
            {product.name}
          </Text>
          <Text color="gray.500">{product.price.sellingPrice}원</Text>
          <Button mt={4} colorScheme="blue" onClick={handleProceedToPayment}>
            결제하기
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};