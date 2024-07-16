import { Container, Text, Textarea } from '@chakra-ui/react';

export const OrderMessageSection = () => {
  return (
    <>
      <Wrapper></Wrapper>
    </>
  );
};

const Wrapper = () => {
  return (
    <Container>
      <Text as="b">나에게 주는 선물</Text>
      <Textarea placeholder="선물과 함께 보낼 메세지를 적어보세요" />
    </Container>
  );
};
