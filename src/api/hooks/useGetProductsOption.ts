import { useEffect, useState } from 'react';

import type { GoodsOptionData } from '@/types';

import { fetchInstance } from '../instance';

export type GoodsOptionRequestParams = {
  productId: string;
};

export type GoodsOptionsResponseData = {
  options: GoodsOptionData;
};

const getGoodsOptionsPath = (goodsId: string) => `/v1/products/${goodsId}/options`;

export const getGoodsOptions = async (params: GoodsOptionRequestParams) => {
  const response = await fetchInstance.get<GoodsOptionsResponseData>(
    getGoodsOptionsPath(params.productId),
  );
  return response.data;
};

export const useGetGoodsOptions = ({ productId }: GoodsOptionRequestParams) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<GoodsOptionData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getGoodsOptions({ productId });
        setData(response.options);
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
