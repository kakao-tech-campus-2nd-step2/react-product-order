import { useParams } from 'react-router-dom';

import type { GoodsDetailRequestParams } from '@/api/hooks/useGetProductsDetail';
import { GoodsDetail } from '@/components/features/GoodsDetail/';
export const GoodsDetailPage = () => {
  const { productId = '' } = useParams<GoodsDetailRequestParams>();

  return <GoodsDetail productId={productId} />;
};
