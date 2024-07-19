import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Products } from '@/api/products/types';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

export interface IOrderItemInfo extends Products.PaymentThumbnail {
  cnt: string;
}

export const useProductPreReceipt = (
  productName: string,
  currentProductInfo: Products.PaymentThumbnail,
) => {
  const [cntMap, setCntMap] = useState(
    new Map<string, IOrderItemInfo>().set(productName, { ...currentProductInfo, cnt: '1' }),
  );
  const authInfo = useAuth();
  const navigate = useNavigate();

  const totalPriceMemo = useMemo(
    () => [...cntMap.values()].reduce((total, { price, cnt }) => total + price * parseInt(cnt), 0),
    [cntMap],
  );

  const setProductCnt = useCallback(
    (name: string, newCnt: string) => {
      setCntMap((prev) => {
        const newMap = structuredClone(prev);
        return newMap.set(name, { ...newMap.get(name), cnt: newCnt });
      });
    },
    [setCntMap],
  );

  const onClick = useCallback(() => {
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
  }, [authInfo, cntMap, productName]);

  return { totalPriceMemo, setProductCnt, onClick };
};
