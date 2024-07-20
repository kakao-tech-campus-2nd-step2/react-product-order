import { useEffect, useState } from 'react';

import type { GoodsData, RankingFilterOption } from '@/types';

import { getRankingProducts } from '../apis/product';

export type RankingProductsResponseData = {
  products: GoodsData[];
};

export const useGetRankingProducts = (filterOptions: RankingFilterOption) => {
  const [data, setData] = useState<RankingProductsResponseData | undefined>();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await getRankingProducts(filterOptions);

        setData(response);
        setLoading(false);
      } catch {
        setError(true);
        setData(undefined);
      }
    };

    fetchData();
  }, [filterOptions]);

  return {
    data,
    isLoading,
    isError,
  };
};
