import { useQuery } from "@tanstack/react-query";

import { fetchInstance } from "../instance";

type OptionsData = {
  key: string;
  value: string;
  level: number;
  options: string[];
  id: number;
  usable: boolean;
  price: number;
  stockQuantity: number;
  unlimitedStockQuantity: false;
};

type ProductOptionsData = {
  productId: string;
  productName: string;
  productPrice: number;
  hasOption: boolean;
  giftOrderLimit: number;
  names: string[];
  options: OptionsData[];
};

export type ProductOptionsResponseData = {
  options: ProductOptionsData;
};

const getProductOptionsPath = (productId: string) => {
  return `/v1/products/${productId}/options`;
};

const getProductOptions = async (productId: string) => {
  const response = await fetchInstance.get<ProductOptionsResponseData>(
    getProductOptionsPath(productId),
  );
  return response.data;
};

export const useGetProductOptions = (productId: string) => {
  return useQuery<ProductOptionsResponseData, Error>({
    queryKey: ["productOptions", productId],
    queryFn: () => getProductOptions(productId),
  });
};
