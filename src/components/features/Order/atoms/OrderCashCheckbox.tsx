import type { CheckboxProps } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const OrderCashCheckbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => (
  <Checkbox ref={ref} colorScheme="yellow" size="lg" {...props}>
    현금영수증 신청
  </Checkbox>
));
