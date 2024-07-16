import { useNavigate, useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '@constants/QueryKeys';
import { fetchProductDetail } from '@utils/query';
import { useEffect } from 'react';
import Paths from '@constants/Paths';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import Page from '@components/templates/Page';
import Container from '@components/atoms/container/Container';
import { MAX_CONTENT_WIDTH } from '@styles/size';

function ProductDetailsPage() {
  const { productId } = useParams<string>();
  const { data, status, error } = useSuspenseQuery({
    queryKey: [QueryKeys.PRODUCT_DETAILS, productId],
    queryFn: () => fetchProductDetail({ productId: productId as string }),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId
      || (error && axios.isAxiosError(error) && error.response?.status === StatusCodes.NOT_FOUND)) {
      navigate(Paths.MAIN_PAGE);
    }
  }, [error, navigate, productId]);

  return (
    <Page>
      <Container elementSize="full-width" justifyContent="center">
        <Container elementSize="full-width" maxWidth={MAX_CONTENT_WIDTH} />
      </Container>
    </Page>
  );
}

export default ProductDetailsPage;
