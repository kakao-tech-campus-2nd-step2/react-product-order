import { Box, Button, Container, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { fetchInstance } from "@/api/instance";
import { Spinner } from "@/components/common/Spinner";
import { RouterPath } from "@/routes/path";
import type { DetailData } from "@/types";

export const ProductsPage = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const [data, setData] = useState<DetailData>();
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const totalPrice = (Number((data?.detail.price.sellingPrice))*quantity)
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchInstance.get(`/v1/products/${productId}/detail`);
        setData(response.data); 
        console.log("API Response", response.data);
      } catch (error) {
        alert("상품 없음")
      } finally {
        setIsLoading(false)
      }
    }
    fetchDetails();
  }, [productId]);

  if (isLoading) {
    return <Spinner />
  }

  const handleGiftMe = () => {
    const authtoken = sessionStorage.getItem('authToken');
    if (!authtoken) {
      navigate(RouterPath.login);
    } else {
      navigate(RouterPath.payment);
    }};

    const handleChangeQty = (num: number) => {
      const stock = 20;
      setQuantity((prevQ) => prevQ+num);
      if (quantity == 0) {
        alert("더 내릴 수 없습니다.");
        setQuantity(1);
      } else if (quantity >= stock) {
        alert("최대 수량입니다.");
        setQuantity(stock-1);
      }
    }

  return (
    <Flex align="center">
      <Container p="32px 32px 80px">
        <Flex>
          <Image
            boxSize="500px"
            src={data?.detail.imageURL} 
          />
          <Box>
            <Text fontSize={25} pt="17px">{data?.detail.name}</Text>
            <Text fontSize={25} pt="17px">{data?.detail.price.sellingPrice}원</Text>
            <Box
                fontSize={17}
                p="30px 12px"
                mt="50px"
                fontWeight="bold"
              >
                카톡 친구가 아니어도 선물 코드로 선물할 수 있어요!
            </Box>
          </Box>
        <Container>
          <Box>
            <Text fontSize={20}>{data?.detail.name}</Text>
            <Button onClick={()=>handleChangeQty(-1)}>-</Button>
            <Input variant="outline" value={quantity} readOnly />
            <Button onClick={()=>handleChangeQty(1)}>+</Button>
          </Box>
          <Box>
            <Text fontSize={20}>총 결제 금액</Text>
            <Text fontSize={20}>{`${totalPrice}*원`}</Text>
            <Button onClick={handleGiftMe}>나에게 선물하기</Button>
            </Box>
          </Container>
        </Flex>
      </Container>
    </Flex>
  )
}