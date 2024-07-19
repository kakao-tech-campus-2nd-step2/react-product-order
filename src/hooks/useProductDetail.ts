import { useMemo } from 'react';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';

type Props = { productId: string };

export const useProductDetail = ({ productId }: Props) => {
  const { data, isLoading, isError } = useGetProductDetail({ productId });

  const isRender = useMemo(() => {
    if (isLoading || isError) return false;
    if (!data) return false;
    return true;
  }, [data, isLoading, isError]);

  const currentProduct = data?.detail || null;

  return {
    isRender,
    currentProduct,
  };
};
