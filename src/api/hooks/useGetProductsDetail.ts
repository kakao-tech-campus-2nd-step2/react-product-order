import { useEffect, useState } from 'react';

import type { GoodsData } from '@/types';

import { fetchInstance } from '../instance';

export type GoodsDetailRequestParams = {
  productId: string;
};

export type GoodsDetailResponseData = {
  detail: GoodsData;
};

export const getGoodsDetail = async (goodsId: string) => {
  const response = await fetchInstance.get<GoodsDetailResponseData>(
    `/v1/products/${goodsId}/detail`,
  );
  return response.data;
};

export const useGetGoodsDetail = ({ productId }: GoodsDetailRequestParams) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<GoodsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getGoodsDetail(productId);
        setData(response.detail);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  return { isLoading, error, data };
};
