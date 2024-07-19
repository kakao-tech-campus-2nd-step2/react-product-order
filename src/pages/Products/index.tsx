import { useSuspenseQuery } from '@tanstack/react-query';

import { getProductDetailById } from '@/api/instance/apis';
import type { Products } from '@/api/products/types';
import { ProductInfo } from '@/components/features/Products/organisms/ProductInfo';
import { ProductReceipt } from '@/components/features/Products/organisms/ProductReceipt';
import { ProductTemplate } from '@/components/templates/ProductTemplate';

export interface IProductPage {
  productKey: string;
}

export const ProductPage = ({ productKey }: IProductPage) => {
  const { data, isError } = useSuspenseQuery({
    queryKey: ['productDetail', productKey],
    queryFn: () => getProductDetailById(productKey),
  });

  if (isError) {
    throw new Error();
  }

  const product: Products.ProductDetailData = data?.detail;
  const currentProductInfo = {
    price: product.price.sellingPrice,
    key: product.name,
    brandName: product.brandInfo.name,
    imageUrl: product.imageURL,
  } as Products.PaymentThumbnail;

  return (
    <ProductTemplate
      leftMain={<ProductInfo product={product} />}
      rightSide={<ProductReceipt productKey={productKey} currentProductInfo={currentProductInfo} />}
    />
  );
};
