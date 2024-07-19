import { useEffect, useState } from 'react';

import { fetchData } from '@/api/hooks/getAPI';
import type { ProductParams } from '@/types';

export default function useGetLimit({ id }: ProductParams) {
  const [limit, setLimit] = useState<number>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchData(`/api/v1/products/${id}/options`);

        setLimit(response.options.giftOrderLimit);
      } catch {
        console.log("error");
      }
    };

    fetchProducts();
  }, [id]);

  return limit;
}
