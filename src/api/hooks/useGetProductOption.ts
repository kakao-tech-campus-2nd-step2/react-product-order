import { useFetchData } from "@/hooks/useFetchData";
import type { ProductOptionData } from "@/types";

const getProductOptionPath = ({ productId }: { productId: number }) =>
  `/v1/products/${productId}/options`;

export const useGetProductOptions = () => {
  const { data, loading, error } = useFetchData<ProductOptionData>(
    (productId) => getProductOptionPath({ productId })
  );

  return {
    productOption: data || null,
    loading,
    error
  };
};