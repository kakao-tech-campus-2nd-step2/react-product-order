import { Box, Button, Input, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOption } from '@/api/hooks/useGetProductOption';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath } from '@/routes/path';
import { orderLocalStorage } from '@/utils/storage';

const DEFAULT_COUNT = 1;

interface ProductCountSectionProps {
  productId: string;
}
const ProductCountSection = ({ productId }: ProductCountSectionProps) => {
  const {
    data: detailData,
    isPending: isDetailPending,
    isError: inDetailError,
  } = useGetProductDetail(productId);
  const {
    data: optionData,
    isPending: isOptionPending,
    isError: isOptionError,
  } = useGetProductOption(productId);

  const [count, setCount] = useState(DEFAULT_COUNT);
  const authInfo = useAuth();
  const navigate = useNavigate();

  if (isDetailPending || isOptionPending) {
    return <div>loading...</div>;
  }

  if (inDetailError || isOptionError) {
    navigate('/');
    return <div>error...</div>;
  }

  const {
    name,
    price: { basicPrice },
  } = detailData.detail;

  const { giftOrderLimit } = optionData.options;

  const totalPrice = basicPrice * count;

  const handleOrder = () => {
    if (!authInfo) {
      const isOkToLogin = confirm('로그인이 필요합니다. 로그인 하시겠습니까?');
      if (!isOkToLogin) return;

      navigate(getDynamicPath.login());
      return;
    }
    orderLocalStorage.set({ productId, count });
    navigate('/order');
  };

  const handleCountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value > giftOrderLimit) {
      alert('선물 주문 가능 수량을 초과하였습니다.');
      setCount(giftOrderLimit);
      return;
    }
    if (value < 1) {
      setCount(1);
      return;
    }
    setCount(value);
  };
  const handleCountButtonClick = (value: number) => {
    const newCount = count + value;
    if (newCount > giftOrderLimit) {
      alert('선물 주문 가능 수량을 초과하였습니다.');
      setCount(giftOrderLimit);
      return;
    }

    if (newCount < 1) {
      setCount(1);
      return;
    }

    setCount(newCount);
  };

  return (
    <Stack direction="column" justifyContent="space-between">
      <Box border="1px solid" height="fit-content">
        <Text fontWeight="bold">{name}</Text>
        <Stack direction="row">
          <Button width={10} onClick={() => handleCountButtonClick(1)}>
            +
          </Button>
          <Input type="number" value={count} onChange={handleCountInputChange} />
          <Button onClick={() => handleCountButtonClick(-1)}>-</Button>
        </Stack>
      </Box>

      <Stack>
        <Text width="100%" padding="1rem" backgroundColor="whitesmoke">
          총 가격: {totalPrice}
        </Text>
        <Button flex="grow" onClick={handleOrder}>
          선물하기
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProductCountSection;
