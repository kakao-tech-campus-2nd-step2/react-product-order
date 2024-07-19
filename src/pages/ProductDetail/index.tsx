import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { Spinner } from '@/components/common/Spinner';
import { useAuth } from '@/provider/Auth';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data, isLoading, isError } = useGetProductDetail(productId || '');
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  useEffect(() => {
    if (!isLoading && !data) {
      navigate('/');
    }
  }, [productId, data, isLoading, navigate]);

  const handleGiftButtonClick = () => {
    if (!isAuthenticated) {
      alert('로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?');
      navigate('/login');
    }
  };

  if (isLoading)
    return (
      <LoadingContainer>
        <Spinner size={48} />
      </LoadingContainer>
    );
  if (isError) return <TextView>상품을 불러오는 도중에 에러가 발생했습니다.</TextView>;
  if (!data) return <TextView>상품이 없습니다.</TextView>;

  const product = data.detail;
  const imageUrl = product.imageURL;
  const sellingPrice = product.price?.sellingPrice;

  return (
    <Container>
      <ImageContainer>
        <Image src={imageUrl} alt={product.name} />
      </ImageContainer>
      <DetailsContainer>
        <Title>{product.name}</Title>
        <Price>{sellingPrice}원</Price>
        <Description>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Description>
        <ButtonContainer>
          <Button colorScheme="teal" variant="outline" onClick={handleGiftButtonClick}>
            나에게 선물하기
          </Button>
        </ButtonContainer>
      </DetailsContainer>
    </Container>
  );
};

export default ProductDetail;

const Container = styled.div`
  display: flex;
  padding: 20px;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 80%;
  height: auto;
  border-radius: 8px;
`;

const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 20px;
  padding-top: 20px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
`;

const Price = styled.p`
  margin-top: 10px;
  font-size: 24px;
  color: red;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  margin-top: 20px;
  font-size: 16px;
  color: #555;
`;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
