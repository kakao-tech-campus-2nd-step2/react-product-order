import {
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Image,
  Input,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

type OrderInfo = {
  message: string;
  needReceipt: boolean;
  receiptType: '개인소득공제' | '사업자증빙용';
  receiptNumber: string;
};

const defaultOrderInfo: OrderInfo = {
  message: '',
  needReceipt: false,
  receiptType: '개인소득공제',
  receiptNumber: '',
};

export const OrderPage = () => {
  const location = useLocation();
  const [orderInfo, setOrderInfo] = useState<OrderInfo>(defaultOrderInfo);

  const orderPrice = location.state.price.basicPrice * location.state.count;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOrderInfo({ ...orderInfo, message: e.target.value });
  };

  const handleNeedReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderInfo({ ...orderInfo, needReceipt: e.target.checked });
  };

  const handleReceiptTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderInfo({ ...orderInfo, receiptType: e.target.value as OrderInfo['receiptType'] });
  };

  const handleReceiptNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderInfo({ ...orderInfo, receiptNumber: e.target.value });
  };

  const handleSubmit = () => {
    console.log(orderInfo);
  };

  return (
    <Flex h="calc(100vh - 54px)" w="100%" justify="center" pt="10">
      <Flex w="100%" maxW="1280px">
        <Flex
          w="100%"
          maxW="920px"
          flexDir="column"
          borderLeft="2px"
          borderColor="#eeeeee"
          align="start"
          overflow="hidden"
        >
          <Flex w="100%" p="10" flexDir="column" justify="center" align="center">
            <Text fontSize="lg" fontWeight="700">
              나에게 주는 선물
            </Text>
            <Textarea
              w="100%"
              h="100px"
              mt="5"
              bg="#EDF2F6"
              border="none"
              resize="none"
              _focus={{ bg: 'white' }}
              placeholder="선물과 함께 보낼 메세지를 적어보세요"
              value={orderInfo.message}
              onChange={handleMessageChange}
            />
          </Flex>
          <Divider w="100%" borderWidth="4px" opacity="1" borderColor="#eeeeee" />
          <Flex w="100%" p="5" flexDir="column" justify="center">
            <Text fontWeight="700">선물내역</Text>
            <Card
              w="100%"
              flexDir="row"
              p="5"
              mt="5"
              borderWidth="1px"
              borderColor="#eeeeee"
              shadow="sm"
            >
              <Image w="90px" aspectRatio="1/1" src={location.state.imageURL} />
              <Flex w="100%" flexDir="column" ml="2">
                <Text fontSize="sm" fontWeight="500" color="#999999">
                  {location.state.brandInfo.name}
                </Text>
                <Text>
                  {location.state.name} x {location.state.count}개
                </Text>
              </Flex>
            </Card>
          </Flex>
        </Flex>
        <Flex w="360px" h="100%" p="5" flexDir="column" borderX="2px" borderColor="#eeeeee">
          <Text fontSize="lg" fontWeight="700" py="5">
            결제 정보
          </Text>
          <Divider opacity="1" borderColor="#eeeeee" />
          <Flex w="100%" flexDir="column" p="5" gap="2">
            <Checkbox
              size="lg"
              mb="3"
              colorScheme="yellow"
              checked={orderInfo.needReceipt}
              onChange={handleNeedReceiptChange}
            >
              <Text fontSize="md" fontWeight="700">
                현금영수증 신청
              </Text>
            </Checkbox>
            <Select value={orderInfo.receiptType} onChange={handleReceiptTypeChange}>
              <option>개인소득공제</option>
              <option>사업자증빙용</option>
            </Select>
            <Input
              value={orderInfo.receiptNumber}
              onChange={handleReceiptNumberChange}
              pattern="[0-9]*"
              placeholder="(-없이) 숫자만 입력해주세요"
            />
          </Flex>
          <Divider opacity="1" borderColor="#eeeeee" />
          <Flex w="100%" justify="space-between" p="5">
            <Text fontWeight="700">최종 결제금액</Text>
            <Text fontSize="lg" fontWeight="700">{`${orderPrice}원`}</Text>
          </Flex>
          <Divider opacity="1" borderColor="#eeeeee" />
          <Button
            onClick={handleSubmit}
            mt="10"
            bg="#fee500"
            py="2"
            fontWeight="400"
            _hover={{
              bg: '#fee500',
              opacity: 0.8,
            }}
          >
            {`${orderPrice}원 결제하기`}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
