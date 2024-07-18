import { useEffect, useState } from 'react';

import type { GoodsData } from '@/types';

import { fetchInstance } from '../instance';

export type GoodsDetailRequestParams = {
  productId: string;
};

export type GoodsDetailResponseData = {
  detail: GoodsData;
};

const getGoodsDetailPath = (goodsId: string) => `/v1/products/${goodsId}/detail`;

export const getGoodsDetail = async (params: GoodsDetailRequestParams) => {
  const response = await fetchInstance.get<GoodsDetailResponseData>(
    getGoodsDetailPath(params.productId),
  );
  return response.data;
};

export const useGetGoodsDetail = ({ productId }: GoodsDetailRequestParams) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<GoodsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getGoodsDetail({ productId });
        setData(response.detail);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  return { loading, error, data };
};
