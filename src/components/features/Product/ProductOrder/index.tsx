import React from 'react';
import styled from '@emotion/styled';
import { ROUTE_PATH } from '@routes/path';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/auth/useAuth';
import { Button } from '@components/common';
import QuantitySelector from './QuantitySelector';

export default function ProductOrder() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleOrderClick = () => {
    const targetPath = isAuthenticated ? ROUTE_PATH.ORDER : ROUTE_PATH.LOGIN;
    navigate(targetPath);
  };

  return (
    <ProductOrderContainer>
      <QuantitySelector />
      <div>
        <TotalAmount>
          <dl>
            <dt>총 결제 금액</dt>
            <dd>145000원</dd>
          </dl>
        </TotalAmount>
        <Button theme="darkGray" onClick={handleOrderClick}>
          나에게 선물하기
        </Button>
      </div>
    </ProductOrderContainer>
  );
}

const ProductOrderContainer = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 360px;
`;

const TotalAmount = styled.div`
  padding: 18px 20px;
  border-radius: 4px;
  background-color: rgb(245, 245, 245);
  margin-bottom: 20px;

  dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
  }

  dt {
    font-size: 14px;
  }

  dd {
    font-size: 20px;
  }
`;
