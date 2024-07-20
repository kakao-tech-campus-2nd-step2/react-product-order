import { useMutation } from '@tanstack/react-query';

import { postOrder } from '../apis/order';
import API from '../path';

export const usePostOrder = () =>
  useMutation({
    mutationKey: [API.ORDER.POST_ORDER],
    mutationFn: postOrder,
  });
