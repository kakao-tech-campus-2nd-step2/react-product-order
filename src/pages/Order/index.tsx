import { Box, Button, Checkbox, Flex, Image, Input, Select,Text, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Navigate,useLocation } from "react-router-dom";

export const OrderPage = () => {
  const location = useLocation();
  const { productDetail, productQuantity } = location.state || {};
  const [cashReceipt, setCashReceipt] = useState(false);
  const [cashReceiptType, setCashReceiptType] = useState("PERSONAL");
  const [cashReceiptNumber, setCashReceiptNumber] = useState("");
  const [message, setMessage] = useState("");

  if (!productDetail || !productQuantity) {
    return <Navigate to="/" />;
  }

  const totalPrice = productDetail.price.sellingPrice * productQuantity;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 100) {
      alert("선물 메시지는 100자 이내로 입력해주세요.");
      return;
    }
    setMessage(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (message.trim() === "") {
      alert("선물 메시지를 입력해주세요.");
      return;
    }

    if (cashReceipt && cashReceiptNumber.trim() === "") {
      alert("현금영수증 번호를 입력해주세요.");
      return;
    }

    alert("주문이 완료되었습니다.");
  };

  return (
    <Box p={8}>
      <form onSubmit={handleSubmit}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>나에게 주는 선물</Text>
        <Flex direction="column" gap={4}>
          <Box flex="1" p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">선물 메시지</Text>
            <Textarea
              value={message}
              onChange={handleMessageChange}
              placeholder="선물과 함께 보낼 메시지를 적어보세요"
              size="lg"
            />
          </Box>

          <Box flex="1" p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">선물 내역</Text>
            <Flex direction="row" align="center">
              <Image src={productDetail.imageURL} alt={productDetail.name} boxSize="100px" />
              <Box ml={4}>
                <Text>{productDetail.name}</Text>
                <Text>{productDetail.price.sellingPrice}원 x {productQuantity}개</Text>
              </Box>
            </Flex>
          </Box>

          <Box flex="1" p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold" mb={4}>결제 정보</Text>
            <VStack align="flex-start" spacing={4}>
              <Checkbox isChecked={cashReceipt} onChange={() => setCashReceipt(!cashReceipt)}>
                현금영수증 신청
              </Checkbox>
              {cashReceipt && (
                <>
                  <Text>현금영수증 타입</Text>
                  <Select value={cashReceiptType} onChange={(e) => setCashReceiptType(e.target.value)}>
                    <option value="PERSONAL">개인소득공제</option>
                    <option value="BUSINESS">사업자지출증빙</option>
                  </Select>
                  <Text>현금영수증 번호</Text>
                  <Input
                    type="text"
                    value={cashReceiptNumber}
                    onChange={(e) => setCashReceiptNumber(e.target.value)}
                    placeholder="(-없이) 숫자만 입력해주세요"
                  />
                </>
              )}
              <Text fontSize="lg" fontWeight="bold">최종 결제금액</Text>
              <Text fontSize="2xl" fontWeight="bold">{totalPrice}원</Text>
              <Button type="submit" colorScheme="yellow" size="lg">
                {totalPrice}원 결제하기
              </Button>
            </VStack>
          </Box>
        </Flex>
      </form>
    </Box>
  );
};