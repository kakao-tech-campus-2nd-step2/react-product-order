import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './styles';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { Text, Button, Input } from '@chakra-ui/react';

type Props = {
  title: string;
  amount: number;
  imageSrc: string;
  subtitle: string;
  limit: number;
};
const ProductBuySection = ({
  title,
  amount,
  imageSrc,
  subtitle,
  limit,
}: Props) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const authInfo = useAuth();

  const handleOrder = () => {
    if (!authInfo) {
      const confirmed = confirm(
        '로그인이 필요한 메뉴입니다. \n로그인 페이지로 이동하시겠습니까?'
      );
      if (confirmed) {
        navigate(RouterPath.login);
      }
      return;
    } else {
      navigate(RouterPath.orders, {
        state: { title, amount, imageSrc, subtitle, quantity },
      });
    }
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) =>
      prevQuantity < limit ? prevQuantity + 1 : limit
    );
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  return (
    <S.AsideBox>
      <S.AsideWrapper>
        <S.ProductNumberBox>
          <Text
            fontWeight='700'
            lineHeight='22px'
            color='rgb(17, 17, 17)'
            overflowWrap='break-word'
            wordBreak='break-all'
          >
            {title}
          </Text>
          <S.ItemNumberBox>
            <Button
              type='button'
              aria-label='수량 1개 감소'
              role='button'
              tabIndex={-1}
              aria-disabled={quantity <= 1}
              onClick={handleDecrease}
            >
              <Text fontSize='24px' fontWeight='700'>
                -
              </Text>
            </Button>
            <Input
              inputMode='decimal'
              type='text'
              pattern='[0-9]*(.[0-9]+)?'
              role='spinbutton'
              aria-valuemin={1}
              aria-valuemax={100}
              aria-valuenow={quantity}
              aria-valuetext={`${quantity}`}
              autoComplete='off'
              autoCorrect='off'
              value={quantity}
              readOnly
            />
            <Button
              type='button'
              aria-label='수량 1개 추가'
              role='button'
              tabIndex={-1}
              aria-disabled={quantity >= 100}
              onClick={handleIncrease}
            >
              <Text fontSize='20px' fontWeight='700'>
                +
              </Text>
            </Button>
          </S.ItemNumberBox>
        </S.ProductNumberBox>
        <S.ButtonBox>
          <S.TotalPriceBox>
            총 결제 금액 <S.PriceText>{amount * quantity}원</S.PriceText>
          </S.TotalPriceBox>
          <S.ButtonItem onClick={handleOrder}>나에게 선물하기</S.ButtonItem>
        </S.ButtonBox>
      </S.AsideWrapper>
    </S.AsideBox>
  );
};

export default ProductBuySection;
