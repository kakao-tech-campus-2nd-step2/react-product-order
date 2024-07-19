import { Box, Textarea } from '@chakra-ui/react';
import { memo } from 'react';

import { orderLetterPlaceHolder } from '@/pages/Order';

export interface IOrderLetter {
  setMessage: (message: string) => void;
}

export const OrderLetter = memo(({ setMessage }: IOrderLetter) => {
  const handleMessageChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setMessage(event.target.value);
  };

  return (
    <Box width="100%" padding="26px 30px 30px">
      <Textarea
        onChange={handleMessageChange}
        placeholder={orderLetterPlaceHolder}
        resize="none"
        height="100px"
        variant="filled"
        colorScheme="gray"
      />
    </Box>
  );
});
