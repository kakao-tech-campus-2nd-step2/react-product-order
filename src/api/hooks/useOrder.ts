import { postOrder } from '@/services/product.service';
import type { ProductOrderRequestBody, OrderProductResponse } from '@/types';

export const usePlaceOrder = async (
  orderData: ProductOrderRequestBody,
): Promise<OrderProductResponse> => {
  return postOrder(orderData);
};
