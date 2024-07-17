import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery} from "@tanstack/react-query";

import type { GoodsData } from "@/types";

import { fetchInstance } from "../instance";

type RequestParams = {
  productId: string;
};

type ProductDetailsResponseData = {
  detail: GoodsData;
};

const getProductDetailsPath = ({ productId }: RequestParams) => {
  return `/v1/products/${productId}/detail`;
};

export const getProductDetails = async (params: RequestParams) => {
  const response = await fetchInstance.get<ProductDetailsResponseData>(
    getProductDetailsPath(params),
  );
  return response.data.detail;
};

export const useGetProductDetails = (productId: string): UseQueryResult<GoodsData> => {
  return useQuery<GoodsData>({
    queryKey: ['detail', productId],
    queryFn: () => getProductDetails({ productId }),
    enabled: !!productId,
  });
};