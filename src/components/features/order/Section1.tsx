import { Box, Flex, Image, Text, Textarea } from '@chakra-ui/react';
import { useContext } from 'react';

import { OrderContext } from '@/pages/Order';

export default function Section1() {
  const orderData = useContext(OrderContext);
  const [data, count, paymentInfo, setPaymentInfo] = [
    orderData?.options,
    orderData?.count,
    orderData?.paymentInfo,
    orderData?.setPaymentInfo,
  ];

  const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (paymentInfo && setPaymentInfo)
      setPaymentInfo({
        message: e.target.value,
        receipt: paymentInfo?.receipt,
        receiptNumber: paymentInfo?.receiptNumber,
      });
  };
  return (
    <Flex
      flexDirection="column"
      w="100%"
      maxW="900px"
      h="100%"
      borderRight="1px solid #E2E8F0"
      borderLeft="1px solid #E2E8F0"
      p="44px 0px 32px"
    >
      <Flex flexDirection="column" justify="center" align="center" p="14px 30px">
        <Text fontSize="18px" lineHeight="21px" fontWeight="700">
          나에게 주는 선물
        </Text>
        <Textarea
          onChange={onChangeMessage}
          placeholder="선물과 함께 보낼 메시지를 적어보세요"
          w="100%"
          m="14px 30px"
          bg="gray.100"
        />
      </Flex>
      <Box w="100%" bg="rgb(237,237,237)" h="8px" />
      <Flex flexDirection="column" gap="16px" p="16px">
        <Text fontSize="15px" lineHeight="24px" fontWeight="700">
          선물내역
        </Text>
        <Flex
          w="100%"
          p="20px 16px 16px"
          borderRadius="8px"
          border="1px solid rgb(237,237,237)"
          boxShadow="rgba(0,0,0,0.2) 0px 4px 8px"
        >
          <Image
            objectFit="cover"
            objectPosition="center center"
            borderRadius="0px"
            aspectRatio="1/1"
            w="86px"
          />
          <Flex flexDirection="column" pl="8px">
            <Text fontSize="13px" lineHeight="14px" color="rgb(136,136,136)">
              상품명1
            </Text>
            <Text
              fontSize="14px"
              lineHeight="18px"
              mt="3px"
              color="rgb(34,34,34)"
              overflow="hidden"
            >
              {data?.productName} X {count}개
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
