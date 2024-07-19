import { forwardRef, Input } from '@chakra-ui/react';

export const OrderCacheReceiptInput = forwardRef((props, ref) => (
  <Input ref={ref} placeholder="(-없이) 숫자만 입력해주세요." {...props} />
));
