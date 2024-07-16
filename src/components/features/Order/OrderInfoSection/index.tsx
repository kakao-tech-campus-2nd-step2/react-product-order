import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

import { useCurrentProduct } from '@/api/hooks/useGetProduct';
import { RouterPath } from '@/routes/path';

type Props = {
  totalPrice: number;
};

export const OrderInfoSection = ({ productKey, count }: { productKey: string; count: number }) => {
  const { isRender, currentProduct } = useCurrentProduct(productKey);
  if (!isRender) return null;

  if (!currentProduct) {
    return <Navigate to={RouterPath.notFound} />;
  }
  const price = currentProduct.price.sellingPrice * count;

  const product: Props = {
    totalPrice: price,
  };
  return (
    <>
      <Container>
        <Text as="b">결제 정보</Text>
        <Divider />
        <Box>
          <Checkbox>현금영수증 신청</Checkbox>
          <Select>
            <option value="option1">개인소득공제</option>
            <option value="option2">사업자증빙용</option>
          </Select>
          <Textarea placeholder="(-없이) 숫자만 입력해주세요."></Textarea>
        </Box>
        <Divider />
        <Box>
          <Text as="b">최종 결제 금액</Text>
          <Text as="b">{product.totalPrice}원</Text>
        </Box>
        <Box>
          <Button colorScheme="yellow">{product.totalPrice}원 결제하기</Button>
        </Box>
        <Divider />
      </Container>
    </>
  );
};
