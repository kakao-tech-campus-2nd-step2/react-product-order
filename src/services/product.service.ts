import { fetchInstance } from '@/api/instance';
import type {
  GetProductDetailResponse,
  ProductOrderRequestBody,
  OrderProductResponse,
} from '@/types';

export const getGoodsDetail = async (productId: number): Promise<GetProductDetailResponse> => {
  const response = await fetchInstance.get<GetProductDetailResponse>(
    `/v1/products/${productId}/detail`,
  );
  return response.data;
};

export const postOrder = async (
  orderData: ProductOrderRequestBody,
): Promise<OrderProductResponse> => {
  const response = await fetchInstance.post<OrderProductResponse>('/api/v1/orders', orderData);
  return response.data;
};
