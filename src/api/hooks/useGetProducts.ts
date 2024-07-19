import { useQuery } from "@tanstack/react-query";

import { fetchInstance } from '../instance';

export type ProductParams = {
  productId: string;
};

const getProductsPath = ({ productId }: ProductParams) => {
  return `/v1/product/${productId}/detail`;
};

export const getProducts = async (params: ProductParams) => {
  const response = await fetchInstance.get(getProductsPath(params));
  return response.data;
};

export const useGetProducts = ({ productId }: ProductParams) => {
  useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProducts({ productId }),
  });
};