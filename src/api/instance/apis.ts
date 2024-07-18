import { fetchInstance } from '@/api/instance/index';
import type { Products } from '@/api/products/types';

export const getProductDetailById = async (productId: string) => {
  const response = await fetchInstance.get<Products.ProductDetailData>(
    `/v1/products/${productId}/detail`,
  );
  return response.data;
};

export const getProductOptionsById = async (productId: string) => {
  const response = await fetchInstance.get<Products.GetProductOptionsByIdResp>(
    `/v1/products/${productId}/options`,
  );
  return response.data;
};
