import { Text, Textarea } from '@chakra-ui/react';

interface OrderFormProps {
  message: string;
  setMessage: (value: string) => void;
}

export const OrderForm = ({ message, setMessage }: OrderFormProps) => (
  <>
    <Text fontSize="18px" fontWeight="bold">
      나에게 주는 선물
    </Text>
    <Textarea
      variant="filled"
      w="100%"
      h="100px"
      placeholder="선물과 함께 보낼 메시지를 적어주세요"
      padding="12px 16px"
      textAlign="left"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
  </>
);
