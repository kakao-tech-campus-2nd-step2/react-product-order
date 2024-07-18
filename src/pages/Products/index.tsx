import { Button, Divider, Flex, Image, Input, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductsDetail } from '@/api';
import Loading from '@/components/common/Loading';

export const ProductsPage = () => {
  const { productsId = '' } = useParams<{ productsId: string }>();
  const { data: productsDetail, isError, isLoading } = useGetProductsDetail({ productsId });
  const navigate = useNavigate();

  const handleOrderClick = () => {
    if (productsDetail?.detail) {
      navigate('/order', { state: { ...productsDetail.detail } });
    }
  };

  return (
    <Flex h="calc(100vh - 54px)" w="100%" justify="center" py="10">
      <Loading isLoading={isLoading} error={isError} errorRedirect="/">
        <Flex w="100%" maxW="1280px">
          <Flex w="100%" maxW="980px" align="start">
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
          <Flex w="300px" h="100%" flexDir="column" justify="space-between">
            <Flex w="100%" p="5" border="2px" borderColor="#eeeeee" flexDir="column">
              <Text fontWeight="800">{productsDetail?.detail.name}</Text>
              <Flex w="100%" justify="space-between" mt="2">
                <Button w="36px" h="36px" boxSizing="border-box">
                  -
                </Button>
                <Input type="number" mx="3" w="100%" h="36px" textAlign="center" />
                <Button w="36px" h="36px" boxSizing="border-box">
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
