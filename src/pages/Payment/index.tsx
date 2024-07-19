import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    alert('결제가 완료되었습니다.');
    navigate('/');
  };

  return (
    <Box padding="20px">
      <Text fontSize="2xl" marginBottom={4}>
        결제 페이지
      </Text>
      <Button colorScheme="blue" onClick={handlePayment}>
        결제하기
      </Button>
    </Box>
  );
};

export default PaymentPage;
