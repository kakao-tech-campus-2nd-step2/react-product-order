import { Box, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'src/components/common/layouts/Container';

import { fetchInstance } from '@/api/instance';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import type { GoodsDataDetail, GoodsDataOptions } from '@/types';

const fetchGoodsDetail = async (productId: string | undefined) => {
  if (!productId) return null;

  const response = await fetchInstance.get<GoodsDataDetail>(`/v1/products/${productId}/detail`);
  return response.data;
};

const fetchGoodsOption = async (productId: string | undefined) => {
  if (!productId) return null;

  const response = await fetchInstance.get<GoodsDataOptions>(`/v1/products/${productId}/options`);
  return response.data;
};

export const GoodsDetail = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();

  const { productId } = useParams();
  const { data: productData } = useQuery({
    queryKey: ['GoodsDetail', productId],
    queryFn: () => fetchGoodsDetail(productId),
    enabled: !!productId,
  });

  const { data: optionData } = useQuery({
    queryKey: ['GoodsOption', productId],
    queryFn: () => fetchGoodsOption(productId),
    enabled: !!productId,
  });

  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(productData?.detail.price.basicPrice);
  const orderLimit = optionData?.options.giftOrderLimit ?? 0;

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = Number(e.target.value);
    if (isNaN(newCount) || newCount < 0) return;
    if (count <= orderLimit) {
      setCount(newCount);
    } else {
      alert(`최대 가능 주문 수량은 ${orderLimit}입니다.`);
    }
  };

  const handlePlusButton = () => {
    if (count >= orderLimit) {
      alert(`최대 가능 주문 수량은 ${orderLimit}입니다.`);
      return;
    }
    setCount(count + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authInfo) {
      if (window.confirm('로그인이 필요한 메뉴입니다. 로그인 페이지로 이동하시겠습니까?')) {
        navigate(getDynamicPath.login());
      }
    } else {
      navigate(`${RouterPath.order}`, {
        state: {
          productData,
          count,
          price,
        },
      });
    }
  };

  useEffect(() => {
    if (productData?.detail.price.basicPrice && count) {
      setPrice(productData?.detail.price.basicPrice * count);
    }
    if (count === 0) {
      setPrice(0);
    }
  }, [count, productData?.detail.price.basicPrice]);

  return (
    <Container maxWidth="1280px" flexDirection="row" justifyContent="center">
      <LeftContainer width="100%" maxW="900px" height="562px">
        <ArticleWrapper>
          <Image src={productData?.detail.imageURL} width="450px" height="450px"></Image>
          <Box
            maxWidth="385px"
            height="450px"
            paddingLeft="24px"
            display="flex"
            flexDirection="column"
          >
            <Text paddingTop="24px" fontSize="24px" fontWeight={400}>
              {productData?.detail.name}
            </Text>
            <Text paddingTop="16px" fontSize="30px" height="120px">
              {productData?.detail.price.basicPrice}
            </Text>
            <TextBox maxWidth="360px" height="70px" display="flex" alignContent="center">
              카톡 친구가 아니어도 선물 코드로 선물할 수 있어요!
            </TextBox>
          </Box>
        </ArticleWrapper>
      </LeftContainer>
      <RightContainer>
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <FormBox
            width="100%"
            maxW="318px"
            height="120px"
            padding="12px 14px 16px"
            flexDirection="column"
          >
            <Text fontWeight="700px">{productData?.detail.name}</Text>
            <ContorllNumberBox>
              <ControllButton
                disabled={count === 1}
                style={{ opacity: count === 1 ? 0.5 : 1 }}
                onClick={() => setCount(count - 1)}
              >
                -
              </ControllButton>
              <ControllInput value={count} onChange={handleCountChange} />
              <ControllButton
                style={{ opacity: count === orderLimit ? 0.5 : 1 }}
                onClick={handlePlusButton}
              >
                +
              </ControllButton>
            </ContorllNumberBox>
          </FormBox>
          <SubmitBox width="100%" height="142px">
            <PriceBox>
              <Text>총 결제 금액</Text>
              <Text fontWeight="700">{price}</Text>
            </PriceBox>
            <GiveButton onClick={handleSubmit}>나에게 선물하기</GiveButton>
          </SubmitBox>
        </Box>
      </RightContainer>
    </Container>
  );
};

const LeftContainer = styled(Box)`
  padding: 32px 32px 80px;
`;

const RightContainer = styled(Box)`
  padding: 30px 12px 30px 30px;
  width: 100%;
  max-width: 360px;
  height: 856px;
`;

const ArticleWrapper = styled.div`
  width: 100%;
  max-width: 836px;
  height: 450px;
  display: flex;
`;

const TextBox = styled(Box)`
  border-top: 1px solid rgb(245, 245, 245);
  border-bottom: 1px solid rgb(245, 245, 245);
  padding: 24px 12px;
  font-size: 14px;
  font-weight: 700;
`;

const FormBox = styled(Box)`
  border: 1px solid rgb(237, 237, 237);
  border-radius: 2px;
`;

const SubmitBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 142px;
`;

const ContorllNumberBox = styled.div`
  width: 100%;
  max-width: 288px;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ControllButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: transparent solid 2px;
  background-color: #edf2f7;
  border-radius: 10px;
`;

const ControllInput = styled.input`
  height: 40px;
  width: 100%;
  max-width: 192px;
  outline: transparent solid 2px;
  appearance: none;
  border: 1px solid #edf2f7;
  border-radius: 5px;
  padding: 10px;
  font-weight: 700;
`;

const PriceBox = styled.div`
  width: 100%;
  max-width: 318px;
  height: 50px;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: rgb(17, 17, 17);
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
  margin-top: 15px;
`;

const GiveButton = styled.button`
  width: 100%;
  max-width: 318px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  background-color: rgb(17, 17, 17);
  color: rgb(245, 245, 245);
  transition: background-color 200ms ease 0s;
  cursor: pointer;
  border-radius: 5px;
`;
