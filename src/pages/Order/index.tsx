import { useLocation } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import OrderBuySection from '@/components/features/Order/OrderBuySection';
import OrderDetailSection from '@/components/features/Order/OrderDetailSection';
import { Box } from '@chakra-ui/react';

const OrderPage = () => {
  const location = useLocation();
  const { title, imageSrc, amount, subtitle } = location.state;
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
            />
            <OrderBuySection price={amount} />
          </Box>
        </Container>
      </Box>
    </form>
  );
};

export default OrderPage;
