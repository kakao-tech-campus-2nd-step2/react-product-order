import { ProductDetailRequest, ProductOptionsRequest } from '@internalTypes/requestTypes';
import { ProductDetailResponse } from '@internalTypes/responseTypes';
import axiosInstance from '../instance';
import { PRODUCTS_PATHS } from './path';

export const getProductsDetail = async (params: ProductDetailRequest): Promise<ProductDetailResponse> => {
  const { productId } = params;

  const res = await axiosInstance.get<ProductDetailResponse>(PRODUCTS_PATHS.PRODUCTS_DETAIL(productId));
  return res.data;
};

export const getProductsOptions = async (params: ProductOptionsRequest) => {
  const { productId } = params;

  const res = await axiosInstance.get<ProductDetailResponse>(PRODUCTS_PATHS.PRODUCTS_OPTIONS(productId));
  return res.data;
};
