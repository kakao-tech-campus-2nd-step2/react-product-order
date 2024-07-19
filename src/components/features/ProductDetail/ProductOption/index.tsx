import {
  Button,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useAuth } from '@/provider/Auth';
import { useNavigate } from 'react-router-dom';
import { getDynamicPath } from '@/routes/path';

import { useState, useEffect } from 'react';

type Props = {
  productId: string;
  productName: string;
  productPrice: number;
  maxProduct: number | undefined;
};

export const ProductOption = ({ productId, productName, productPrice, maxProduct }: Props) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [count, setCount] = useState<number>(1); // 물품 개수
  const [resultPrice, setResultPrice] = useState<number>(productPrice);

  const minusBtnClickedHandler = () => {
    setCount(count - 1);
  }

  const plusBtnClickedHandler = () => {
    setCount(count + 1);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setCount(value);
    }
  }

  useEffect(() => {
    setResultPrice(productPrice * count);
  }, [count, productPrice])

  const btnClickedHandler = () => {
    if (auth === undefined) {
      navigate(getDynamicPath.login());
    } else {
      const path = getDynamicPath.productOption(productId);
      navigate(`${path}?count=${count}&price=${resultPrice}`);
      // navigate(getDynamicPath.productOption(productId));
    }
  }


  return (
    <Wrapper>
      <InsideWrapper>
        <Option>
          <Title>
            {productName}
          </Title>
          <Qty>
            <Button
              onClick={minusBtnClickedHandler}
              isDisabled={count <= 1 ? true : false}
              style={{
                fontSize: '30px', padding: '0', fontWeight: '400'
              }}>−</Button>
            <NumberInput min={1} max={maxProduct} value={count}>
              <NumberInputField onChange={handleInputChange} />
            </NumberInput>
            <Button
              onClick={plusBtnClickedHandler}
              isDisabled={maxProduct ? (count >= maxProduct ? true : false) : false}
              style={{ fontSize: '30px', padding: '0', fontWeight: '400' }}>+</Button>
          </Qty>
        </Option>
        <Price>
          <AllPrice>
            총 결제 금액
            <Result>{resultPrice}원</Result>
          </AllPrice>
          <ForMeBtn onClick={btnClickedHandler}>나에게 선물하기</ForMeBtn>
        </Price>
      </InsideWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  display: block;
  position: sticky;
  top: 54px;
  width: 100%;
  max-width: 360px;
  height: calc(-54px + 100vh);
`
const InsideWrapper = styled.div`
  width: 100%;
  padding: 30px 12px 30px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
`

const Option = styled.div`
  width: 100%;
  padding: 12px 14px 16px;
  border: 1px solid rgb(237, 237, 237);
  border-radius: 2px;
`
const Title = styled.p`
  font-weight: 700;
  line-height: 22px;
  color: rgb(17, 17, 17);
  overflow-wrap: break-word;
  word-break: break-all;
`

const Qty = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 8px;
  gap: 8px;
`

const Price = styled.div`
  padding: 12px 0px 0px; 
`

const AllPrice = styled.div`
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
`

const Result = styled.span`
  font-size: 20px;
  letter-spacing: -0.02em;
`

const ForMeBtn = styled.button`
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
`