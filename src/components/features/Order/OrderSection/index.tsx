import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { Button } from '@/components/common/Button';

interface OrderSectionProps {
  count: number;
  productId: string;
}
const OrderSection = ({ count, productId }: OrderSectionProps) => {
  const [input, setInput] = useState('');
  const { data, isLoading, error } = useGetProductDetail(productId);

  if (isLoading || !data) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  const {
    imageURL,
    name,
    price: { basicPrice },
  } = data.detail;

  const totalPrice = basicPrice * count;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <Flex display={'flex'} width={'100%'} gap={'16px'}>
      <Box width={'100%'}>
        <Flex direction="column" gap="1rem">
          <FormControl>
            <FormLabel>나에게 주는 선물</FormLabel>
            <Input
              type="email"
              value={input}
              onChange={handleInputChange}
              placeholder="선물과 함께 보낼 메시지를 적어보세요"
            />
          </FormControl>
          <Box width={'100%'} bg="white">
            <Text borderBottom={'1px solid'}>선물 내역</Text>
            <HStack>
              <Image src={imageURL} alt={name} />
              <Box>
                <Text>상품명</Text>
                <Text>이름 </Text>
              </Box>
            </HStack>
          </Box>
        </Flex>
      </Box>

      <Box minW={'280px'}>
        <Text>주문자 정보</Text>
        <Checkbox defaultChecked={false}>현금영수증 신청</Checkbox>

        <Select placeholder="" defaultValue={0}>
          <option value="0">개인소득공재</option>
          <option value="1">사업자증빙용</option>
        </Select>
        <Input type="tel" placeholder="(-없이) 숫자만 입력해주세요." />

        <Flex justifyContent={'space-between'}>
          <Text>최종 결제 금액</Text>
          <Text>{totalPrice}원</Text>
        </Flex>

        <Button theme="kakao" type="submit">
          {totalPrice}원 결제하기
        </Button>
      </Box>
    </Flex>
  );
};

export default OrderSection;
