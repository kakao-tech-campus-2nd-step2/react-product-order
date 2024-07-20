// OrderPage.tsx
import {
      Box,
      Button,
      Checkbox,
      Flex,
      Heading,
      HStack,
      Image,
      Input,
      Select,
      Text,
      Textarea,
      VStack,
    } from '@chakra-ui/react';
    import React, { useState } from 'react';
    import { useLocation, useNavigate } from 'react-router-dom';

    import { Header } from '@/components/features/Layout/Header';
    import { useAuth } from '@/provider/Auth';
    import type { GoodsData } from '@/types';

    const ProductOrder: React.FC = () => {
      const location = useLocation();
      const navigate = useNavigate();
      const authInfo = useAuth();
      const { product, quantity } = location.state as { product: GoodsData; quantity: number } || {};

      const [message, setMessage] = useState('');
      const [taxRequest, setTaxRequest] = useState(false);
      const [taxType, setTaxType] = useState('');
      const [taxNumber, setTaxNumber] = useState('');
      const [errors, setErrors] = useState<{ [key: string]: string }>({});

      const totalPrice = product.price.sellingPrice * quantity;

      const handlePayment = () => {
        const newErrors: { [key: string]: string } = {};

        // 메시지 유효성 검사
        if (!message) {
          newErrors.message = '메시지를 입력해주세요.';
        } else if (message.length > 100) {
          newErrors.message = '메시지는 100자 이내로 입력해주세요.';
        }

        // 현금영수증 번호 유효성 검사
        if (taxRequest) {
          if (!taxNumber) {
            newErrors.taxNumber = '현금영수증 번호를 입력해주세요.';
          } else if (!/^\d+$/.test(taxNumber)) {
            newErrors.taxNumber = '현금영수증 번호는 숫자만 입력해주세요.';
          }
        }

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }

        if (!authInfo) {
          navigate('/login');
        } else {
          console.log('결제 로직 실행');
        }
      };

      return (
        <Flex direction="column" maxWidth="1200px" margin="auto" padding={4}>
          <Box position="fixed" top="0" left="0" width="100%" zIndex="1000">
            <Header />
          </Box>
          <Box mt="60px" p={5}>
            <Heading as="h2" size="lg" marginBottom={5}>
              나에게 주는 선물
            </Heading>
            <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
              <Box flex="3" marginRight={{ md: 5 }}>
                <Textarea
                  placeholder="선물과 함께 보낼 메시지를 적어보세요"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  size="lg"
                  height="150px"
                  marginBottom={5}
                  backgroundColor="#f0f2f5"
                />
                {errors.message && <Text color="red.500">{errors.message}</Text>}
                <Heading as="h3" size="md" marginBottom={5}>
                  선물내역
                </Heading>
                <Flex border="1px" borderRadius="10px" borderColor="#ccd0d5" padding={4}>
                  <Image src={product.imageURL} alt={product.name} boxSize="100px" objectFit="cover" marginRight={4} />
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">{product.brandInfo.name}</Text>
                    <Text>{product.name}</Text>
                    <Text>{product.price.sellingPrice.toLocaleString()}원</Text>
                    <Text>{`수량: ${quantity}개`}</Text>
                  </VStack>
                </Flex>
              </Box>
              <Box flex="2" padding={4} border="1px" borderRadius="10px" borderColor="#ccd0d5">
                <Heading as="h3" size="md" marginBottom={5}>
                  결제 정보
                </Heading>
                <VStack spacing={4} align="stretch">
                  <Checkbox isChecked={taxRequest} onChange={(e) => setTaxRequest(e.target.checked)}>
                    현금영수증 신청
                  </Checkbox>
                  <Select placeholder="개인소득공제" value={taxType} onChange={(e) => setTaxType(e.target.value)}>
                    <option value="개인소득공제">개인소득공제</option>
                    <option value="사업자지출증빙">사업자지출증빙</option>
                  </Select>
                  <Input
                    placeholder="(-없이) 숫자만 입력해주세요."
                    value={taxNumber}
                    onChange={(e) => setTaxNumber(e.target.value)}
                  />
                  {errors.taxNumber && <Text color="red.500">{errors.taxNumber}</Text>}
                  <HStack justifyContent="space-between" width="100%">
                    <Text fontSize="lg">최종 결제금액</Text>
                    <Text fontSize="lg" fontWeight="bold">
                      {totalPrice.toLocaleString()}원
                    </Text>
                  </HStack>
                  <Button colorScheme="gray" size="lg" width="450px" height="60px" onClick={handlePayment}>
                    {totalPrice.toLocaleString()}원 결제하기
                  </Button>
                </VStack>
              </Box>
            </Flex>
          </Box>
        </Flex>
      );
    };

    export default ProductOrder;
