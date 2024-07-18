import { Flex } from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useAuth } from '@/provider/Auth';

import OrderProductInfo from '../OrderProductInfo';
import OrderReseipSection from '../OrderReseipsection';

interface OrderSectionProps {
  count: number;
  productId: string;
}
const OrderSection = ({ count, productId }: OrderSectionProps) => {
  const { data, isPending, error } = useGetProductDetail(productId);

  const messageCardTextMessageRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const authInfo = useAuth();
  if (!authInfo) {
    navigate('/');
    return null;
  }

  if (isPending) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  const {
    imageURL,
    name,
    price: { basicPrice },
  } = data.detail;

  return (
    <Flex display={'flex'} width={'100%'} gap={'16px'}>
      <OrderProductInfo
        imageURL={imageURL}
        name={name}
        messageCardTextMessageRef={messageCardTextMessageRef}
      />
      <OrderReseipSection
        basicPrice={basicPrice}
        count={count}
        messageCardTextMessageRef={messageCardTextMessageRef}
        productId={productId}
      />
    </Flex>
  );
};

export default OrderSection;
