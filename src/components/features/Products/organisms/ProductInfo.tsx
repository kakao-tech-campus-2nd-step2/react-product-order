import { Box, Divider, Image } from '@chakra-ui/react';
import { Fragment } from 'react';

import type { Products } from '@/api/products/types';
import { Name } from '@/components/features/Products/atoms/Name';
import { Notice } from '@/components/features/Products/atoms/Notice';
import { Price } from '@/components/features/Products/atoms/Price';

export interface IProductInfo {
  product: Products.ProductDetailData;
}

const tempNotice = '카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!';

export const ProductInfo = ({ product }: IProductInfo) => (
  <Fragment>
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
  </Fragment>
);
