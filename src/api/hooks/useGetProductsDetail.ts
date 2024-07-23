import { useEffect, useState } from 'react';

import { fetchData } from '@/api/hooks/getAPI';
import type { DetailData, ProductParams } from '@/types';

export default function useGetProductsDetail({ id }: ProductParams) {
  const [data, setData] = useState<DetailData>();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetchData(`/api/v1/products/${id}/detail`);

        setData(response.detail);
      } catch {
        setError(true);
        setData(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  return {
    data,
    isLoading,
    isError,
  };
}