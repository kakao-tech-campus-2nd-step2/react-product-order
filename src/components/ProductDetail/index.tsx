import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Image, Text, Button, VStack, HStack, IconButton } from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import { fetchInstance } from '@/api/instance';
import { useAuth } from '@/provider/Auth';

type ProductDetail = {
  id: string;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  brandInfo: {
    id: string;
    name: string;
    imageURL: string;
  };
  wish: {
    isWished: boolean;
    wishCount: number;
  };
};

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const authInfo = useAuth();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetchInstance.get(`/v1/products/${productId}/detail`);
        if (response.status === 200) {
          setProduct(response.data.detail);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to fetch product detail:', error);
        navigate('/');
      }
    };

    fetchProductDetail();
  }, [productId, navigate]);

  const handleGiftClick = () => {
    if (!authInfo) {
      navigate('/login');
    } else {
      navigate(`/checkout/${productId}`, { state: { quantity } });
    }
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  if (!product) {
    return <Text>Loading...</Text>;
  }

  const totalAmount = product.price.sellingPrice * quantity;

  return (
    <Box display="flex" justifyContent="space-between" p="20px">
      <Box flex="1" maxW="500px">
        <Image src={product.imageURL} alt={product.name} boxSize="300px" objectFit="cover" />
      </Box>
      <Box flex="2" ml="20px" display="flex" flexDirection="column" justifyContent="space-between">
        <VStack alignItems="flex-start" spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">{product.name}</Text>
          <Box alignSelf="flex-end" textAlign="right">
            <Text fontSize="2xl" fontWeight="bold">{product.name}</Text>
            <HStack justifyContent="center">
              <IconButton
                icon={<MinusIcon />}
                aria-label="Decrease quantity"
                onClick={handleDecrement}
              />
              <Text>{quantity}</Text>
              <IconButton
                icon={<AddIcon />}
                aria-label="Increase quantity"
                onClick={handleIncrement}
              />
            </HStack>
          </Box>
          <Text fontSize="xl">{product.price.sellingPrice}원</Text>
          <Text>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Text>
        </VStack>
        <VStack spacing={4} alignItems="flex-end">
          <Text>총 결제 금액</Text>
          <Text fontSize="2xl" fontWeight="bold">{totalAmount}원</Text>
          <Button bg="black" color="white" onClick={handleGiftClick}>나에게 선물하기</Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
