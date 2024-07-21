import { Box, Button, Checkbox, Container, Flex, Image, Input, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { fetchInstance } from "@/api/instance";
import { Spinner } from "@/components/common/Spinner";
import type { DetailData } from "@/types";

export const PaymentPage = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const location = useLocation();
  const quantity = location.state?.quantity;
  console.log(location.state)
  console.log("", quantity) // 자꾸 undefined가 나와서 수정중입니다.
  const [data, setData] = useState<DetailData>();
  const [isLoading, setIsLoading] = useState(true);
  const [giftMessage, setGiftMessage] = useState('');
  const [receiptNum, setReceiptNum] = useState('');
  const [Checked, setChecked] = useState<boolean>(false); // Boolean 쓰니까 오류남...

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetchInstance.get(`/v1/products/${productId}/detail`);
        setData(response.data); 
        console.log("API Response", response.data);
      } catch (error) {
        alert("상품 없음")
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrder();
  }, [productId]);

  if (isLoading)
    {
      return(
        <Spinner />
      )
    };

    const handlePayment = () => {
      if (giftMessage == '') {
        alert("메시지를 입력하세요!");
      } else if (Checked) {
        if (receiptNum == '') {
          alert("현금영수증 번호를 입력하세요.")
        } else if (!/^\d+$/.test(receiptNum)) {
          alert("숫자를 입력하세요.")
        };
      } else if (giftMessage.length >= 100){
          alert("100글자 아래로 입력하세요.")
      } else {
        alert("Payment Approved!");
      };
    }

  return(
  <Flex flexDirection="row" justifyContent="center" height="90vh" width="100vw">
    <Flex flexDirection="column" width="50vw" position="relative">
      <Flex width="100%" justifyItems="center" alignItems="center" height="250px" flexDirection="column" padding="30px">
        <Box height="100px">
          <Text fontSize="20px" fontWeight="bold">나에게 주는 선물</Text>
        </Box>
        <Box width="100%" height="150px">
          <Input 
            minWidth="400px"
            maxWidth="700px"
            height="100px"
            fontSize="20px"
            borderRadius="10px"
            border="none"
            background="skyblue"
            placeholder="선물과 함께 보낼 메시지를 적어보세요"
            value = {giftMessage}
            onChange={(e)=> setGiftMessage(e.target.value)}
          />
        </Box>
      </Flex>
      <Container marginTop="15px">
        <Text fontSize="15px">선물내역</Text>
        <Flex flexDirection="row" gap="10px" marginTop="20px">
          <Image
            boxSize="100px" 
            src={data?.detail.imageURL}
            alt="상품 이미지"
          />
          <Flex flexDirection="column">
            <Text>{data?.detail.brandInfo.name}</Text>
            <Text>{`${data?.detail.name} X ${quantity}개`}</Text>
          </Flex>
        </Flex>
      </Container>
    </Flex>
    <Flex width="20vw">
      <Container>
        <Text fontWeight="bold">결제 정보</Text>
        <Flex flexDirection="row">
          <Checkbox
            type="checkbox" 
            width="20px" 
            height="20px" 
            cursor="pointer" 
            border="1px solid"
            borderRadius="5px"
            // isChecked={setChecked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <Text fontSize="20px">
            현금영수증 신청
          </Text>
        </Flex>
        <Select>
          <option>개인소득공제</option>
          <option>사업자증빙용</option>
        </Select>
        <Input onChange={(e)=> setReceiptNum(e.target.value)} placeholder="현금영수증 번호를 입력하세요." />
        <Box>
          <Text>최종 결제금액</Text>
          <Text>{`${data?.detail.price.sellingPrice}원`}</Text>
        </Box>
        <Box>
            <Button onClick={handlePayment}>{`${data?.detail.price.sellingPrice}원 결제하기`}</Button>
        </Box>
      </Container>
    </Flex>
  </Flex>

  )
}