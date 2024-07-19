import { Box, Button, FormControl, Input, Stack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
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
  const { register, setValue, getValues } = useForm({ defaultValues: { count: DEFAULT_COUNT } });
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

  const totalPrice = basicPrice * getValues('count');

  const handleOrder = () => {
    if (!authInfo) {
      const isOkToLogin = confirm('로그인이 필요합니다. 로그인 하시겠습니까?');
      if (!isOkToLogin) return;

      navigate(getDynamicPath.login());
      return;
    }
    orderLocalStorage.set({ productId, count: getValues('count') });
    navigate('/order');
  };

  return (
    <FormControl>
      <Stack direction="column" justifyContent="space-between">
        <Box border="1px solid" height="fit-content">
          <Text fontWeight="bold">{name}</Text>
          <Stack direction="row">
            <Button width={10} onClick={() => setValue('count', +getValues('count') + 1)}>
              +
            </Button>
            <Input
              type="number"
              {...register('count', { required: true, max: giftOrderLimit, min: 1 })}
              onChange={(e) => setValue('count', +e.target.value)}
            />
            <Button onClick={() => setValue('count', +getValues('count') - 1)}>-</Button>
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
    </FormControl>
  );
};

export default ProductCountSection;
