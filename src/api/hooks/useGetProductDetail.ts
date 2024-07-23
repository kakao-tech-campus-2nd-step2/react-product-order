import { useCallback, useEffect, useRef, useState } from 'react';

import type { ProductDetailData } from '@/types';

import { fetchInstance } from '../instance';

export type GetProductDetailParams = {
  productId: string;
};

export type GetProductDetailResponse = {
  detail: ProductDetailData;
};

const getProductDetailPath = ({ productId }: GetProductDetailParams) =>
  `/v1/products/${productId}/detail`;

export const getProductDetail = async (params: GetProductDetailParams) => {
  const response = await fetchInstance.get<GetProductDetailResponse>(getProductDetailPath(params));
  return response.data.detail;
};

export const useGetProductDetail = (params: GetProductDetailParams) => {
  const [data, setData] = useState<ProductDetailData | undefined>();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const prevProductIdRef = useRef<string | undefined>();

  const fetchData = useCallback(async (productId: string) => {
    if (productId === prevProductIdRef.current) return;

    try {
      setLoading(true);
      setError(false);
      const response = await getProductDetail({ productId });

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
