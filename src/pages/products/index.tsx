import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

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

const schema = z.object({
  quantity: z.number().min(1, '1개 이상 선택해야합니다.'),
});

type FormValues = z.infer<typeof schema>;

export const ProductPage: React.FC = () => {
  const { productKey = '' } = useParams<{ productKey: string }>();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [options, setOptions] = useState<ProductOptions | null>(null);
  const authInfo = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: 1,
    },
  });

  const currentQuantity = watch('quantity');

  useEffect(() => {
    const loadProduct = async () => {
      const productData = await fetchProductDetail(productKey);
      setProduct(productData);

      const optionsData = await fetchProductOptions(productKey);
      setOptions(optionsData);
    };

    loadProduct();
  }, [productKey]);

  const handleGiftToMyself: SubmitHandler<FormValues> = ({ quantity }) => {
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
    if (currentQuantity < options.giftOrderLimit) {
      setValue('quantity', currentQuantity + 1, { shouldValidate: true });
    }
  };

  const handleDecreaseQuantity = () => {
    if (currentQuantity > 1) {
      setValue('quantity', currentQuantity - 1, { shouldValidate: true });
    }
  };

  const totalPrice = product.price.sellingPrice * currentQuantity;

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
          <form onSubmit={handleSubmit(handleGiftToMyself)}>
            <FormSection>
              <Label>{product.name}</Label>
              <QuantityControl>
                <Button
                  type="button"
                  onClick={handleDecreaseQuantity}
                  disabled={currentQuantity <= 1}
                >
                  -
                </Button>
                <QuantityInput
                  type="text"
                  value={currentQuantity}
                  readOnly
                  {...register('quantity', {
                    validate: {
                      min: (value) => value >= 1 || '1개 이상 선택해야합니다.',
                      max: (value) =>
                        value <= options.giftOrderLimit ||
                        `수량은 ${options.giftOrderLimit}를 초과할 수 없습니다.`,
                    },
                  })}
                />
                <Button
                  type="button"
                  onClick={handleIncreaseQuantity}
                  disabled={currentQuantity >= options.giftOrderLimit}
                >
                  +
                </Button>
              </QuantityControl>
              {errors.quantity && <ErrorText>{errors.quantity.message}</ErrorText>}
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
  background-color: #000;
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

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
`;
