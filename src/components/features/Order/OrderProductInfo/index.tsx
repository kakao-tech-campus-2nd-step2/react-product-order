import { Box, Flex, FormControl, FormLabel, HStack, Image, Input, Text } from '@chakra-ui/react';

interface OrderProductInfoProps {
  imageURL: string;
  name: string;
  messageCardTextMessageRef: React.RefObject<HTMLInputElement>;
}
const OrderProductInfo = ({ imageURL, name, messageCardTextMessageRef }: OrderProductInfoProps) => {
  return (
    <Box width={'100%'}>
      <Flex direction="column" gap="1rem">
        <FormControl>
          <FormLabel>나에게 주는 선물</FormLabel>
          <Input
            type="email"
            placeholder="선물과 함께 보낼 메시지를 적어보세요"
            ref={messageCardTextMessageRef}
          />
        </FormControl>
        <Box width={'100%'} bg="white">
          <Text borderBottom={'1px solid'}>선물 내역</Text>
          <HStack>
            <Image src={imageURL} alt={name} width={90} />
            <Box>
              <Text>상품명</Text>
              <Text>{name}</Text>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default OrderProductInfo;
