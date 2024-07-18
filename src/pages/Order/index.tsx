import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import OrderBuySection from '@/components/features/Order/OrderBuySection';
import OrderDetailSection from '@/components/features/Order/OrderDetailSection';
import { RouterPath } from '@/routes/path';
import { Box } from '@chakra-ui/react';

type LocationState = {
  title: string;
  amount: number;
  imageSrc: string;
  subtitle: string;
  quantity: number;
};

const OrderPage = () => {
  const [isError, setIsError] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigate(RouterPath.home);
    }
  }, [location, navigate]);

  if (!location.state) {
    return null;
  }
  const { title, amount, imageSrc, subtitle, quantity }: LocationState =
    location.state;
  return (
    <form action=''>
      <Box width='100%'>
        <Container maxWidth='1280px'>
          <Box
            display='flex'
            width='100%'
            justifyContent='flex-start'
            alignItems='flex-start'
            position='relative'
          >
            <OrderDetailSection
              imageSrc={imageSrc}
              title={title}
              subtitle={subtitle}
              quantity={quantity}
              isError={setIsError}
            />
            <OrderBuySection price={amount * quantity} isError={isError} />
          </Box>
        </Container>
      </Box>
    </form>
  );
};

export default OrderPage;
