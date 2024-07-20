import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Button, HStack, Input } from '@chakra-ui/react';

interface StepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const Stepper = ({ value, onIncrement, onDecrement }: StepperProps) => {
  return (
    <HStack maxW="300px">
      <Button onClick={onDecrement} w="40px" h="40px" border="none" bg="gray.100">
        <MinusIcon w="16px" p="0px" />
      </Button>
      <Input value={value} readOnly textAlign="center" maxW="120px" borderColor="gray.200" />
      <Button onClick={onIncrement} w="40px" h="40px" border="none" bg="gray.100">
        <AddIcon w="16px" p="0px" />
      </Button>
    </HStack>
  );
};
