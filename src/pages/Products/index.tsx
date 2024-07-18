import { Box, Divider, Flex, Image } from '@chakra-ui/react';
import { QueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query';

import { getProductDetailById } from '@/api/hooks/useProductDetail';
import type { Products } from '@/api/products/types';
import { EbSusBoundary } from '@/components/common/EbSusBoundary';
import { Spinner } from '@/components/common/Spinner';
import { Name } from '@/components/features/Products/Name';
import { Notice } from '@/components/features/Products/Notice';
import { PreReceipt } from '@/components/features/Products/PreReceipt';
import { Price } from '@/components/features/Products/Price';
import { ProductTemplate } from '@/components/templates/ProductTemplate';

const tempNotice = '카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!';

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
      leftMain={
        <Flex maxWidth="900px">
          <Image
            src={product.imageURL}
            alt={product.name}
            objectFit="cover"
            objectPosition="center"
            maxWidth="450px"
            maxHeight="450px"
          />
          <Box width="100%" pl={{ base: 0, sm: 6 }}>
            <Name title={product.name} />
            <Price price={product.price.sellingPrice} />
            <Divider color="#f5f5f5" />
            <Notice notice={tempNotice} />
            <Divider color="#f5f5f5" />
          </Box>
        </Flex>
      }
      rightSide={
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <EbSusBoundary
              ebFallback={<button onClick={() => reset()}>다시 시도하기</button>}
              susFallback={<Spinner />}
            >
              <PreReceipt productKey={productKey} currentProductInfo={currentProductInfo} />
            </EbSusBoundary>
          )}
        </QueryErrorResetBoundary>
      }
    />
  );
};
