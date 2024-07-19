import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';

import { QuantitySelector } from './QuerySelector';

export type ProductDetailContentProps = {
  imageUrl: string;
  name: string;
  price: number;
  onButtonClick: () => void;
};

export const ProductDetailContent: React.FC<ProductDetailContentProps> = ({
  imageUrl,
  name,
  price,
  onButtonClick,
}) => {
  const handleQuantityChange = (quantity: number) => {
    console.log('Quantity changed', quantity);
  };
  return (
    <Container>
      <ImageContainer>
        <Image src={imageUrl} alt={name} />
      </ImageContainer>
      <DetailsContainer>
        <Title>{name}</Title>
        <Price>{price}원</Price>
        <Description>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Description>
        <ButtonContainer>
          <QuantityContainer>
            <QuantitySelector onQuantityChange={handleQuantityChange} />
          </QuantityContainer>
          <Button colorScheme="teal" variant="outline" onClick={onButtonClick}>
            나에게 선물하기
          </Button>
        </ButtonContainer>
      </DetailsContainer>
    </Container>
  );
};

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

const QuantityContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;
