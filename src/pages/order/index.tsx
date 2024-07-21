import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Product {
  imageURL: string;
  name: string;
  brand: string;
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
}

export const OrderPage: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product as Product;
  const [message, setMessage] = useState('');

  if (!product) {
    return <div>상품 정보가 없습니다.</div>;
  }

  const handlePayment = () => {
    if (!message.trim()) {
      alert('메세지를 입력해주세요');
    } else {
      alert('주문이 완료되었습니다.');
      // 추가적인 주문 완료 로직을 여기에 추가할 수 있습니다.
    }
  };

  return (
    <Container>
      <GiftSection>
        <SectionTitle>나에게 주는 선물</SectionTitle>
        <MessageBox
          placeholder="선물과 함께 보낼 메시지를 적어보세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <GiftInfo>
          <ImageContainer>
            <Image src={product.imageURL} alt={product.name} />
          </ImageContainer>
          <ProductInfo>
            <ProductBrand>{product.brand}</ProductBrand>
            <ProductName>{product.name}</ProductName>
          </ProductInfo>
        </GiftInfo>
      </GiftSection>
      <PaymentSection>
        <SectionTitle>결제 정보</SectionTitle>
        <CheckboxWrapper>
          <Checkbox type="checkbox" id="receipt" />
          <Label htmlFor="receipt">현금영수증 신청</Label>
        </CheckboxWrapper>
        <Select>
          <option value="incomeTax">개인소득공제</option>
          <option value="business">사업자 증빙</option>
        </Select>
        <Input type="text" placeholder="숫자만 입력해주세요." />
        <TotalPriceWrapper>
          <TotalLabel>최종 결제금액</TotalLabel>
          <TotalPrice>{product.price.sellingPrice}원</TotalPrice>
        </TotalPriceWrapper>
        <PayButton onClick={handlePayment}>{product.price.sellingPrice}원 결제하기</PayButton>
      </PaymentSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const GiftSection = styled.div`
  width: 60%;
`;

const PaymentSection = styled.div`
  width: 35%;
  border-left: 1px solid #ddd;
  padding-left: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const MessageBox = styled.textarea`
  width: 100%;
  height: 100px;
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  background-color: #f7f7f7;
`;

const GiftInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  margin-left: 20px;
`;

const ProductBrand = styled.div`
  font-size: 18px;
  color: #555;
`;

const ProductName = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Label = styled.label`
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f7f7f7;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f7f7f7;
`;

const TotalPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 20px;
  font-weight: bold;
`;

const TotalLabel = styled.div``;

const TotalPrice = styled.div``;

const PayButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: yellow;
  color: black;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
`;
