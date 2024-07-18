import { Box, Checkbox, Divider, Input, Select, VStack } from '@chakra-ui/react';

export const OrderRequestCashReceipt = () => {
  return (
    <Box width="100%" padding="16px">
      <VStack spacing="16px" align="start">
        <Checkbox colorScheme="yellow" size="lg">
          현금영수증 신청
        </Checkbox>

        <Divider />

        <Select placeholder="현금영수증 타입을 선택해주세요">
          <option value="PERSONAL">개인소득공제</option>
          <option value="BUSINESS">사업자증빙용</option>
        </Select>

        <Divider />

        <Input placeholder="(-없이) 숫자만 입력해주세요." />
      </VStack>
    </Box>
  );
};
