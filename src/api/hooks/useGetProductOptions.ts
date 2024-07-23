import { useCallback, useEffect, useRef, useState } from 'react';

import type { ProductOptionsData } from '@/types';

import { fetchInstance } from '../instance';

export type GetProductOptionsParams = {
  productId: string;
};

export type GetProductOptionsResponse = {
  options: ProductOptionsData;
};

const getProductOptionsPath = ({ productId }: GetProductOptionsParams) =>
  `/v1/products/${productId}/options`;

export const getProductOptions = async (params: GetProductOptionsParams) => {
  const response = await fetchInstance.get<GetProductOptionsResponse>(
    getProductOptionsPath(params),
  );
  return response.data.options;
};

export const useGetProductOptions = (productId: string) => {
  const [data, setData] = useState<ProductOptionsData | undefined>();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const prevProductIdRef = useRef<string | undefined>();

  const fetchData = useCallback(async (id: string) => {
    if (id === prevProductIdRef.current) return;

    try {
      setLoading(true);
      setError(false);
      const response = await getProductOptions({ productId: id });

      setData(response);
      prevProductIdRef.current = id;
    } catch (error) {
      console.error('Error fetching product options:', error);
      setError(true);
      setData(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    fetchData(productId);
  }, [productId, fetchData]);

  return {
    data,
    isLoading,
    isError,
  };
};
