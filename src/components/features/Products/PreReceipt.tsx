import { Box, Button } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getProductOptionsById } from '@/api/hooks/useProductDetail';
import type { Products } from '@/api/products/types';
import { ReceiptItem } from '@/components/features/Products/ReceiptItem';
import { ReceiptPrice } from '@/components/features/Products/ReceiptPrice';
import type { IProductPage } from '@/pages/Products';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath } from '@/routes/path';

export interface IPreReceipt extends IProductPage {}

export const PreReceipt = ({ productKey }: IPreReceipt) => {
  const { data, isError, isLoading } = useSuspenseQuery({
    queryKey: ['options', productKey],
    queryFn: () => getProductOptionsById(productKey),
  });
  const productName = data.options.productName;
  const productPrice = data.options.productPrice;
  const [cntMap, setCntMap] = useState(
    new Map().set(productName, { price: productPrice, cnt: '1' }),
  );
  const authInfo = useAuth();
  const navigate = useNavigate();
  const options: Products.ProductOption = data.options;

  /**
   * TODO: UI 관련 없는 부분 다 훅으로
   */
  const onClick = () => {
    if (!authInfo) {
      const answer = confirm('로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?');
      if (answer) {
        navigate(getDynamicPath.login());
      }
      return;
    }
    // navigate()
  };

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

  /**
   * 요청으로 받아오는 nested Options의 가격이 왜 다 0??
   */
  // const nestedOptions: Products.SmallOption[] = options?.options ?? [];

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
      {/*{nestedOptions.map((option) => (*/}
      {/*  <ReceiptItem*/}
      {/*    name={option.value}*/}
      {/*    value={option.price}*/}
      {/*    onChange={(str) => console.log(str)}*/}
      {/*  />*/}
      {/*))}*/}
      <Box pt="12px">
        <ReceiptPrice price={totalPriceMemo} />
        <Button
          padding={'0'}
          width="100%"
          backgroundColor="rgb(17, 17, 17)"
          colorScheme="blackAlpha"
          size="lg"
          onClick={onClick}
        >
          나에게 선물하기
        </Button>
      </Box>
    </Box>
  );
};
