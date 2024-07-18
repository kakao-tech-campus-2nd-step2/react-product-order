import { Button, Flex, Text } from '@chakra-ui/react';

export default function Price({
  totalPrices,
  onClickPayment,
}: {
  totalPrices: number;
  onClickPayment: () => void;
}) {
  const textStyles = {
    bg: 'rgb(245, 245, 245)',
    fontWeight: 700,
    lineHeight: '14px',
    color: 'rgb(17, 17, 17)',
  };

  const ButtonStyle = {
    borderRadius: '4px',
    bg: 'rgb(17, 17, 17)',
    h: '60px',
    cursor: 'pointer',
    fontSize: '16px',
    color: 'white',
  };
  return (
    <Flex flexDirection="column">
      <Flex
        mb="20px"
        p="18px 20px"
        bg="rgb(245,245,245)"
        borderRadius="4px"
        w="100%"
        justify="space-between"
        alignItems="center"
      >
        <Text fontSize="14px" sx={textStyles}>
          총 결제 금액
        </Text>
        <Text fontSize="20px" sx={textStyles}>
          {totalPrices}원
        </Text>
      </Flex>
      <Button _hover={{ bg: 'rgb(34,34,34)' }} sx={ButtonStyle} onClick={onClickPayment}>
        나에게 선물하기
      </Button>
    </Flex>
  );
}
