import { Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductContext } from '@/pages/Products/index';
import { AuthContext } from '@/provider/Auth/index';

import ItemCount from './section2/ItemCount';
import Price from './section2/Price';

export default function Section2() {
  const navigate = useNavigate();

  const ProductData = useContext(ProductContext);
  const [data, productId, totalCount = 1, setTotalCount] = [
    ProductData?.data,
    ProductData?.productId,
    ProductData?.totalCount,
    ProductData?.setTotalCount,
  ];
  const auth = useContext(AuthContext);
  const price = data?.detail.price.basicPrice ?? 0;
  const totalPrices = price * totalCount;

  const onClickPayment = () => {
    if (!auth) {
      if (confirm('로그인이 필요합니다.')) navigate(`/login?redirect=products/${productId}`);
      else return;
    } else navigate('/order');
  };

  return (
    <Flex p="30px 12px 30px 30px" h="100%" flexDirection="column" justifyContent="space-between">
      <ItemCount name={data?.detail.name} setTotalCount={setTotalCount} />
      <Price totalPrices={totalPrices} onClickPayment={onClickPayment} />
    </Flex>
  );
}
