import { fetchInstance } from '../instance';
import type { ProductOrderRequestBody, OrderProductResponse } from '@/types';

export const placeOrder = async (
  orderData: ProductOrderRequestBody,
): Promise<OrderProductResponse> => {
  const response = await fetchInstance.post<OrderProductResponse>('/api/v1/orders', orderData);
  return response.data;
};
