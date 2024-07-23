import styled from '@emotion/styled';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

interface OrderData {
  imageURL: string;
  name: string;
  brand: string;
  totalPrice: number;
  quantity: number;
}

interface FormValues {
  message: string;
  receiptNumber: string;
  receiptType: string;
  isReceiptChecked: boolean;
}

export const OrderPage: React.FC = () => {
  const location = useLocation();
  const orderData = location.state?.orderData as OrderData;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      message: '',
      receiptNumber: '',
      receiptType: 'incomeTax',
      isReceiptChecked: false,
    },
  });

  const isReceiptChecked = watch('isReceiptChecked');

  const onSubmit = (data: FormValues) => {
    if (isReceiptChecked && !data.receiptNumber) {
      alert('현금영수증 번호를 입력해주세요.');
      return;
    }
    if (isReceiptChecked && !/^\d+$/.test(data.receiptNumber)) {
      alert('현금영수증 번호는 숫자만 입력 가능합니다.');
      return;
    }
    alert('주문이 완료되었습니다.');
  };

  return (
    <Container>
      <GiftSection>
        <SectionTitle>나에게 주는 선물</SectionTitle>
        <Controller
          name="message"
          control={control}
          rules={{
            required: '메세지를 입력해주세요.',
            maxLength: {
              value: 100,
              message: '메세지는 100자 이내로 입력해주세요.',
            },
          }}
          render={({ field }) => (
            <>
              <MessageBox placeholder="선물과 함께 보낼 메시지를 적어보세요" {...field} />
              {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
            </>
          )}
        />
        <GiftTitle>선물 내역</GiftTitle>
        <GiftInfo>
          <ImageContainer>
            <Image src={orderData.imageURL} alt={orderData.name} />
          </ImageContainer>
          <ProductInfo>
            <ProductBrand>{orderData.brand}</ProductBrand>
            <ProductName>
              {orderData.name} X {orderData.quantity}
            </ProductName>
          </ProductInfo>
        </GiftInfo>
      </GiftSection>
      <PaymentSection>
        <SectionTitle>결제 정보</SectionTitle>
        <Controller
          name="isReceiptChecked"
          control={control}
          render={({ field: { value, onChange } }) => (
            <CheckboxWrapper>
              <Checkbox
                type="checkbox"
                id="receipt"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
              />
              <Label htmlFor="receipt">현금영수증 신청</Label>
            </CheckboxWrapper>
          )}
        />
        <Controller
          name="receiptType"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <option value="incomeTax">개인소득공제</option>
              <option value="business">사업자 증빙용</option>
            </Select>
          )}
        />
        <Controller
          name="receiptNumber"
          control={control}
          rules={{
            validate: {
              requiredIfChecked: (value) => {
                if (isReceiptChecked && !value.trim()) {
                  return '현금영수증 번호를 입력해주세요.';
                }
                if (value && !/^\d+$/.test(value)) {
                  return '현금영수증 번호는 숫자만 입력 가능합니다.';
                }
                return true;
              },
            },
          }}
          render={({ field }) => (
            <>
              <Input type="text" placeholder="(-없이)숫자만 입력해주세요." {...field} />
              {errors.receiptNumber && <ErrorMessage>{errors.receiptNumber.message}</ErrorMessage>}
            </>
          )}
        />

        <TotalPriceWrapper>
          <TotalLabel>최종 결제금액</TotalLabel>
          <TotalPrice>{orderData.totalPrice}원</TotalPrice>
        </TotalPriceWrapper>
        <PayButton onClick={handleSubmit(onSubmit)}>{orderData.totalPrice}원 결제하기</PayButton>
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

const GiftTitle = styled.h2`
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
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
  background-color: #fee500;
  color: black;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
`;
