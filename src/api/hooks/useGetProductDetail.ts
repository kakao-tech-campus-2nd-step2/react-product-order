import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import type { GoodsData } from '@/types';

import { fetchInstance } from '../instance';

type RequestParams = {
    productId: number;
};

export const getProductDetail = async ({ productId }: RequestParams): Promise<GoodsData> => {
    const response = await fetchInstance.get<{ detail: GoodsData }>(`/v1/products/${productId}/detail`);
    console.log('API 응답 데이터:', response.data.detail); 
    return response.data.detail; 
  };
  
export const useGetProductDetail = (productId: number): UseQueryResult<GoodsData> => {
    return useQuery({
        queryKey: ['productDetail', productId],
        queryFn: () => getProductDetail({ productId }),
    });
};