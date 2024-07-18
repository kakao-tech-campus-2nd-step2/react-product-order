import { Button, Divider, Flex, Image, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useGetProductsDetail } from '@/api';
import Loading from '@/components/common/Loading';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

export const ProductsPage = () => {
  const { productsId = '' } = useParams<{ productsId: string }>();
  const { data: productsDetail, isError, isLoading } = useGetProductsDetail({ productsId });
  const [count, setCount] = useState<number>(1);
  const currentAuthToken = authSessionStorage.get();
  const navigate = useNavigate();
  const location = useLocation();

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
    setCount((prevCount) => prevCount + addCount);
  };

  const handleInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const regExp = /^[0-9\b]+$/;
    if (regExp.test(e.key)) {
      const nowCount = parseInt(e.currentTarget.value + e.key);
      if (nowCount < 1) setCount(1);
      else setCount(nowCount);
    } else if (e.key === 'Backspace') {
      const nowCount = parseInt(e.currentTarget.value.slice(0, -1)) || 1;
      if (nowCount < 1) setCount(1);
      else setCount(nowCount);
    }
  };

  return (
    <Flex h="calc(100vh - 54px)" w="100%" justify="center" py="10">
      <Loading isLoading={isLoading} error={isError} errorRedirect="/">
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
                  value={count}
                  onKeyDown={handleInputKey}
                  type="number"
                  min="1"
                  mx="3"
                  w="100%"
                  h="36px"
                  textAlign="center"
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
                onClick={handleOrderClick}
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
