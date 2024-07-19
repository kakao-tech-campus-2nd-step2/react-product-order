import { Box, Button, Center, Flex, HStack, Image, Input, Text, VStack } from "@chakra-ui/react";
import { Controller,useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import { useGetProductOptions } from "@/api/hooks/useGetProductOption";
import { useAuth } from '@/provider/Auth';

import { useGetProductDetail } from "../../api/hooks/useGetProductDetail";

type FormValues = {
  productQuantity: string;
};

export const ProductDetailPage = () => {
  const { productDetail, loading, notFound } = useGetProductDetail();
  const { productOption, loading: optionsLoading } = useGetProductOptions();
  const navigate = useNavigate();
  const authInfo = useAuth();

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      productQuantity: "1"
    }
  });

  const productQuantity = watch("productQuantity");

  const onSubmit = (data: FormValues) => {
    if (!authInfo) {
      navigate(`/login?redirect=${window.location.pathname}`);
      return;
    }

    if (!productOption) {
      alert("상품 옵션 정보를 로드하는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (Number(data.productQuantity) > productOption.options.giftOrderLimit) {
      alert(`최대 주문 가능 수량은 ${productOption.options.giftOrderLimit}개 입니다.`);
      setValue("productQuantity", productOption.options.giftOrderLimit.toString());
      return;
    }

    if (productDetail) {
      navigate("/order", {
        state: {
          productDetail,
          productQuantity: Number(productQuantity),
        },
      });
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberValue = Number(value);

    if (value === "" || numberValue >= 0) {
      if (productOption && numberValue > productOption.options.giftOrderLimit) {
        alert(`최대 주문 가능 수량은 ${productOption.options.giftOrderLimit}개 입니다.`);
        setValue("productQuantity", productOption.options.giftOrderLimit.toString());
      } else {
        setValue("productQuantity", value);
      }
    }
  };

  if (notFound) {
    return <Navigate to="/" />;
  }

  if (loading || optionsLoading) {
    return <Center>Loading...</Center>;
  }

  if (!productDetail) {
    return <Center>Error loading product details</Center>;
  }

  const totalPrice = productDetail.price.sellingPrice * (Number(productQuantity) || 0);

  return (
    <Box p={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction={{ base: "column", md: "row" }}>
          <Box flex="1" mb={{ base: 4, md: 0 }}>
            <Image src={productDetail.imageURL} alt={productDetail.name} boxSize="400px" />
          </Box>
          <Box flex="1" ml={{ md: 8 }}>
            <VStack align="flex-start" spacing={4}>
              <Text fontSize="lg" fontWeight="bold">{productDetail.name}</Text>
              <Text fontSize="xl" color="gray.500">{productDetail.price.sellingPrice}원</Text>
              <Text>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Text>
              <HStack>
                <Button
                  type="button"
                  onClick={() => setValue("productQuantity", Math.max(Number(productQuantity) - 1, 1).toString())}
                  disabled={Number(productQuantity) <= 1}
                > - </Button>
                <Controller
                  name="productQuantity"
                  control={control}
                  rules={{ required: true, min: 1 }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      width="200px"
                      textAlign="center"
                      value={productQuantity}
                      onChange={handleQuantityChange}
                      type="number"
                      min="1"
                    />
                  )}
                />
                <Button
                  type="button"
                  onClick={() => setValue("productQuantity", Math.min(Number(productQuantity) + 1, productOption?.options.giftOrderLimit || Infinity).toString())}
                  disabled={Number(productQuantity) >= (productOption?.options.giftOrderLimit || Infinity)}
                > + </Button>
              </HStack>
              <Text fontSize="lg" fontWeight="bold">총 결제 금액</Text>
              <Text fontSize="2xl" fontWeight="bold">{totalPrice}원</Text>
              <Button type="submit" colorScheme="blackAlpha">나에게 선물하기</Button>
            </VStack>
          </Box>
        </Flex>
      </form>
    </Box>
  );
};
