import { Box, Button, Text } from '@chakra-ui/react';

import GiftButton from '@/components/features/GoodsDetail/SideBar/GiftButton';
import GoodsCount from '@/components/features/GoodsDetail/SideBar/GoodsCount';

export default function SideBar() {
  return (
    <Box
      width="360px"
      height="904px"
      p="30px 12px 30px 30px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <GoodsCount />
      <Box>
        <Button
          boxSizing="border-box"
          display="flex"
          justifyContent="space-between"
          bgColor="rgb(245, 245, 245)"
          width="318px"
          height="50px"
          p="18px 20px"
          mb="20px"
          borderRadius={4}
        >
          <Text fontSize={14} fontWeight={700}>
            총 결제 금액
          </Text>
          <Text fontSize={20} fontWeight={700}>
            0원
          </Text>
        </Button>
        <GiftButton />
      </Box>
    </Box>
  );
}
