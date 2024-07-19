import { fetchInstance } from '../../instance';
import { useQuery } from '@tanstack/react-query';

type RequestParams = {
  productId: string;
};

type ProductsOptionsResponseData = {
  options: {
    productId: number;
    productName: string;
    productPrice: number;
    hasOption: boolean;
    giftOrderLimit: number;
    names: string[];
    options: string[];
  };
};

const getProductsOptionsPath = ({ productId }: RequestParams) => {
  return `/v1/products/${productId}/options`;
};

export const getProductsOptions = async (params: RequestParams) => {
  const response = await fetchInstance.get<ProductsOptionsResponseData>(
    getProductsOptionsPath(params)
  );
  return response.data;
};

export const useGetProductOptions = ({ productId }: RequestParams) => {
  return useQuery({
    queryKey: ['productsOptions', productId],
    queryFn: () => getProductsOptions({ productId }),
  });
};
