import { Text, Textarea, VStack } from '@chakra-ui/react';

interface Props {
  message: string;
  setMessage: (message: string) => void;
}

export const GiftMessageSection = ({ message, setMessage }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
  };

  return (
    <VStack p={16} width="100%" alignItems="center">
      <Text fontSize="lg" as="b">
        나에게 주는 선물
      </Text>
      <Textarea
        backgroundColor="gray.100"
        placeholder="선물과 함께 보낼 메시지를 적어보세요"
        value={message}
        onChange={handleChange}
      />
    </VStack>
  );
};
