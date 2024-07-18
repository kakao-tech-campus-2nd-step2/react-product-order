import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';

import useProductDetail from '../../../api/hooks/useProductDetail';

interface ProductDetailProps {
  productId: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const productDetail = useProductDetail(productId);
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const navigate = useNavigate();
  const authInfo = useAuth()

  useEffect(() => {
    if (productDetail) {
      setPrice(quantity * productDetail.detail.price.sellingPrice);
    }
  }, [productDetail, quantity]);

  if (!productDetail) {
    return <Text>로딩 중...</Text>;
  }

  const handleQuantityChange = (value: number) => {
    if (value < 1 || value > 99) return;
    setQuantity(value);
    setPrice(value * productDetail.detail.price.sellingPrice);
  };

  const { detail } = productDetail;

  const handleOrder = () => {
    if (!authInfo) {  // 로그인하지 않은 경우 로그인 페이지로 이동
      navigate(RouterPath.login)
    } else {  // 로그인 되어 있는 경우 상품 주문페이지로 이동
      navigate(RouterPath.order, { state: { productDetail: detail, quantity, price } });
    }
  };

  return (
    <Box p={4}>
      <Flex direction={{ base: 'column', md: 'row' }} justify="center">
        <Image src={detail.imageURL} alt={detail.name} boxSize="300px" objectFit="cover" />
        <Box ml={{ md: 4 }} w={{ base: '100%', md: 500 }} marginLeft={50}>
          <Text fontSize={24} fontWeight="bold" m={20}>{detail.name}</Text>
          <Text fontSize={23} color="gray.500" m={20}>{detail.price.sellingPrice}원</Text>
          <Flex mt={4} align="center" marginTop={30} mx={20} marginBottom={10}>
            <IconButton
              aria-label="Decrease Quantity"
              icon={<MinusIcon />}
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              variant="outline"
              padding={10}
            />
            <Text mx={4} fontSize="22" px={20} py={10}>
              {quantity}
            </Text>
            <IconButton
              aria-label="Increase Quantity"
              icon={<AddIcon />}
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= 99}
              variant="outline"
              padding={10}
            />
          </Flex>
          <Flex direction="column" align="flex-end" mt={4} mx={20} mb={10}>
            <Flex justify="flex-end" width="100%">
              <Text fontSize={20} fontWeight="bold" m={20}>총 결제 금액</Text>
              <Text fontSize={20} fontWeight="bold" m={20}>{price}원</Text>
            </Flex>
            <Button onClick={handleOrder} mt={4} colorScheme="teal" color={'white'} bg={'black'} px={70} py={13} borderRadius={5}>
              나에게 선물하기
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductDetail;
