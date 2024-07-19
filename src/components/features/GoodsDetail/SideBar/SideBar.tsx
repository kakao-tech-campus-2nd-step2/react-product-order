import { Box, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';

import GiftButton from '@/components/features/GoodsDetail/SideBar/GiftButton';
import GoodsCount from '@/components/features/GoodsDetail/SideBar/GoodsCount';
import type { goodsDetailData } from '@/types';

export default function SideBar({ price, name, brandName, imageURL, limit = 100 }: goodsDetailData) {
  const [amount, setAmount] = useState(1);

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
      <GoodsCount name={name} amount={amount} setAmount={setAmount} limit={limit}/>
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
            {price * amount}
          </Text>
        </Button>
        <GiftButton
          price={price}
          name={name}
          amount={amount}
          brandName={brandName}
          imageURL={imageURL}
        />
      </Box>
    </Box>
  );
}
