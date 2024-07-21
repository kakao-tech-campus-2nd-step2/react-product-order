import { Box, Checkbox, Flex, Image, Input, Select, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/layouts/Container';

interface FormData {
  message: string;
  cashReceiptNumber?: string;
  cashReceipt: boolean;
  receiptType: string;
}

export const Order = () => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const isCashReceiptChecked = watch('cashReceipt');

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!data.message.trim().length) {
      alert('메세지를 입력해주세요.');
      return;
    }
    if (data.message.length > 100) {
      alert('100자 이하로 입력하세요.');
      return;
    }
    if (data.cashReceipt && !data.cashReceiptNumber?.trim().length) {
      alert('현금 영수증 번호를 입력해주세요.');
      return;
    }

    alert('선물 보내기 성공');
  };

  return (
    <Container maxWidth="1280px" flexDirection="row" justifyContent="center">
      <Left>
        <TopSection>
          <TopTitle>나에게 주는 선물</TopTitle>
          <MessageInputWrapper>
            <MessageInput
              type="text"
              {...register('message', { required: true, maxLength: 100 })}
              placeholder="선물과 함께 보낼 메시지를 적어주세요"
            />
            {errors.message && <span>메시지를 입력해주세요 (100자 이하)</span>}
          </MessageInputWrapper>
        </TopSection>
        <MiddleLine />
        <BottomSection>
          <GiftHistoryTitle>선물내역</GiftHistoryTitle>
          <GiftHistorySection>
            <Image
              src={location.state.productData.detail.imageURL}
              alt="이미지"
              width="86px"
              height="86px"
            />
            <GiftHistoryDescription>
              <Text color="rgb(136,136,136)" fontSize="13px" fontWeight="400">
                {location.state.productData.detail.brandInfo.name}
              </Text>
              <Text color="rgb(34,34,34)" fontSize="14px" overflow="hidden">
                {location.state.productData.detail.name}
              </Text>
            </GiftHistoryDescription>
          </GiftHistorySection>
        </BottomSection>
      </Left>
      <Right>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column">
            <Box w="full" borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
              <Flex direction="column" align="flex-start" mb={4}>
                <Text fontWeight="bold" mb={20}>
                  결제 정보
                </Text>
                <Flex align="center" mb={10}>
                  <Checkbox colorScheme="yellow" {...register('cashReceipt')}>
                    현금영수증 신청
                  </Checkbox>
                </Flex>
                <Selectgroup mb={2} {...register('receiptType')}>
                  <option value="personal" defaultChecked>
                    개인소득공제
                  </option>
                  <option value="business">사업자 지출증빙</option>
                </Selectgroup>
                {isCashReceiptChecked && (
                  <InputCustom
                    placeholder="(-없이) 숫자만 입력해주세요."
                    {...register('cashReceiptNumber')}
                  />
                )}
                <Flex
                  justify="space-between"
                  w="100%"
                  p={15}
                  borderRadius="md"
                  mb={4}
                  borderBottom="1px solid rgb(237,237,237)"
                  borderTop="1px solid rgb(237,237,237)"
                >
                  <Text>최종 결제금액</Text>
                  <Text fontWeight="bold">{location.state.price}원</Text>
                </Flex>
                <Button type="submit">{location.state.price}원 결제하기</Button>
              </Flex>
            </Box>
          </Flex>
        </form>
      </Right>
    </Container>
  );
};

const Left = styled.div`
  width: 100%;
  max-width: 900px;
  height: 885px;
  border-right: 1px solid #e2e8f0;
  border-left: 1px solid #e2e8f0;
`;

const TopSection = styled.section`
  width: 100%;
  max-width: 900px;
  height: 253px;
  padding: 44px 0px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TopTitle = styled.div`
  font-size: 21px;
  margin-bottom: 10px;
`;

const MessageInputWrapper = styled.div`
  width: 100%;
  max-width: 840px;
  height: 156px;
  padding: 12px 30px 16px;
`;

const MessageInput = styled.input`
  width: 100%;
  height: 100px;
  border-color: #e2e8f0;
  border-radius: 0.375rem;
  background-color: #e2e8f0;
  outline: transparent solid 2px;
  outline-offset: 2px;
  appearance: none;
  padding: 16px 8px;
  padding-inline-start: 1rem;
  padding-inline-end: 1rem;
  font-size: 1rem;
  transition: 0.5s;
  &:hover {
    background-color: #cbd5e0;
  }
  &:placeholder {
    font-size: 1rem;
  }
  &:focus {
    border: 2px solid #38449e;
    background-color: #fff;
  }
`;

const MiddleLine = styled.div`
  width: 100%;
  max-width: 900px;
  height: 8px;
  background-color: rgb(237, 237, 237);
`;

const BottomSection = styled.section`
  width: 100%;
  max-width: 900px;
  height: 198px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`;

const GiftHistoryTitle = styled.span`
  font-size: 15px;
  line-height: 24px;
  font-weight: 700;
  color: #000;
`;

const GiftHistorySection = styled.div`
  width: 100%;
  max-width: 867px;
  display: flex;
  flex-direction: row;
  height: 126px;
  border: 1px solid rgb(237, 237, 237);
  box-shadow: rgb(0, 0, 0, 0.02) 0px 4px 8px;
  border-radius: 8px;
  padding: 20px 16px 16px;
`;

const GiftHistoryDescription = styled.div`
  width: 314px;
  height: 88px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Right = styled.div`
  width: 100%;
  max-width: 360px;
  height: 885px;
  border-right: 1px solid #e2e8f0;
  padding: 16px;
`;

const Selectgroup = styled(Select)`
  width: 100%;
  max-width: 294px;
  height: 40px;
  border-color: #e2e8f0;
  border-radius: 0.375rem;
  outline: none;
`;

const InputCustom = styled(Input)`
  width: 100%;
  max-width: 294px;
  height: 40px;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  outline: none;
  padding-left: 10px;
`;
