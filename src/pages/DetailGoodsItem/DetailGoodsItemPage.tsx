import { Box, Flex, HStack, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useAuthRedirectHandler } from '@/api/hooks/useAuthRedirectHandler';
import { useGetDetailProduct } from '@/api/hooks/useGetDetailProduct';
import { useQuantity } from '@/api/hooks/useQuantity';
import { CTAButton } from '@/components/common/Button/CTAButton';
import { Stepper } from '@/components/common/Stepper/stepper';
import { ProductDetailSection } from '@/components/features/ProductDetail/ProductDetailSection';
import { TotalPrice } from '@/components/features/ProductDetail/TotalPrice';
import { getDynamicPath } from '@/routes/path';

type FormData = {
  quantity: number;
};

export const DetailGoodsItemPage = () => {
  const { productId = '0' } = useParams<{ productId: string }>();
  const { data, isLoading, isError } = useGetDetailProduct({ productId });
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const detail = data?.detail;
  const { quantity, handleIncrement, handleDecrement } = useQuantity({ watch, setValue });

  const totalPrice = quantity * (detail?.price.sellingPrice || 0);

  const authRedirect = useAuthRedirectHandler();

  const onSubmit = (formData: FormData) => {
    authRedirect({
      nextPageUrl: getDynamicPath.order(detail?.id.toString() || '0'),
      state: {
        imageURL: detail?.imageURL,
        name: detail?.name,
        totalPrice,
        brandName: detail?.brandInfo.name,
        quantity: formData.quantity,
      },
    });
  };

  if (isError) return <div>Error occurred</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Flex minHeight="100vh" alignItems="top" justifyContent="center" padding="4">
      {data && (
        <HStack align="start">
          <Image src={detail?.imageURL} alt="img" boxSize="450px" />

          <ProductDetailSection name={detail?.name} sellingPrice={detail?.price.sellingPrice} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <Box width="318px" border="1px" borderColor="gray.200">
                <VStack py="12px" px="8px">
                  <Text fontWeight="bold">{detail?.name}</Text>

                  <Stepper
                    value={quantity}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                  />
                  <input type="hidden" {...register('quantity')} />
                </VStack>
              </Box>

              <TotalPrice totalPrice={totalPrice} />

              <Spacer />
              <CTAButton
                text="나에게 선물하기"
                textColor="white"
                background="black"
                type="submit"
              />
            </VStack>
          </form>
        </HStack>
      )}
    </Flex>
  );
};
