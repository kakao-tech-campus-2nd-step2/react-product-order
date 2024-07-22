import styled from '@emotion/styled';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';

interface Product {
  imageURL: string;
  name: string;
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
  brandInfo: {
    name: string;
  };
}

interface ProductOptions {
  giftOrderLimit: number;
}

const fetchProductDetail = async (productId: string): Promise<Product | null> => {
  try {
    const response = await axios.get(
      `https://react-gift-mock-api-daeun0726.vercel.app/api/v1/products/${productId}/detail`,
    );
    return response.data.detail;
  } catch (error) {
    console.error('Failed to fetch product details', error);
    return null;
  }
};

const fetchProductOptions = async (productId: string): Promise<ProductOptions | null> => {
  try {
    const response = await axios.get(
      `https://react-gift-mock-api-daeun0726.vercel.app/api/v1/products/${productId}/options`,
    );
    return response.data.options;
  } catch (error) {
    console.error('Failed to fetch product options', error);
    return null;
  }
};

export const ProductPage: React.FC = () => {
  const { productKey = '' } = useParams<{ productKey: string }>();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [options, setOptions] = useState<ProductOptions | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const authInfo = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      const productData = await fetchProductDetail(productKey);
      setProduct(productData);

      const optionsData = await fetchProductOptions(productKey);
      setOptions(optionsData);
    };

    loadProduct();
  }, [productKey]);

  const handleGiftToMyself = () => {
    if (!authInfo) {
      if (window.confirm('로그인이 필요한 메뉴입니다. 로그인 페이지로 이동하시겠습니까?')) {
        navigate(`${RouterPath.login}?redirect=${window.location.pathname}`);
      }
    } else {
      const orderData = {
        imageURL: product?.imageURL,
        name: product?.name,
        quantity: quantity,
        totalPrice: product ? product.price.sellingPrice * quantity : 0,
        brand: product?.brandInfo.name,
      };
      navigate(RouterPath.order, { state: { orderData } });
    }
  };

  useEffect(() => {
    if (product === null) {
      navigate(RouterPath.home);
    }
  }, [product, navigate]);

  if (product === undefined || options === null) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return null;
  }

  const handleIncreaseQuantity = () => {
    if (quantity < options.giftOrderLimit) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = product.price.sellingPrice * quantity;

  return (
    <Container>
      <Content>
        <ImageContainer>
          <Image src={product.imageURL} alt={product.name} />
        </ImageContainer>
        <InfoContainer>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>{product.price.sellingPrice}원</ProductPrice>
          <div>카톡 친구가 아니어도 선물 코드로 선물할 수 있어요!</div>
          <form onSubmit={handleGiftToMyself}>
            <FormSection>
              <Label>{product.name}</Label>
              <QuantityControl>
                <Button type="button" onClick={handleDecreaseQuantity} disabled={quantity <= 1}>
                  -
                </Button>
                <QuantityInput type="text" value={quantity} readOnly />
                <Button
                  type="button"
                  onClick={handleIncreaseQuantity}
                  disabled={quantity >= options.giftOrderLimit}
                >
                  +
                </Button>
              </QuantityControl>
            </FormSection>
            <FormSection>
              <Label>총 결제 금액</Label>
              <TotalPrice>{totalPrice}원</TotalPrice>
            </FormSection>
            <Button type="submit">나에게 선물하기</Button>
          </form>
        </InfoContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Content = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
`;

const ImageContainer = styled.div``;

const Image = styled.img`
  width: 400px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductName = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  color: gray;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  font-size: 18px;
  margin-bottom: 8px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityInput = styled.input`
  width: 60px;
  text-align: center;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const TotalPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
