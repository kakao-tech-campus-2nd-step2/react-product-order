import {
  Box,
  Button,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { RouterPath } from '@/routes/path';

type Props = {
  name: string;
  totalPrice: string;
};

const mock: Props = {
  name: '외식 통합권 10만원권',
  totalPrice: '100000원',
};

export const ProductOrderSection = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = () => {
  return (
    <Flex direction="column" justify="space-between">
      <Box>
        <Text as="b">{mock.name}</Text>
        <NumberInput defaultValue={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
      <Box>
        <Box bg="lightgray" w="100%">
          <Flex justify="space-between">
            <Text as="b">총 결제 금액</Text>
            <Text as="b">{mock.totalPrice}</Text>
          </Flex>
        </Box>
        <Link to={RouterPath.order}>
          <Button w="100%" colorScheme="teal">
            나에게 선물하기
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};
