import { Button, Icon, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import type { ProductsDetailResponseData } from '@/api/hooks/useGetProductDetails';
import { Aside } from '@/components/common/layouts/Split';

import {
  AsideContainer,
  GiftButton,
  Modals,
  OptionBox,
  OptionContainer,
  ProductCost,
} from './component';

type Props = {
  product: ProductsDetailResponseData;
};

export const ProductAsideSection = ({ product }: Props) => {
  const navigate = useNavigate();

  const moveToOrderPage = () => {
    navigate('/order', { state: { product: { product } } });
  };

  return (
    <Aside>
      <AsideContainer>
        <OptionContainer>
          <p className="product-title">{product.detail.name}</p>
          <OptionBox>
            <Button
              type="button"
              aria-label="수량 1개 감소"
              role="button"
              tabIndex={-1}
              aria-disabled="true"
            >
              <Icon viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <g fill="currentColor">
                  <rect height={4} width={20} x={2} y={10} />
                </g>
              </Icon>
            </Button>
            <Input
              inputMode="decimal"
              type="text"
              pattern="[0-9]*(.[0-9]+)?"
              role="spinbutton"
              aria-valuemin={1}
              aria-valuemax={100}
              aria-valuenow={1}
              aria-valuetext="1"
              autoComplete="off"
              autoCorrect="off"
              value={1}
            />
            <Button
              type="button"
              aria-label="수량 1개 추가"
              role="button"
              tabIndex={-1}
              aria-disabled="true"
            >
              <Icon viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z"
                />
              </Icon>
            </Button>
          </OptionBox>
        </OptionContainer>
        <Modals>
          <ProductCost>
            총 결제 금액
            <span>{product.detail.price.sellingPrice}</span>
          </ProductCost>
          <GiftButton onClick={moveToOrderPage}>나에게 선물하기</GiftButton>
        </Modals>
      </AsideContainer>
    </Aside>
  );
};
