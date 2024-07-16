import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { fetchInstance } from '../instance';

export const useCurrentProduct = (productKey: string) => {
  const getProductPath = `/v1/products/${productKey}/detail`;
  const productQueryKey = [getProductPath];
  const getProduct = async () => {
    const response = await fetchInstance.get(getProductPath);
    return response.data.detail;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: productQueryKey,
    queryFn: getProduct,
  });

  const isRender = useMemo(() => {
    if (isLoading || isError) return false;
    if (!data) return false;
    return true;
  }, [data, isLoading, isError]);

  const currentProduct = data;

  return {
    isRender,
    currentProduct,
  };
};
