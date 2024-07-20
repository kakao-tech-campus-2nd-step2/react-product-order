import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback } from 'react';

interface PriceData {
  basicPrice: number;
}

interface ProductDetailData {
  id: string;
  name: string;
  price: PriceData;
  imageURL: string;
}

const BASE_URL = 'https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/';

const getProductDetail = async (productId: string) => {
  const res = await axios.get<{ detail: ProductDetailData }>(`${BASE_URL}${productId}/detail`);
  return res.data.detail;
};

export const useGetProductDetail = (productId: string) => {
  const fetchProductDetail = useCallback(() => getProductDetail(productId), [productId]);
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: fetchProductDetail,
  });
};
