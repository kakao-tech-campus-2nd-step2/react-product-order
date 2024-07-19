import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
  Textarea
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

interface FormValues {
  message: string;
  receiptNumber: string;
  receiptType: string;
}

export const PaymentPage = () => {
  const location = useLocation();
  const { name, imageURL, totalPrice } = location.state as {
    name: string;
    imageURL: string;
    totalPrice: number;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      message: '',
      receiptNumber: '',
      receiptType: 'personal',
    }
  });

  const isReceiptChecked = watch('receiptNumber') !== '';

  const onSubmit = (data: FormValues) => {
    if (!data.message.trim()) {
      window.alert("메세지를 입력해주세요.");
      return;
    }
    if (data.message.length > 100) {
      window.alert("메세지는 100자 이내로 입력해주세요.");
      return;
    }
    if (isReceiptChecked) {
      if (!data.receiptNumber.trim()) {
        window.alert("현금영수증 선택을 해제하거나 현금영수증 번호를 입력하세요.");
        return;
      }
      if (!/^\d+$/.test(data.receiptNumber)) {
        window.alert("현금영수증 번호는 숫자로만 입력해주세요.");
        return;
      }
    }
    window.alert("주문이 완료되었습니다.")
  };

  return (
    <Box p={8}>
      <Flex direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'center', md: 'flex-start' }} maxWidth="1200px" mx="auto">
        <Box flex="1" mb={6} pr={{ base: 0, md: 8 }} >
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">나에게 주는 선물</FormLabel>
            <Textarea placeholder="선물과 함께 보낼 메시지를 적어보세요" size="xl" h="200px" w="100%" 
            {...register('message', { required: true })}
            />
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
            {...register('receiptNumber')}
            onChange={(e) => {
              setValue('receiptNumber', e.target.checked ? '' : "");
            }}
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
              {...register('receiptType')}
              w="260px" h="40px"
            >
              <option value="personal">개인소득공제</option>
              <option value="business">사업자증빙용</option>
            </Select>
          </FormControl>
            <FormControl ml={100} mb={20}>
              <Input placeholder=" (-없이) 숫자로만 입력해주세요." size="xl" w="260px" h="40px"
              {...register('receiptNumber', {
                required: isReceiptChecked ? '현금영수증 번호를 입력해주세요.' : false,
                pattern: {
                  value: /^\d+$/,
                  message: '현금영수증 번호는 숫자로만 입력해주세요.',
                }
              })}
              />
            </FormControl>
            <Text fontSize="lg" fontWeight="bold" ml={100} mb={20} textAlign="center">최종 결제 금액 {totalPrice}원</Text>
            <Button bg="#feeb00" color="black" onClick={handleSubmit(onSubmit)} ml={100} p={20} width="260px">
              {totalPrice}원 결제하기
            </Button>
          </Box>
      </Flex>
    </Box>
  );
};