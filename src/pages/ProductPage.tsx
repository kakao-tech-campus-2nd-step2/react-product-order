import { Box, Image, Input, Flex, Text, Container, Button } from '@chakra-ui/react';
import '@/styles/productPage.css';
import styled from '@emotion/styled';
import { useGetGoodsDetail } from '@/api/hooks/useGetGoodsDetail';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/provider/Auth';
import { Spinner } from '@/components/common/Spinner';
import { useState } from 'react';
import { getDynamicPath } from '@/routes/path';

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams<{ productId: string }>();
  const { data, isError, isLoading } = useGetGoodsDetail(Number(productId));

  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const navigate = useNavigate();
  const authInfo = useAuth();
  const handleClick = () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }
    navigate(getDynamicPath.order(Number(productId || '0')), { state: { quantity } });
  };

  if (isLoading) {
    return (
      <TextView>
        <Spinner />
      </TextView>
    );
  }

  if (isError) {
    return <TextView>에러가 발생했습니다.</TextView>;
  }

  if (!data || !data.detail || !data.detail.price || !data.detail.price.sellingPrice) {
    return <TextView>상품 정보를 불러올 수 없습니다.</TextView>;
  }

  const productDetail = data.detail;

  return (
    <Flex align="center" h="100vh">
      <Container p="32px 32px 80px">
        <Flex>
          <Image boxSize="450" src={productDetail.imageURL} alt={productDetail.name} />
          <Box pl="24px">
            <Text fontSize={24} pt="17px">
              {productDetail.name}
            </Text>
            <Text fontSize={30} pt="17px">
              {productDetail.price.sellingPrice.toLocaleString()}원
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
          <Text fontWeight="bold">{productDetail.name}</Text>
          <Flex align="center" justifyContent="space-between" pt="8px">
            <Button
              w="40px"
              h="40px"
              borderRadius="4px"
              className="btn"
              fontWeight="bold"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </Button>
            <Input variant="outline" value={quantity} p="0px 16px" readOnly />
            <Button
              w="40px"
              h="40px"
              borderRadius="4px"
              className="btn"
              fontWeight="bold"
              onClick={() => handleQuantityChange(1)}
            >
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
            <Text fontWeight="bold">
              {(productDetail.price.sellingPrice * quantity).toLocaleString()}원
            </Text>
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
            onClick={handleClick}
          >
            나에게 선물하기
          </Button>
        </Box>
      </Container>
    </Flex>
  );
};

export default ProductPage;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
