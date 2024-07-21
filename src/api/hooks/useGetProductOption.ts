import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback } from 'react';

interface ProductOptionData {
  productId: number;
  productName: string;
  productPrice: number;
  hasOption: boolean;
  giftOrderLimit: number;
  names: string[];
  options: {
    key: string;
    value: string;
    level: number;
    options: [];
    id: number;
    usable: boolean;
    price: number;
    stockQuantity: number;
    unlimitedStockQuantity: boolean;
  }[];
}

const BASE_URL = 'https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/';

export const getProductOption = async (productId: string) => {
  const res = await axios.get<ProductOptionData>(`${BASE_URL}${productId}/detail`);
  return res.data;
};

export const useGetProductOption = (productId: string) => {
  const fetchProductOption = useCallback(() => getProductOption(productId), [productId]);
  return useQuery({
    queryKey: ['productOption', productId],
    queryFn: fetchProductOption,
  });
};
