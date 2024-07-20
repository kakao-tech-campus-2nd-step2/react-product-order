import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useAuth } from '@/provider/Auth';
import type { GoodsData } from '@/types';

import ProductDetails from './ProductDetails';
import ProductImage from './ProductImage';
import QuantityControl from './QuantityControl';

type Props = {
  productDetail: GoodsData;
  productId: string;
};

const schema = z.object({
  quantity: z
    .number()
    .min(1, '최소 1개 이상 선택해야 합니다.')
    .max(100, '최대 100개까지 주문 가능합니다.'),
});

type FormData = z.infer<typeof schema>;

export const ProductDetailForm = ({ productDetail, productId }: Props) => {
  const navigate = useNavigate();
  const authInfo = useAuth();

  const { control, handleSubmit, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: 1,
    },
  });

  const quantity = watch('quantity');

  const onSubmit = (data: FormData) => {
    if (!authInfo) {
      const confirmLogin = window.confirm(
        '로그인이 필요한 메뉴입니다. 로그인 페이지로 이동하시겠습니까?',
      );
      if (confirmLogin) {
        navigate('/login');
      }
    } else {
      navigate(`/order/${productId}`, { state: { quantity: data.quantity } });
    }
  };

  const totalPrice = productDetail.price.sellingPrice * quantity;

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProductImage src={productDetail.imageURL} alt={productDetail.name} />
        <DetailsWrapper>
          <ProductDetails
            name={productDetail.name}
            price={productDetail.price.sellingPrice}
            description="카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!"
            id={productDetail.id}
          />
          <QuantityControlWrapper>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <QuantityControl
                  productName={productDetail.name}
                  quantity={field.value}
                  onQuantityChange={field.onChange}
                />
              )}
            />
          </QuantityControlWrapper>
          <OrderWrapper>
            <TotalPrice>총 결제 금액: {totalPrice.toLocaleString()}원</TotalPrice>
            <OrderButton type="submit">나에게 선물하기</OrderButton>
          </OrderWrapper>
        </DetailsWrapper>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-left: 300px;
  margin-top: 50px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 20px;
  flex: 1;
  height: 100%;
`;

const QuantityControlWrapper = styled.div`
  align-self: center;
  height: 100%;
`;

const OrderWrapper = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TotalPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 350px;
  margin-bottom: 20px;
`;

const OrderButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 15px 30px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
`;

export default ProductDetailForm;
