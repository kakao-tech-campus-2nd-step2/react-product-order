import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  IconButton,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RouterPath } from '../../routes/path';
import { authSessionStorage } from '@/utils/storage';
import { useGetProductOption } from '@/api/hooks/useGetProductOption';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';

export const DetailPage = () => {
  const { productId } = useParams();
  const { data: productDetail } = useGetProductDetail(productId ?? '');
  const { data: productOption, isLoading: isOptionLoading } = useGetProductOption(productId ?? '');
  const [isLoading, setIsLoading] = useState(true);
  const [productCount, setProductCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await axios.get(
          `https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/${productId}/detail`,
        );
        if (!res.data.detail) {
          navigate(RouterPath.notFound);
          return;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductDetail();
  }, [productId, navigate]);

  useEffect(() => {
    setIsLoading(isOptionLoading);
  }, [isOptionLoading]);

  const handleProductCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductCount(parseInt(e.target.value));
  };

  const handleSubmit = () => {
    const authToken = authSessionStorage.get();

    if (!authToken) {
      navigate(RouterPath.login);
      return;
    }

    if (productId) {
      const totalPrice = productDetail!.price.basicPrice * productCount;
      navigate(`/order/${productId}`, {
        state: totalPrice,
      });
    } else {
      console.error('ProductId를 찾을 수 없습니다.');
    }
  };

  if (isLoading || !productDetail || !productOption) {
    return <Box>Loading...</Box>;
  }

  const { name, imageURL, price } = productDetail;
  const basicPrice = price?.basicPrice ?? 0;
  const totalPrice = basicPrice * productCount;
  const priceString = `${basicPrice.toLocaleString()}원`;
  const giftOrderLimit = useMemo(
    () => productOption?.giftOrderLimit || 0,
    [productOption?.giftOrderLimit],
  );

  return (
    <Flex justify="space-between" align="center" direction="row" p={8}>
      <Box>
        <Image src={imageURL} alt={name} />
      </Box>
      <Box mx={8} display="flex" flexDirection="column">
        <Text size="2xl" mb={4}>
          {name}
        </Text>
        <Text fontSize="xl">{priceString}</Text>
        <Divider my={4} borderColor="gray.300" />
        <Text fontSize="md" fontWeight="bold" my={2}>
          카톡 친구가 아니어도 선물 코드로 선물할 수 있어요!
        </Text>
        <Divider my={4} borderColor="gray.300" />
      </Box>
      <Flex direction="column" align="flex-end">
        <Flex
          mb={4}
          direction="column"
          justifyContent="center"
          border="1px"
          borderColor="gray.200"
          p={4}
        >
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            {name}
          </Text>
          <ButtonGroup size="sm" isAttached variant="outline" mb={4}>
            <IconButton
              aria-label="-"
              icon={<MinusIcon />}
              onClick={() => {
                if (productCount > 0) {
                  setProductCount(productCount - 1);
                }
              }}
              disabled={productCount <= 1}
            />
            <Input
              type="number"
              value={productCount}
              onChange={handleProductCountChange}
              w={60}
              ml={4}
              mr={4}
            />
            <IconButton
              aria-label="+"
              icon={<AddIcon />}
              onClick={() => {
                if (productCount < giftOrderLimit) {
                  setProductCount(productCount + 1);
                } else {
                  alert(`최대 주문 가능 수량은 ${giftOrderLimit}개 입니다.`);
                }
              }}
            />
          </ButtonGroup>
        </Flex>
        <Flex w="full" p={4} bg="gray.100" justify="space-between">
          <Text>총 결제 금액</Text>
          <Text fontWeight="bold">{totalPrice.toLocaleString()}원</Text>
        </Flex>
        <Flex w="full" p={4} justify="space-between">
          <Button backgroundColor="black" color="white" onClick={handleSubmit}>
            나에게 선물하기
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
