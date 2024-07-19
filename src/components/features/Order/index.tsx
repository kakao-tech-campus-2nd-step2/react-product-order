import { Box, Button, Checkbox, Grid, GridItem, HStack, Image,Input, Select, Text, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const Order = () => {
  const location = useLocation();
  const [check, setCheck] = useState(false);

  const numberRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
  };

  const handleFinish = () => {
    const number = numberRef.current?.value;
    const message = messageRef.current?.value;

    // 현금 영수증 신청을 한 경우 (체크 박스 활성화 상태)
    if (check) {
      if (number && message) {
        if (Number.isNaN(Number(number))) {
          alert('현금 영수증 전화번호는 숫자만 입력 가능합니다!');
        } else {
          alert('주문이 완료되었습니다.');
        }
      } else if (!message) {
        alert('선물과 함께 보낼 카드 메시지를 작성해 주세요!');
      } else if (!number) {
        alert('현금 영수증에 필요한 전화번호를 입력해주세요!');
      } 
    } 
    
    // 현금 영수증 신청을 하지 않은 경우 (체크 박스 비활성화 상태)
    else {
      if (message) {
        alert('주문이 완료되었습니다.');
      } else if (!message) {
        alert('선물과 함께 보낼 카드 메시지를 작성해 주세요!');
      }
    }
  };

  return (
    <Wrapper>
      <Grid
        templateColumns={{ base: '1fr', md: '2fr 1fr' }}
        gap={6}
        maxWidth={1200}
        mx="auto"
        p={4}
      >
        <GridItem>
          <VStack align="start" spacing={10}>
            <Box>
              <Text fontSize="2xl" fontWeight="bold">나에게 주는 선물</Text>
              <Input
                backgroundColor="gray.100"
                placeholder="선물과 함께 보낼 메시지를 적어보세요"
                ref={messageRef}
                mt={4}
                size="lg"
                width="300px"
              />
            </Box>
            <Box w="100%">
              <Text fontSize="xl" fontWeight="bold">선물 내역</Text>
              <GiftDetailBox>
                <Image src={location.state.data.imageURL} alt={location.state.data.name} width="150px" height="150px" />
                <Box>
                  <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                    {location.state.data.brandInfo.name}
                  </Text>
                  <Text fontSize="md" fontWeight="medium" color="gray.500">
                    {location.state.data.name} x {location.state.itemCount}개
                  </Text>
                </Box>
              </GiftDetailBox>
            </Box>
          </VStack>
        </GridItem>

        <GridItem>
          <PaymentBox>
            <Text fontSize="xl" fontWeight="bold">결제 정보</Text>
            <VStack spacing={4} align="start" mt={4}>
              <Checkbox onChange={handleCheck}>현금영수증 신청</Checkbox>
              {check && (
                <>
                  <Select placeholder="현금 영수증 종류를 선택하세요">
                    <option value="personal">개인 소득 공제</option>
                    <option value="business">사업자 증빙용</option>
                  </Select>
                  <Input
                    placeholder="(-없이) 숫자만 입력해주세요."
                    ref={numberRef}
                  />
                </>
              )}
              <Box w="100%">
                <HStack justify="space-between">
                  <Text fontSize="lg">최종 결제 금액</Text>
                  <Text fontSize="2xl" fontWeight="bold">{location.state.totalPrice} 원</Text>
                </HStack>
              </Box>
              <Button onClick={handleFinish} size="sm" width="90%" mt={10}>
                {location.state.totalPrice} 원 결제하기
              </Button>
            </VStack>
          </PaymentBox>
        </GridItem>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #f9f9f9;
`;

const GiftDetailBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid lightgray;
  border-radius: 8px;
  margin-top: 8px;
`;

const PaymentBox = styled(Box)`
  padding: 24px;
  border: 1px solid lightgray;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default Order;
