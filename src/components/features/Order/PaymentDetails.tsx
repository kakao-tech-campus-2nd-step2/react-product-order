import { Checkbox, HStack, Input, Select, Spacer, Text, VStack } from '@chakra-ui/react';

import { CTAButton } from '@/components/common/Button/CTAButton';

interface PaymentDetailsProps {
  totalPrice: number;
  isReceiptChecked: boolean;
  setIsReceiptChecked: (value: boolean) => void;
  receiptNumber: string;
  setReceiptNumber: (value: string) => void;
  handleClick: () => void;
}

export const PaymentDetails = ({
  totalPrice,
  isReceiptChecked,
  setIsReceiptChecked,
  receiptNumber,
  setReceiptNumber,
  handleClick,
}: PaymentDetailsProps) => (
  <VStack w="326px" h="100%" borderLeft="1px" borderColor="gray.200" p="16px">
    <Text fontSize="18px" fontWeight="bold" pb="30px">
      결제 정보
    </Text>

    <VStack w="100%" borderY="1px" borderColor="gray.200">
      <Checkbox
        w="100%"
        pt="12px"
        alignItems="center"
        isChecked={isReceiptChecked}
        onChange={(e) => setIsReceiptChecked(e.target.checked)}
      >
        현금영수증 신청
      </Checkbox>
      <Select w="100%" placeholder="개인소득공제">
        <option value="individual">사업자증빙용</option>
      </Select>
      <Input
        w="100%"
        type="text"
        placeholder="(-없이) 숫자만 입력해주세요."
        value={receiptNumber}
        onChange={(e) => setReceiptNumber(e.target.value)}
      />
    </VStack>

    <HStack w="100%" borderY="1px" borderColor="gray.200">
      <Text p="16px" fontSize="15px" fontWeight="bold">
        최종 결제금액
      </Text>
      <Spacer />
      <Text fontSize="18px" fontWeight="bold">
        {totalPrice} 원
      </Text>
    </HStack>

    <CTAButton
      onClick={handleClick}
      text={`${totalPrice}원 결제하기`}
      textColor="black"
      background="yellow"
    />
  </VStack>
);
