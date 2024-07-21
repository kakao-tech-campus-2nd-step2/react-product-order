import { Button, Divider, Flex, Image, Input, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useGetProductsDetail, useGetProductsOption } from '@/api';
import Loading from '@/components/common/Loading';
import { RouterPath } from '@/routes/path';
import type { RegisterOption } from '@/utils/form';
import { useCreateRegister } from '@/utils/form';
import { clip } from '@/utils/numberControl/numberControl';
import { authSessionStorage } from '@/utils/storage';

type Inputs = {
  count: number;
};

const defaultInputs: Inputs = {
  count: 1,
};

export const ProductsPage = () => {
  const { productsId = '' } = useParams<{ productsId: string }>();
  const { data: productsDetail, isError, isLoading } = useGetProductsDetail({ productsId });
  const {
    data: productsOptions,
    isError: isOptionsError,
    isLoading: isOptionsLoading,
  } = useGetProductsOption({ productsId });
  const currentAuthToken = authSessionStorage.get();
  const navigate = useNavigate();
  const location = useLocation();

  const maxCount = productsOptions?.options.giftOrderLimit;
  const inputOptions: RegisterOption<Inputs>[] = [
    {
      name: 'count' as const,
      option: {
        valueAsNumber: true,
        min: {
          value: 1,
          message: '1개 이상 선택해주세요.',
        },
        max: maxCount && {
          value: maxCount,
          message: `${maxCount}개 이하로 선택해주세요.`,
        },
      },
    },
  ];

  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>({
    defaultValues: defaultInputs,
  });
  const getRegister = useCreateRegister<Inputs>({
    register: register,
    options: inputOptions,
  });

  const setCount = (value: number) => {
    setValue(
      'count',
      clip(value, {
        min: 1,
        max: maxCount,
      }),
    );
  };

  const changeCount = (addCount: number) => {
    setCount(getValues('count') + addCount);
  };

  const handleReceiptNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d+$/.test(value)) {
      e.target.value = getValues('count').toString();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) setValue('count', 1);
    else setCount(value);
  };

  const handleOrderClick = () => {
    if (!currentAuthToken) {
      if (window.confirm('로그인이 필요합니다. 로그인페이지로 이동하시겠습니까?')) {
        navigate(RouterPath.login + `?redirect=${location.pathname}`);
      }
    } else if (productsDetail?.detail) {
      navigate(RouterPath.order, { state: { ...productsDetail.detail, count: count } });
    }
  };

  const changeCount = (addCount: number) => {
    if (count + addCount < 1) return;
    if (productsOptions && count + addCount > productsOptions.options.giftOrderLimit) return;
    setCount((prevCount) => prevCount + addCount);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const numberButNonNumber = ['e', 'E', '+', '-'];
    if (numberButNonNumber.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value < 1 || isNaN(value)) setCount(1);
    else if (productsOptions && value > productsOptions.options.giftOrderLimit)
      setCount(productsOptions.options.giftOrderLimit);
    else setCount(value);
  };

  return (
    <Flex h="calc(100vh - 54px)" w="100%" justify="center" py="10">
      <Loading
        isLoading={isLoading || isOptionsLoading}
        error={isError || isOptionsError}
        errorRedirect="/"
      >
        <Flex w="100%" maxW="1280px">
          <Flex w="100%" maxW="920px" align="start">
            <Image w="45%" aspectRatio="1/1" src={productsDetail?.detail.imageURL} />
            <Flex w="50%" aspectRatio="1/1" flexDir="column" px="5" py="10">
              <Text fontSize="2xl" fontWeight="500">
                {productsDetail?.detail.name}
              </Text>
              <Text fontSize="3xl" my="10">
                {`${productsDetail?.detail.price.basicPrice}원`}
              </Text>
              <Flex w="100%" flexDir="column" rowGap="5">
                <Divider />
                <Text mx="5" fontWeight="800" fontSize="sm">
                  카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
                </Text>
                <Divider />
              </Flex>
            </Flex>
          </Flex>
          <Flex w="360px" h="100%" flexDir="column" justify="space-between">
            <Flex w="100%" p="5" border="2px" borderColor="#eeeeee" flexDir="column">
              <Text fontWeight="800">{productsDetail?.detail.name}</Text>
              <Flex w="100%" justify="space-between" mt="2">
                <Button onClick={() => changeCount(-1)} w="36px" h="36px" boxSizing="border-box">
                  -
                </Button>
                <Input
                  value={count.toString()}
                  onKeyDown={handleInputKeyDown}
                  onChange={handleInputChange}
                  type="number"
                  {...getRegister('count')}
                  mx="3"
                  w="100%"
                  h="36px"
                  textAlign="center"
                  onInput={handleReceiptNumberInput}
                  onChange={handleInputChange}
                />
                <Button onClick={() => changeCount(1)} w="36px" h="36px" boxSizing="border-box">
                  +
                </Button>
              </Flex>
            </Flex>
            <Flex w="100%" flexDir="column" gap="3">
              <Flex w="100%" px="5" py="2" justify="space-between" align="center" bg="#eeeeee">
                <Text fontSize="sm" fontWeight="800">
                  총 결제 금액
                </Text>
                <Text
                  fontSize="lg"
                  fontWeight="800"
                >{`${productsDetail?.detail.price.basicPrice}원`}</Text>
              </Flex>
              <Button
                onClick={handleSubmit(handleOrderClick)}
                h="50px"
                bg="black"
                color="white"
                _hover={{ bg: 'black', opacity: '0.8' }}
              >
                나에게 선물하기
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Loading>
    </Flex>
  );
};
