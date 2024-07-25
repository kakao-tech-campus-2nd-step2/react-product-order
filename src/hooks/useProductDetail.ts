import { useMemo } from 'react';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';

type Props = { productId: string };

export const useProductDetail = ({ productId }: Props) => {
  const { data, isSuccess } = useGetProductDetail({ productId });

  const isRender = useMemo(() => isSuccess, [isSuccess]);

  const currentProduct = data?.detail || null;

  return {
    isRender,
    currentProduct,
  };
};
