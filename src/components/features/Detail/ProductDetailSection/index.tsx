import { Box, Button, Image, Input, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath } from '@/routes/path';
import { orderLocalStorage } from '@/utils/storage';

const DEFAULT_COUNT = 1;

interface ProductDetailSectionProps {
  productId: string;
}
const ProductDetailSection = ({ productId }: ProductDetailSectionProps) => {
  const { data, isLoading, isError } = useGetProductDetail(productId);
  const [count, setCount] = useState(DEFAULT_COUNT);
  const authInfo = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError || !data) {
    navigate('/');
    return <div>error...</div>;
  }
  const {
    imageURL,
    name,
    price: { basicPrice },
  } = data.detail;

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

  return (
    <Stack direction="row">
      {data && (
        <>
          <Box width={'50%'}>
            <Image src={imageURL} alt={name} />
          </Box>
          <Box>
            <div>{name}</div>
            <div>{basicPrice}</div>
          </Box>

          <Stack direction="column" justifyContent="space-between">
            <Box border="1px solid" height="fit-content">
              <Text fontWeight="bold">{name}</Text>
              <Stack direction="row">
                <Button width={10} onClick={() => setCount((prev) => prev + 1)}>
                  +
                </Button>
                <Input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                />
                <Button
                  onClick={() => {
                    if (count > 1) {
                      setCount((prev) => prev - 1);
                    }
                  }}
                >
                  -
                </Button>
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
        </>
      )}
    </Stack>
  );
};

export default ProductDetailSection;
