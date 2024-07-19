import { useQuery } from '@tanstack/react-query';

import { fetchInstance } from '../instance';

interface ProductOption {
  key: string;
  value: string;
  level: number;
  options: ProductOption[];
  id: number;
  usable: boolean;
  price: number;
  stockQuantity: number;
  unlimitedStockQuantity: boolean;
}

interface ProductOptionResponseData {
  options: {
    productId: number;
    productName: string;
    productPrice: number;
    hasOption: boolean;
    giftOrderLimit: number;
    names: string[];
    options: ProductOption[];
  };
}

const getProductOptionPath = (productId: string) => `/v1/products/${productId}/options`;
const productOptionQueryKey = (productId: string) => [getProductOptionPath(productId)];

export const getProductOption = async (productId: string) => {
  const response = await fetchInstance.get<ProductOptionResponseData>(
    getProductOptionPath(productId),
  );

  return response.data;
};

export const useGetProductOption = (productId: string) => {
  return useQuery({
    queryKey: productOptionQueryKey(productId),
    queryFn: async () => {
      const res = await getProductOption(productId);
      return res;
    },
  });
};
