import { useQuery } from '@tanstack/react-query';
import { getGoodsDetail } from '@/services/product.service';

export const useGetGoodsDetail = (productId: number) => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => getGoodsDetail(productId),
  });
};
