import { useEffect, useState } from 'react';

import type { RankingFilterOption } from '@/types';

import type { RankingProductsResponseData } from '../apis/product';
import { getRankingProducts } from '../apis/product';

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
