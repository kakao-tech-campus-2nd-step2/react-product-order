import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

type Props = {
  name: string;
  price: number;
  description: string;
  id: number;
};

const ProductDetails = ({ name, price, description, id }: Props) => {
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate(`/order/${id}`);
  };

  return (
    <DetailsWrapper>
      <Title>{name}</Title>
      <Price>{price.toLocaleString()}원</Price>
      <Description>{description}</Description>
      <Button onClick={handleOrder}>나에게 선물하기</Button>
    </DetailsWrapper>
  );
};
const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 20px;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 40px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

export default ProductDetails;
