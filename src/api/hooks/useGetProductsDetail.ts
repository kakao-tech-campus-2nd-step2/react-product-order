import { useEffect, useState } from 'react';

import { fetchData } from '@/api/hooks/getAPI';
import { DetailData, ProductDetailParams } from '@/types';

export default function useGetProductsDetail({ id }: ProductDetailParams) {
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
        setLoading(false);
      } catch {
        setError(true);
        setData(undefined);
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
