import { useMutation } from '@tanstack/react-query';

import { fetchInstance } from '../instance';

interface OrderRequestBody {
  productId: string;
  productOptionId: number;
  productQuantity: number;
  messageCardTemplateId: number;
  messageCardTextMessage: string;
  senderId: number;
  receiverId: number;
  hasCashReceipt: boolean;
  cashReceiptType: 'PERSONAL' | 'BUSINESS';
  cashReceiptNumber: string;
}

const postOrderPath = () => '/v1/themes';
const orderQueryKey = [postOrderPath()];

export const postOrder = async (body: OrderRequestBody) => {
  const response = await fetchInstance.post(postOrderPath(), body);
  return response.data;
};

export const usePostOrder = () =>
  useMutation({
    mutationKey: orderQueryKey,
    mutationFn: postOrder,
  });
