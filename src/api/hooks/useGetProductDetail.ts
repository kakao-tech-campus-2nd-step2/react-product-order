import type { ProductDetailData } from "@/types";

import { fetchInstance } from "../instance";

export type ProductDetailResponseData = ProductDetailData;

const getProductDetailPath = ({ productId }: { productId: number }) =>
  `v1/products/${productId}/detail`;

export const getProductDetail = async (productId: number): Promise<ProductDetailResponseData> => {
  const response = await fetchInstance.get<ProductDetailResponseData>(getProductDetailPath({ productId }));
  return response.data;
};