import { Flex } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductContext } from '@/pages/Products/index';
import { AuthContext } from '@/provider/Auth/index';

import ItemCount from './section2/ItemCount';
import Price from './section2/Price';

export default function Section2({ productId }: { productId: string | undefined }) {
  const navigate = useNavigate();

  const [totalCount, setTotalCount] = useState(1);
  const data = useContext(ProductContext);
  const auth = useContext(AuthContext);
  const price = data?.price.basicPrice ? data.price.basicPrice : 0;
  const totalPrices = price * totalCount;

  const order = {
    id: data?.id,
    count: totalCount,
  };

  const onClickPayment = () => {
    if (!auth) {
      if (confirm('로그인이 필요합니다.')) navigate(`/login?redirect=products/${productId}`);
      else return;
    }
    sessionStorage.setItem('orderHistory', JSON.stringify(order));
  };

  return (
    <Flex p="30px 12px 30px 30px" h="100%" flexDirection="column" justifyContent="space-between">
      <ItemCount name={data?.name} setTotalCount={setTotalCount} />
      <Price totalPrices={totalPrices} onClickPayment={onClickPayment} />
    </Flex>
  );
}
