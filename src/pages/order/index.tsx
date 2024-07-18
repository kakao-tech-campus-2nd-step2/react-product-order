import { Container } from '@/components/common/layouts/Container';
import OrderBuySection from '@/components/features/Order/OrderBuySection';
import OrderDetailSection from '@/components/features/Order/OrderDetailSection';
import { Box } from '@chakra-ui/react';

const OrderPage = () => {
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
            <OrderDetailSection />
            <OrderBuySection />
          </Box>
        </Container>
      </Box>
    </form>
  );
};

export default OrderPage;
