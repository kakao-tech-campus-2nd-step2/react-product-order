import { QueryErrorResetBoundary } from '@tanstack/react-query';

import type { Products } from '@/api/products/types';
import { EbSusBoundary } from '@/components/common/EbSusBoundary';
import { Spinner } from '@/components/common/Spinner';
import { ProductPreReceipt } from '@/components/features/Products/organisms/ProductPreReceipt';

export interface IProductReceipt {
  productKey: string;
  currentProductInfo: Products.PaymentThumbnail;
}

export const ProductReceipt = ({ productKey, currentProductInfo }: IProductReceipt) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <EbSusBoundary
        ebFallback={<button onClick={() => reset()}>다시 시도하기</button>}
        susFallback={<Spinner />}
      >
        <ProductPreReceipt productKey={productKey} currentProductInfo={currentProductInfo} />
      </EbSusBoundary>
    )}
  </QueryErrorResetBoundary>
);
