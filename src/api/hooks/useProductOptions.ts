import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchProductOptions } from '@/api/services/productOptions';

export const useProductOptions = (productId: string) => {
  const { data, error } = useSuspenseQuery({
    queryKey: ['product', 'options', productId],
    queryFn: () => fetchProductOptions(productId),
  });

  return { data, error };
};
