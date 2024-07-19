import { Box, Container } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';

import useGetLimit from '@/api/hooks/useGetLimit';
import useGetProductsDetail from '@/api/hooks/useGetProductsDetail';
import { Spinner } from '@/components/common/Spinner';
import GoodsInfo from '@/components/features/GoodsDetail/GoodsInfo';
import SideBar from '@/components/features/GoodsDetail/SideBar/SideBar';
import { RouterPath } from '@/routes/path';
import type { ProductParams } from '@/types';

export const GoodsDetailPage = () => {
  const { id = '' } = useParams<ProductParams>();
  const { data, isLoading, isError } = useGetProductsDetail({ id });
  const limit = useGetLimit({id}) ?? 100;

  if (isLoading)
    return (
      <Box>
        <Spinner />
      </Box>
    );
  if (isError) return <Box>에러가 발생했습니다.</Box>;
  if (!data) return <Navigate to={RouterPath.home} />;

  return (
    <Container display="flex" flexDirection="row" justifyContent="center">
      <GoodsInfo price={data.price.sellingPrice} imageURL={data.imageURL} name={data.name} />
      <SideBar
        price={data.price.sellingPrice}
        name={data.name}
        brandName={data.brandInfo.name}
        imageURL={data.imageURL}
        limit={limit}
      />
    </Container>
  );
};
