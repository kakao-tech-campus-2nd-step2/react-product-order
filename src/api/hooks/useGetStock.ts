import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchInstance } from "../instance";

export const useGetStockInfo = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const [maxQty, setMaxQty] = useState<number>();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetchInstance(`/v1/products/${productId}/options`);
        setMaxQty(response.data.options.giftOrderLimit);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStocks();
  }, [productId]);

  return maxQty;
}