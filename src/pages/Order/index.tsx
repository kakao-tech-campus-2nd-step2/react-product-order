import { Container, Flex } from '@chakra-ui/react';

import { Section1, Section2 } from '@/components/features/order';

export default function OrderPage() {
  return (
    <Container w="100%" maxW="1250px" h="100vh">
      <Flex>
        <Section1 />
        <Section2 />
      </Flex>
    </Container>
  );
}
