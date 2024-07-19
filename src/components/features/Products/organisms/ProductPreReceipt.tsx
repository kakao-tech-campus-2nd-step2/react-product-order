import { Box } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getProductOptionsById } from '@/api/instance/apis';
import type { Products } from '@/api/products/types';
import { PreReceiptButton } from '@/components/features/Products/atoms/PreReceiptButton';
import { ReceiptPrice } from '@/components/features/Products/atoms/ReceiptPrice';
import { ReceiptItem } from '@/components/features/Products/molecules/ReceiptItem';
import { useProductPreReceipt } from '@/hooks/useProductPreReceipt';
import type { IProductPage } from '@/pages/Products';

export interface IPreReceipt extends IProductPage {
  currentProductInfo: Products.PaymentThumbnail;
}

export const ProductPreReceipt = ({ productKey, currentProductInfo }: IPreReceipt) => {
  const { data, isError, isLoading } = useSuspenseQuery({
    queryKey: ['options', productKey],
    queryFn: () => getProductOptionsById(productKey),
  });
  const options: Products.ProductOption = data.options;
  const productName = options.productName;
  const productOrderLimit = options.giftOrderLimit;
  const { totalPriceMemo, setProductCnt, onClick } = useProductPreReceipt(
    productName,
    currentProductInfo,
  );

  if (isError || (!isLoading && !data)) {
    throw new Error();
  }

  return (
    <Box
      width="100%"
      p="0px 12px 30px 30px;"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <ReceiptItem
        name={options.productName}
        value={options.productPrice}
        maxValues={productOrderLimit}
        onChange={setProductCnt}
      />
      <Box pt="12px">
        <ReceiptPrice price={totalPriceMemo} />
        <PreReceiptButton onClick={onClick} />
      </Box>
    </Box>
  );
};
