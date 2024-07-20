import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { IconButton, Input, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

interface PaymentInfoProps {
  label: string;
  price: number;
  giftOrderLimit: number;
}

const PaymentInfo = ({ label, price, giftOrderLimit }: PaymentInfoProps) => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const { productId: currentProductId } = useParams();

  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      count: 1,
    },
  });

  const watchCount = watch('count');

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleOrder = (productId: string, countValue: number) => {
    navigate(RouterPath.order, {
      state: {
        productId,
        count: countValue,
      },
    });
  };

  const handleGiftBtnClick = handleSubmit(({ count }) => {
    if (!authInfo) {
      const userConfirmed = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );
      if (userConfirmed) {
        handleLogin();
      }
    } else {
      handleOrder(currentProductId || '', count);
    }
  });

  return (
    <>
      <VStack maxW="320px" padding="10px" borderRadius="3" borderColor="gray.200" borderWidth="1px">
        <StyledLabel>{label}</StyledLabel>
        <NumberInputWrapper>
          <Controller
            name="count"
            control={control}
            rules={{ min: 1, max: giftOrderLimit }}
            render={({ field }) => (
              <>
                <IconButton
                  isDisabled={watchCount <= 1}
                  aria-label="Decrease value"
                  icon={<MinusIcon />}
                  onClick={() => field.onChange(Math.max(1, field.value - 1))}
                />
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    field.onChange(value);
                  }}
                  onBlur={() => {
                    const value = Number(field.value);
                    if (value > giftOrderLimit) {
                      field.onChange(giftOrderLimit);
                    }
                    if (value < 1) {
                      field.onChange(1);
                    }
                  }}
                />
                <IconButton
                  aria-label="Increase value"
                  icon={<AddIcon />}
                  onClick={() => field.onChange(Math.min(giftOrderLimit, field.value + 1))}
                  isDisabled={watchCount >= giftOrderLimit}
                />
              </>
            )}
          />
        </NumberInputWrapper>
      </VStack>
      <Wrapper>
        <TotalPrice>
          <div>총 결제 금액</div>
          <div>{price * watchCount}원</div>
        </TotalPrice>
      </Wrapper>
      <GiftForMeButton onClick={handleGiftBtnClick}>나에게 선물하기</GiftForMeButton>
    </>
  );
};

export default PaymentInfo;

const StyledLabel = styled.p`
  font-weight: 700;
  line-height: 22px;
  color: rgb(17, 17, 17);
  overflow-wrap: break-word;
  word-break: break-all;
`;

const NumberInputWrapper = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: row;
  border-width: 0px;
  border-style: solid;
  box-sizing: border-box;
  overflow-wrap: break-word;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TotalPrice = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 18px 20px;
  border-radius: 4px;
  background-color: rgb(245, 245, 245);
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: rgb(17, 17, 17);
`;

const GiftForMeButton = styled.div`
  width: 100%;
  border-radius: 4px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 200ms ease 0s;
  height: 60px;
  font-size: 16px;
  color: rgb(255, 255, 255);
  background-color: rgb(17, 17, 17);
`;
