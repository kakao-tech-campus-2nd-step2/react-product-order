import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Select,
  Text,
  Textarea
} from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const PaymentPage = () => {
  const location = useLocation();
  const { name, imageURL } = location.state as {
    name: string;
    imageURL: string;
    totalPrice: number;
  };
  const [receiptType, setReceiptType] = useState('personal');

  return (
    <Box p={8}>
      <Flex direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'center', md: 'flex-start' }} maxWidth="1200px" mx="auto">
        <Box flex="1" mb={6} pr={{ base: 0, md: 8 }} >
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">나에게 주는 선물</FormLabel>
            <Textarea placeholder="선물과 함께 보낼 메시지를 적어보세요" size="xl" h="200px" w="100%" />
          </FormControl>
          <Text fontWeight="bold" mb={2}>선물내역</Text>
          <Flex>
            <Image src={imageURL} alt={name} mb={4} maxW="100px" />
            <Box ml={4}>
              <Text fontSize="lg">{name}</Text>
            </Box>
          </Flex>
        </Box>
        <Box flex="1" maxW="400px">
            <Text fontSize="lg" ml={100} mb={40} fontWeight="bold">결제 정보</Text>
            <Checkbox
            ml={100} mb={20}
            defaultChecked
            sx={{
              '.chakra-checkbox__control': {
                borderRadius: '0px',
                borderColor: 'lightgray',
                borderWidth: '2px',
                bg: 'lightblue',
              },
              '.chakra-checkbox__control:checked': {
                bg: 'teal.500',
                borderColor: 'lightgray',
                borderWidth: '2px',
              }
            }}
            >
              현금영수증 신청</Checkbox>
          <FormControl ml={100} mb={4}>
            <Select 
              value={receiptType} 
              onChange={(e) => setReceiptType(e.target.value)} 
              w="260px" h="40px"
            >
              <option value="personal">개인소득공제</option>
              <option value="business">사업자증빙용</option>
            </Select>
          </FormControl>
          </Box>
      </Flex>
    </Box>
  );
};