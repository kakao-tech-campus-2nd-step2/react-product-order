import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import type { goodsDetailData } from '@/types';

export default function GiftButton({ price, name, amount, brandName, imageURL }: goodsDetailData) {
  const authInfo = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!authInfo) {
      navigate(RouterPath.login);
    } else {
      navigate(RouterPath.paymentInfo, { state: { price, name, amount, brandName, imageURL } });
    }
  };

  return (
    <div>
      <Button
        color="#fff"
        fontSize="16px"
        bgColor="rgb(17, 17, 17)"
        borderRadius="4px"
        height="60px"
        width="318px"
        p="0"
        onClick={handleClick}
      >
        나에게 선물하기
      </Button>
    </div>
  );
}
