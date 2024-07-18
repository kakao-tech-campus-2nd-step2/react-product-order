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

type ProductOptionsResponseData = {
  options: ProductOptionsData;
};

const getProductOptions = (productId: string) => {
  return `/v1/products/${productId}/options`;
};

export const useGetProductOptions = async (productId: string) => {
  const response = await fetchInstance.get<ProductOptionsResponseData>(
    getProductOptions(productId),
  );
  return response.data;
};
