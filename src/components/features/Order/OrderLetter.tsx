import { Box, Textarea } from '@chakra-ui/react';

export interface IOrderLetter {
  setMessage: (message: string) => void;
  placeholder: string;
}

// TODO: Memoization
export const OrderLetter = ({ setMessage, placeholder }: IOrderLetter) => {
  const handleMessageChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setMessage(event.target.value);
  };

  return (
    <Box width="100%" padding="26px 30px 30px">
      <Textarea
        onChange={handleMessageChange}
        placeholder={placeholder}
        resize="none"
        height="100px"
        variant="filled"
        colorScheme="gray"
      />
    </Box>
  );
};
