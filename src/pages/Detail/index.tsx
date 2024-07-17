import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetDetail } from '@/api/hooks/useGetProductDetail';
import { Image } from '@/components/common/Image';
import { Container } from '@/components/common/layouts/Container';
import { Spinner } from '@/components/common/Spinner';
import { ProductDescript } from '@/components/features/Detail/ProductDescript';
import { QuantitySetting } from '@/components/features/Detail/QuantitySetting';
import { TotalPrice } from '@/components/features/Detail/TotalPrice';
import { useBuyInfo } from '@/provider/BuyInfo';
import { breakpoints } from '@/styles/variants';

export const DetailPage = () => {
  const { setQuantity } = useBuyInfo();
  useEffect(() => {
    setQuantity(1);
  }, [setQuantity]);
  const params = useParams();

  const { data, error, isLoading } = useGetDetail(params.productKey!);

  if (isLoading)
    return (
      <View>
        <Spinner />
      </View>
    );

  if (error) return <div>에러입니다.</div>;

  if (!data) return <></>;
  return (
    <Container
      flexDirection="row"
      maxWidth={breakpoints.lg}
      justifyContent="center"
      style={{ marginTop: 30 }}
    >
      <Image src={data.imageURL} width={450} />
      <ProductDescript name={data.name} price={data.price.sellingPrice} />
      <Wrapper>
        <QuantitySetting name={data.name} />
        <TotalPrice />
      </Wrapper>
    </Container>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;
  margin-bottom: 20px;
`;
const View = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 80vh;
  margin-top: 30px;
`;
