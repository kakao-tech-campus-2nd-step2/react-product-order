import { useMemo } from 'react';

import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';

type Props = { productId: string };

export const useProductOptions = ({ productId }: Props) => {
  const { data, isLoading, isError } = useGetProductOptions({ productId });

  const isRender = useMemo(() => {
    if (isLoading || isError) return false;
    if (!data) return false;
    return true;
  }, [data, isLoading, isError]);

  const productOptions = data?.options || [];

  return {
    isRender,
    productOptions,
  };
};
