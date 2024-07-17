import { Center, Flex, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductDetails } from '@/api/hooks/useGetProductDetails';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ProductDetailSection } from '../../components/features/Product/ProductDetailSection';
import { ProductOrderSection } from '../../components/features/Product/ProductOrderSection';

export const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();

  
  const { data, isError, isLoading } = useGetProductDetails(productId!);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data && !isLoading && !isError) {
      navigate(RouterPath.home);
    }
  }, [data, isLoading, isError, navigate]);

  if (isLoading) {
    return (
      <Flex
        w='100%'
        justifyContent='center'
        alignItems='center'
        padding='40px 16px 60px'
      >
        <Spinner />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex
        w='100%'
        justifyContent='center'
        alignItems='center'
        padding='40px 16px 60px'
        fontSize='16px'
      >
        에러가 발생했습니다.
      </Flex>
    );
  }

  if(!data) {
    return null;
  }

  console.log('detail productId: ', productId);
  console.log('detail data id: ', data.id);

  return (
    <Center
      w='100%'
    >
      <Flex
        w='100%'
        maxW={breakpoints.lg}
        flexDirection='column'
      >
        <Flex
          w='100%'
          position='relative'
        >
          <ProductDetailSection {...data} />
          <ProductOrderSection {...data} />
        </Flex>
      </Flex>
    </Center>
  );
};