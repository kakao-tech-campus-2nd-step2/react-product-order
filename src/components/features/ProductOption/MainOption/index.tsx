import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useGetProductsDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductsOption } from '@/api/hooks/useGetProductOption';
import { Spinner } from '@/components/common/Spinner';
import { PaymentOption } from '../PaymentOption';

const formSchema = z.object({
  message: z.string().nonempty('메시지를 입력해주세요.').max(100, '메시지는 100자 이내로 입력해주세요.'),
  cashReceipt: z.boolean(),
  cashReceiptNumber: z.string().nullable().optional(),
}).refine((data) => {
  if (data.cashReceipt && !data.cashReceiptNumber) {
    return false;
  }
  return true;
}, {
  message: '현금영수증 번호를 입력해주세요.',
  path: ['cashReceiptNumber'],
});

type FormSchemaType = z.infer<typeof formSchema>;

type Props = {
  productId: string;
  productCount: string | null;
  allPrice: string | null;
};

export const MainOption = ({ productId, productCount, allPrice }: Props) => {
  const { data, isError, isLoading } = useGetProductsDetail({ productId });
  const { dataOption } = useGetProductsOption({ productId });

  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
      cashReceipt: false,
      cashReceiptNumber: null,
    }
  });

  const cashReceipt = watch('cashReceipt');

  const onSubmit: SubmitHandler<FormSchemaType> = () => {
    alert('Form Submitted!');
  };

  if (isLoading) return <TextView><Spinner /></TextView>;
  if (isError) return <TextView>에러가 발생했습니다.</TextView>;
  if (!data || !dataOption) return null;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <InsideWrapper>
          <MessageWrapper>
            <MessageTitle>
              <Title>나에게 주는 선물</Title>
            </MessageTitle>
            <MessageContent>
              <Content>
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      size='md'
                      placeholder='선물과 함께 보낼 메시지를 적어보세요'
                      {...field} />
                  )}
                />
              </Content>
              {errors.message && <p>{errors.message.message}</p>}
            </MessageContent>
          </MessageWrapper>
          <Border />
          <HistoryWrapper>
            <HistoryTitle>선물내역</HistoryTitle>
            <Space />
            <History>
              <HistoryBox>
                <HistoryImg><Image width={86} src={data.detail.imageURL} alt="img" /></HistoryImg>
                <HistoryContent>
                  <HistoryContentTitle>{data.detail.brandInfo.name}</HistoryContentTitle>
                  <HistoryContentDescription>
                    {dataOption.options.productName} X {productCount}개
                  </HistoryContentDescription>
                </HistoryContent>
              </HistoryBox>
            </History>
          </HistoryWrapper>
        </InsideWrapper>
      </Wrapper>
      <PaymentOption
        allPrice={allPrice}
        control={control}
        errors={errors}
        cashReceipt={cashReceipt}
      />
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
`

const Wrapper = styled.main`
  width: 100%;
  max-width: 900px;
`;

const InsideWrapper = styled.div`
  border-left: 1px solid rgb(229, 229, 229);
  height: calc(-54px + 100vh);
`

const MessageWrapper = styled.section`
  width: 100%;
  padding: 44px 0px 32px;
`

const HistoryWrapper = styled.section`
  width: 100%;
  padding: 16px;
`

const MessageTitle = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
`

const Title = styled.span`
  font-size: 18px;
  line-height: 21px;
  color: rgb(34, 34, 34);
  box-sizing: border-box;
  font-weight: 700;
`

const MessageContent = styled.div`
  width: 100%;
  padding: 14px 30px;
`

const Content = styled.div`
  width: 100%;
  padding: 12px 30px 16px;
`

const Border = styled.div`
  width: 100%;
  background-color: rgb(237, 237, 237);
  height: 8px;
`

const HistoryTitle = styled.span`
  font-size: 15px;
  line-height: 24px;
  font-weight: 700;
  color: rgb(0, 0, 0);
`

const Space = styled.div`
  width: 100%;
  background-color: inherit;
  height: 16px;
`

const History = styled.div`
  width: 100%;
  padding: 20px 16px 16px;
  border-radius: 8px;
  border: 1px solid rgb(237, 237, 237);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 4px 8px;
`

const HistoryBox = styled.div`
  display: flex;
`

const HistoryImg = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
`

const HistoryContent = styled.div`
  padding-left: 8px;
`

const Image = styled.img`
  object-fit: cover;
  object-position: center center;
  border-radius: 0px;
  aspect-ratio: 1 / 1;
`

const HistoryContentTitle = styled.p`
  font-size: 13px;
  line-height: 14px;
  color: rgb(136, 136, 136);
  font-weight: 400;
`

const HistoryContentDescription = styled.p`
  font-size: 14px;
  line-height: 18px;
  margin-top: 3px;
  color: rgb(34, 34, 34);
  overflow: hidden;
  font-weight: 400;
`

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;