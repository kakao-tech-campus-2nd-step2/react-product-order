import { Box } from '@chakra-ui/react';

import GiftMessage from '@/components/features/Payment/GiftInfo/GiftBasket';
import GiftBasket from '@/components/features/Payment/GiftInfo/GiftMessage';
import type { productInfoProps } from '@/types';

export default function GiftInfo({ productInfo }: productInfoProps) {
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
      <GiftBasket />
      <GiftMessage productInfo={productInfo} />
    </Box>
  );
}
