import { useCallback, useEffect, useRef, useState } from 'react';

import type { ProductDetailData } from '@/types';

import { fetchInstance } from '../instance';

export type GetDetailProductParams = {
  productId: string;
};

export type GetDetailProductResponse = {
  detail: ProductDetailData;
};

const getDetailProductPath = ({ productId }: GetDetailProductParams) =>
  `/v1/products/${productId}/detail`;

export const getDetailProduct = async (params: GetDetailProductParams) => {
  const response = await fetchInstance.get<GetDetailProductResponse>(getDetailProductPath(params));
  return response.data.detail;
};

export const useGetDetailProduct = (params: GetDetailProductParams) => {
  const [data, setData] = useState<ProductDetailData | undefined>();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const prevProductIdRef = useRef<string | undefined>();

  const fetchData = useCallback(async (productId: string) => {
    if (productId === prevProductIdRef.current) return;

    try {
      setLoading(true);
      setError(false);
      const response = await getDetailProduct({ productId });

      setData(response);
      prevProductIdRef.current = productId;
    } catch {
      setError(true);
      setData(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!params?.productId) {
      setLoading(false);
      return;
    }

    fetchData(params.productId);
  }, [params?.productId, fetchData]);

  return {
    data,
    isLoading,
    isError,
  };
};
