import { useQuery } from '@tanstack/react-query';

//   import type { GoodsData } from '@/types';

import { fetchInstance } from '../instance';

type RequestParams = {
    productId: string;
};

//   type ThemesProductsResponseData = {
//     products: GoodsData[];
//     nextPageToken?: string;
//     pageInfo: {
//       totalResults: number;
//       resultsPerPage: number;
//     };
//   };

const getProductsDetailPath = ({ productId }: RequestParams) => {
    const params = new URLSearchParams();
    return `/v1/products/${productId}/detail?${params.toString()}`;
};

export const getProductsDetail = async (params: RequestParams) => {
    const response = await fetchInstance.get(
        getProductsDetailPath(params),
    );
    console.log(response.data);
    return response.data;
};

export const useGetProductsDetail = ({ productId }: RequestParams) => {
    return useQuery({
        queryKey: ['productsDetail', productId], // queryKey
        queryFn: async () => getProductsDetail({ productId }) // queryFn
    });
};