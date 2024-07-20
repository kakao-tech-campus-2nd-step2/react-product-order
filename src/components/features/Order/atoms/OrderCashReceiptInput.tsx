import type { InputProps } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const OrderCashReceiptInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <Input ref={ref} placeholder="(-없이) 숫자만 입력해주세요." {...props} />
));
