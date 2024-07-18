import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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

export const getProductOption = async (productId: string) => {
  const res = await axios.get<ProductOptionData>(
    `https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/${productId}/detail`,
  );
  return res.data;
};

export const useGetProductOption = (productId: string) => {
  return useQuery({
    queryKey: ['productOption', productId],
    queryFn: () => getProductOption(productId),
  });
};
