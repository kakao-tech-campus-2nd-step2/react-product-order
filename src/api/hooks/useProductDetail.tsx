import { useQuery } from '@tanstack/react-query';

import { fetchInstance } from '@/api/instance';
import { type ProductDetail } from '@/types';

type GoodsDetailResponse = {
  detail: ProductDetail;
};

const getProductDetail = async (id: number): Promise<GoodsDetailResponse> => {
  const response = await fetchInstance.get(`/v1/products/${id}/detail`);
  return response.data;
};

export const useProductDetail = (id: number) => {
  return useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProductDetail(id),
  });
};
