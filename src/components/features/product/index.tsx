// src/components/ProductContents.tsx
import { Box, Button, Flex, HStack, Image, Input,Spacer, Text} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

import { useGetProduct } from '@/api/hooks/useGetProductDetails'; // useGetProduct 훅이 정의된 경로를 정확히 입력하세요
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import type { GoodsData } from '@/types';

type ProductPageProps = {
  productId: string; 
};

const ProductContents: React.FC<ProductPageProps> = ({ productId }) => {
  const { data, isLoading} = useGetProduct({ productId });
  const [quantity, setQuantity] = useState(1);
  const auth = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <></>; 
  }
  if (!data || !data.detail) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }
  
  const handleFormeClick = () => {
    if (!auth) {
      const redirect = confirm('로그인이 필요한 메뉴입니다. 로그인 페이지로 이동하시겠습니까?');
      if (redirect) {
        const currentPath = window.location.pathname;
        navigate(getDynamicPath.login(currentPath));
      }
    } else {
      console.log('로그인됨!');
      navigate(RouterPath.order, {
        state: {
          productDetail: data.detail,
          quantity,
          price: data.detail.price.basicPrice * quantity,
        },
      });
    }
  };
  
  const productData: GoodsData = data.detail;
  const price = productData.price.basicPrice * quantity
  console.log(productData);
  return (
    <Box p={4} mr={20} ml={20}>
      <Flex>
       <Box w="70%">
          <Flex>
            <Image src={productData.imageURL} 
              alt="Product Image" 
              width="100%" 
              maxWidth="450px" 
              objectFit="cover" 
            />
            <Box w="350px" ml="30px">
              <Text fontSize="25px" mt={15} >{productData.name}</Text>
              <Text fontSize="30px" mt={4}>{productData.price.basicPrice}원</Text> 
              <Text mt="50px" pt={5} pb={5} 
              borderTop="1px solid"
              borderBottom="1px solid"
              borderColor="gray.200"
              color="black"
              fontSize={14}
              fontWeight="bold">카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Text>
            </Box>

          </Flex>
        </Box>
        <Box w="30%" p={4}>
          <Flex direction="column" mt={4} alignItems="center" height="80vh" justifyContent="space-between" >
            <Box border="1px solid" p={5} borderColor="gray.200">
              <Text fontSize="15px" fontWeight="bold" mr={20}>{productData.name}</Text>
              <HStack>
                <Button 
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                fontSize="40px"
                textAlign="center"
                pb={2}
                >
                 -</Button>
                <Input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  width="100%" 
                />
                <Button 
                onClick={() => setQuantity(quantity + 1)}
                fontSize="30px"
                textAlign="center"
                pb={2}
                >+</Button>
              </HStack>
            </Box>
            <Spacer />
            <Box width="100%">
              <HStack mt={4} p={2} pl={4} pr={4} borderRadius={10} backgroundColor="blackAlpha.50" justifyContent="space-between">
                <Text fontSize="15px">총 결제 금액</Text>
                <Text fontSize="20px" fontWeight="bold">{price}원</Text>
              </HStack>
              <Button
                  mt={5}
                  p={5}
                  bg="black"
                  fontSize="15px"
                  textAlign="center"
                  borderRadius="5px"
                  color="white"
                  width="100%"
                  style={{ padding: '20px !important' }}
                  onClick={handleFormeClick}
                >
                나에게 선물하기
              </Button>
            </Box>
          </Flex>

        </Box>

      </Flex>
    </Box>
  );
};

export default ProductContents;
