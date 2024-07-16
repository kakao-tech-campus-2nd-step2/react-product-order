import { useParams } from 'react-router-dom';

import type { GoodsDetailRequestParams } from '@/api/hooks/useGetGoodsDetail';
import { SplitLayout } from '@/components/common/layouts/SplitLayout';
import { GoodsDetail } from '@/components/features/Goods';
import { OptionSection } from '@/components/features/Goods/OptionSection';

export const GoodsDetailPage = () => {
  const { productId = '' } = useParams<GoodsDetailRequestParams>();

  return (
    <SplitLayout sidebar={<OptionSection productId={productId} />}>
      <GoodsDetail productId={productId} />
    </SplitLayout>
  );
};
