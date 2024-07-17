import { useEffect, useState } from 'react';

import type { ProductOptionData } from '@/types';

import { fetchInstance } from '../instance';

export type ProductOptionsResponse = {
  productId: number;
  productName: string;
  productPrice: number;
  hasOption: boolean;
  giftOrderLimit: number;
  names: string[];
  options: ProductOptionData[];
};
  

const getProductOptionsPath = (productId: string) => `/v1/products/${productId}/options`;

export const getProductOptions = async (productId: string) => {
  const response = await fetchInstance.get<ProductOptionsResponse>(getProductOptionsPath(productId));
  return response.data;
};

export const useGetProductOptions = (productId: string) => {
  const [data, setData] = useState<ProductOptionsResponse | undefined>();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await getProductOptions(productId);
        setData(response);
        setLoading(false);
      } catch (error) {
        setError(true);
        setData(undefined);
      }
    };

    fetchData();
  }, [productId]);

  return {
    data,
    isLoading,
    isError,
  };
};

export default useGetProductOptions;