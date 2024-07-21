import { useFetchData } from "@/hooks/useFetchData";
import type { ProductDetailResponseData } from "@/types";

const getProductDetailPath = ({ productId }: { productId: number }) =>
  `v1/products/${productId}/detail`;

export const useGetProductDetail = () => {
  const { data, loading, error, notFound } = useFetchData<ProductDetailResponseData>(
    (productId) => getProductDetailPath({ productId })
  );

  return {
    productDetail: data?.detail || null,
    loading,
    error,
    notFound
  };
};