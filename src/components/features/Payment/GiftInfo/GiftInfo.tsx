import { Box } from '@chakra-ui/react';

import GiftBasket from '@/components/features/Payment/GiftInfo/GiftBasket';
import GiftMessage from '@/components/features/Payment/GiftInfo/GiftMessage';
import type { giftMessageProps, productInfoProps } from '@/types';

export default function GiftInfo({ productInfo, message, setMessage }: productInfoProps & giftMessageProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      width="900px"
      height="904px"
      borderLeft="solid 1px rgb(226, 232, 240)"
    >
      <GiftMessage message={message} setMessage={setMessage} />
      <GiftBasket  productInfo={productInfo} />
    </Box>
  );
}
