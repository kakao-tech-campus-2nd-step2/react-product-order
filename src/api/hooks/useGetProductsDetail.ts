import { fetchInstance } from '../instance';
import { GoodsData } from '@/types';
import { useQuery } from '@tanstack/react-query';

type RequestParams = {
  productId: string;
};

type ProductsDetailResponseData = {
  detail: GoodsData & {
    isAccessableProductPage: boolean;
    review: {
      averageRating: number;
      totalReviewCount: number;
    };
    productDescription: {
      displayImage: string;
    };
    productDetailInfo: {
      announcements: {
        name: string;
        value: string;
        displayOrder: number;
      }[];
      terms: {
        displayCode: string;
        title: string;
        description: string;
      }[];
    };
  };
};

const getProductsDetailPath = ({ productId }: RequestParams) => {
  return `/v1/products/${productId}/detail`;
};

export const getProductsDetail = async (params: RequestParams) => {
  const response = await fetchInstance.get<ProductsDetailResponseData>(
    getProductsDetailPath(params)
  );
  return response.data;
};

export const useGetProductDetails = ({ productId }: RequestParams) => {
  return useQuery({
    queryKey: ['productsDetail', productId],
    queryFn: () => getProductsDetail({ productId }),
  });
};
