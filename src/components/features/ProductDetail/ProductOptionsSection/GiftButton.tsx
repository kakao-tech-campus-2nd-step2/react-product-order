import { Button } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import type { FormValues } from '@/pages/ProductDetail/formSchema';
import type { ProductDetail, ProductOption } from '@/types';
import { authSessionStorage, orderLocalStorage } from '@/utils/storage';

interface GiftButtonProps {
  product: ProductDetail;
  productOptions: ProductOption[];
}

export const GiftButton = ({ product, productOptions }: GiftButtonProps) => {
  const { handleSubmit, watch } = useFormContext<FormValues>();
  const navigate = useNavigate();
  const selectedOption = watch('selectedOption');
  const quantity = watch('quantity');

  const handleGiftClick = () => {
    const optionsArray = Array.isArray(productOptions) ? productOptions : [];
    const selectedProductOption = optionsArray.find((option) => option.id === selectedOption);
    const selectedProduct = {
      product: {
        ...product,
        selectedOption: selectedProductOption || null,
        quantity,
      },
    };
    orderLocalStorage.set(selectedProduct);
    if (authSessionStorage.get()) {
      navigate('/order');
    } else {
      if (window.confirm('로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?')) {
        navigate('/login');
      }
    }
  };

  return (
    <Button
      borderRadius="md"
      bg="blackAlpha.900"
      width="100%"
      color="white"
      p={2}
      onClick={handleSubmit(handleGiftClick)}
      mb={16}
    >
      나에게 선물하기
    </Button>
  );
};
