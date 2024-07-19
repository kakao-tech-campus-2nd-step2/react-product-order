import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { OrderSchema } from '@/schema/index';

export const useOrderForm = () => {
  const location = useLocation();
  const { productId, quantity } = location.state;
  const [alertMessage, setAlertMessage] = useState({
    isSuccess: true,
    message: '',
  });

  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    mode: 'onSubmit',
    defaultValues: {
      productId,
      productQuantity: quantity,
      gitfMessage: '',
      isCashChecked: false,
      cashReceiptType: '개인소득공제',
      cashReceiptNumber: '',
    },
  });

  const onSubmit = () => {
    setAlertMessage({ isSuccess: true, message: '주문이 완료되었습니다.' });
  };

  const handleSubmit = form.handleSubmit(onSubmit, (errors) => {
    const errorMessages =
      Object.values(errors).flatMap((error) => error.message)[0] || '';

    setAlertMessage({ isSuccess: false, message: errorMessages });
  });

  return { form, handleSubmit, alertMessage, setAlertMessage };
};
