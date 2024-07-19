import { ProductDetailRequest } from '@internalTypes/requestTypes';
import { ProductDetailResponse } from '@internalTypes/responseTypes';
import axiosInstance from '../instance';
import { PRODUCTS_PATHS } from './path';

export const getProductsDetail = async (params?: ProductDetailRequest): Promise<ProductDetailResponse> => {
  if (!params || !params.productId) {
    throw new Error('ProductId is required');
  }

  const { productId } = params;
  const res = await axiosInstance.get<ProductDetailResponse>(PRODUCTS_PATHS.PRODUCTS_DETAIL(productId));
  return res.data;
};
