import React from 'react';
import { useParams } from 'react-router-dom';

import type { GoodsDetailRequestParams } from '@/api/hooks/useGetGoodsDetail';
import { SplitLayout } from '@/components/common/layouts/SplitLayout';
import { LoadingView } from '@/components/common/LoadingView/LoadingView';
import { SuspenseBoundary } from '@/components/common/SuspenseBoundary';
import { GoodsDetail } from '@/components/features/Goods';
import { OptionSection } from '@/components/features/Goods/OptionSection';

export const GoodsDetailPage = () => {
  const { productId = '' } = useParams<GoodsDetailRequestParams>();

  return (
    <React.Fragment>
      <SuspenseBoundary pendingFallback={<LoadingView />} rejectedFallback={<div>에러 페이지</div>}>
        <SplitLayout sidebar={<OptionSection productId={productId} />}>
          <GoodsDetail productId={productId} />
        </SplitLayout>
      </SuspenseBoundary>
    </React.Fragment>
  );
};
