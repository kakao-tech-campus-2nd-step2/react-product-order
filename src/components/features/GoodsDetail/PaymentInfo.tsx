import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { IconButton, Input, useNumberInput, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

interface PaymentInfoProps {
  label: string;
}

const PaymentInfo = ({ label }: PaymentInfoProps) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  const navigate = useNavigate();
  const authInfo = useAuth();

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleOrder = () => {
    navigate(RouterPath.order);
  };

  const handleGiftBtnClick = () => {
    if (!authInfo) {
      const userConfirmed = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );
      if (userConfirmed) {
        handleLogin();
      }
    } else {
      handleOrder();
    }
  };

  return (
    <>
      <VStack maxW="320px" padding="10px" borderRadius="3" borderColor="gray.200" borderWidth="1px">
        <StyledLabel>{label}</StyledLabel>
        <NumberInputWrapper>
          <IconButton aria-label="Decrease value" {...dec} icon={<MinusIcon />} />
          <Input {...input} />
          <IconButton aria-label="Increase value" {...inc} icon={<AddIcon />} />
        </NumberInputWrapper>
      </VStack>
      <Wrapper>
        <TotalPrice>총 결제 금액</TotalPrice>
        <GiftForMeButton onClick={handleGiftBtnClick}>나에게 선물하기</GiftForMeButton>
      </Wrapper>
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
