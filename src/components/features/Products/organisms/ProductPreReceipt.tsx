import { Box } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getProductOptionsById } from '@/api/instance/apis';
import type { Products } from '@/api/products/types';
import { PreReceiptButton } from '@/components/features/Products/atoms/PreReceiptButton';
import { ReceiptPrice } from '@/components/features/Products/atoms/ReceiptPrice';
import { ReceiptItem } from '@/components/features/Products/molecules/ReceiptItem';
import type { IProductPage } from '@/pages/Products';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

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
  const [cntMap, setCntMap] = useState(
    new Map().set(productName, { ...currentProductInfo, cnt: '1' }),
  );
  const authInfo = useAuth();
  const navigate = useNavigate();

  /**
   * TODO: UI 관련 없는 부분 다 훅으로
   */

  const totalPriceMemo = useMemo(() => {
    let totalPrice = 0;
    for (const [, value] of cntMap) {
      const { price, cnt } = value;
      const cntInt = parseInt(cnt);
      totalPrice += price * cntInt;
    }
    return totalPrice;
  }, [cntMap]);

  if (isError || (!isLoading && !data)) {
    throw new Error();
  }

  const setProductCnt = (name: string, newCnt: string) => {
    setCntMap((prev) => {
      const newMap = structuredClone(prev);
      return newMap.set(name, { ...newMap.get(name), cnt: newCnt });
    });
  };

  const onClick = () => {
    if (!authInfo) {
      const answer = confirm('로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?');
      if (answer) {
        navigate(getDynamicPath.login());
      }
      return;
    }
    navigate(RouterPath.order, {
      state: { cntMap, defaultKey: productName, totalPrice: totalPriceMemo },
    });
  };

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
        onChange={setProductCnt}
      />
      <Box pt="12px">
        <ReceiptPrice price={totalPriceMemo} />
        <PreReceiptButton onClick={onClick} />
      </Box>
    </Box>
  );
};
