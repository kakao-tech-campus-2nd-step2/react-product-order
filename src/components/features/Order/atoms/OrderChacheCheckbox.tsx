import { Checkbox, forwardRef } from '@chakra-ui/react';

export const OrderCacheCheckbox = forwardRef((props, ref) => (
  <Checkbox colorScheme="yellow" size="lg" ref={ref} {...props}>
    현금영수증 신청
  </Checkbox>
));
