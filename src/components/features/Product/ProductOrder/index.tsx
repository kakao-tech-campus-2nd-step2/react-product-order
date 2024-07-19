import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Button } from '@components/common';
import QuantitySelector from './QuantitySelector';

export default function ProductOrder() {
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
        <Link to="/order">
          <Button theme="darkGray">나에게 선물하기</Button>
        </Link>
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
