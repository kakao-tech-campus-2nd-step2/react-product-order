import { Button, Checkbox, Flex, Input, Select, Text } from '@chakra-ui/react';
import { useContext } from 'react';

import { OrderContext } from '@/pages/Order';

export default function Section2() {
  const orderData = useContext(OrderContext);
  const [data, count = 0, paymentInfo, setPaymentInfo, onClickPayment] = [
    orderData?.options,
    orderData?.count,
    orderData?.paymentInfo,
    orderData?.setPaymentInfo,
    orderData?.onClickPayment,
  ];
  const price = data?.productPrice ?? 0;
  const totalPrice = price * count;

  const handleReceipt = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (paymentInfo && setPaymentInfo)
      setPaymentInfo({
        message: paymentInfo?.message,
        receipt: e.target.checked,
        receiptNumber: paymentInfo?.receiptNumber,
      });
  };

  const inputReceiptNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (paymentInfo && setPaymentInfo)
      setPaymentInfo({
        message: paymentInfo?.message,
        receipt: paymentInfo?.receipt,
        receiptNumber: Number(e.target.value),
      });
  };

  return (
    <Flex flexDirection="column" width="100%" h="100%" p="16px" maxW="360px">
      <Text p="24px 0px 20px" fontSize="18px" lineHeight="21px" fontWeight="700">
        결제 정보
      </Text>
      <Flex flexDirection="column" p="16px" width="100%" borderTop="1px solid #E2E8F0">
        <Checkbox
          isChecked={paymentInfo?.receipt}
          mb="16px"
          fontSize="15px"
          lineHeight="24px"
          fontWeight="700"
          onChange={handleReceipt}
        >
          현금영수증 신청
        </Checkbox>
        <Select mb="8px">
          <option value="개인소득공제">개인소득공제</option>
          <option value="사업자증빙용">사업자증빙용</option>
        </Select>
        <Input
          onChange={inputReceiptNumber}
          maxLength={11}
          readOnly={!paymentInfo?.receipt}
          placeholder="(-없이) 숫자만 입력해주세요."
        />
      </Flex>
      <Flex
        justify="space-between"
        p="16px"
        alignItems="center"
        borderTop="1px solid #E2E8F0"
        borderBottom="1px solid #E2E8F0"
      >
        <Text fontSize="15px" lineHeight="24px" fontWeight="700">
          최종 결제금액
        </Text>
        <Text fontSize="18px" lineHeight="21px" fontWeight="700">
          {totalPrice}원
        </Text>
      </Flex>
      <Button
        h="60px"
        fontSize="16px"
        cursor="pointer"
        transition="background-color 200ms ease 0s;"
        bg="rgb(254,229,0)"
        borderRadius="4px"
        justifyContent="center"
        display="flex"
        alignItems="center"
        mt="32px"
        fontWeight="400"
        _hover={{ bg: 'rgb(250, 218, 10)' }}
        onClick={onClickPayment}
      >
        {totalPrice}원 결제하기
      </Button>
    </Flex>
  );
}
