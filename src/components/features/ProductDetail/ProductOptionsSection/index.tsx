import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Text,
  useNumberInput,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { ProductDetail, ProductOption } from '@/types';
import { authSessionStorage } from '@/utils/storage';

interface Props {
  product: ProductDetail;
  productOptions: ProductOption[];
}

export const ProductOptionsSection = ({ product, productOptions }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const navigate = useNavigate();

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    onChange: (_valueAsString: string, valueAsNumber: number) => setQuantity(valueAsNumber),
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const handleGiftClick = () => {
    if (authSessionStorage.get()) {
      navigate('/order');
    } else {
      if (window.confirm('로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?')) {
        navigate('/login');
      }
    }
  };

  const totalPrice =
    product.price.sellingPrice * quantity +
    (selectedOption
      ? productOptions.find((option) => option.id === selectedOption)?.additionalPrice || 0
      : 0);

  return (
    <VStack>
      <Box border="1px" borderColor="blackAlpha.100" p={4}>
        <Text fontSize="md" as="b">
          {product.name}
        </Text>
        <RadioGroup onChange={(value) => setSelectedOption(Number(value))}>
          {Array.isArray(productOptions) &&
            productOptions.map((option) => (
              <Radio key={option.id} value={option.id.toString()}>
                {option.name} (+{option.additionalPrice}원)
              </Radio>
            ))}
        </RadioGroup>
        <HStack mt={2}>
          <IconButton aria-label="Add" icon={<MinusIcon />} {...dec} />
          <Input {...input} width="100%" />
          <IconButton aria-label="Add" icon={<AddIcon />} {...inc} />
        </HStack>
      </Box>
      <Spacer />
      <Box
        bg="blackAlpha.50"
        p={4}
        my={4}
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="sm" as="b">
          총 결제 금액
        </Text>
        <Text fontSize="xl" as="b">
          {totalPrice}원
        </Text>
      </Box>
      <Button
        borderRadius="md"
        bg="blackAlpha.900"
        width="100%"
        color="white"
        p={2}
        onClick={handleGiftClick}
        mb={16}
      >
        나에게 선물하기
      </Button>
    </VStack>
  );
};
