import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Text,
  Textarea
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

export const PaymentPage = () => {
  const location = useLocation();
  const { name, imageURL } = location.state as {
    name: string;
    imageURL: string;
    totalPrice: number;
  };

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
      </Flex>
    </Box>
  );
};