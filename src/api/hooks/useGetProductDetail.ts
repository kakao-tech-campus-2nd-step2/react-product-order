import { useEffect,useState } from "react";

import { useFetchData } from "@/hooks/useFetchData";
import type { ProductDetailResponseData } from "@/types";

const getProductDetailPath = ({ productId }: { productId: number }) =>
  `v1/products/${productId}/detail`;

export const useGetProductDetail = () => {
  const [notFound, setNotFound] = useState(false);
  const { data, loading, error } = useFetchData<ProductDetailResponseData>(
    (productId) => getProductDetailPath({ productId })
  );

  useEffect(() => {
    if (!loading && !data) {
      setNotFound(true);
    }
  }, [loading, data]);

  return {
    productDetail: data?.detail || null,
    loading,
    error,
    notFound
  };
};