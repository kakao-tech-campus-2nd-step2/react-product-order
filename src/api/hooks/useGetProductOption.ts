import { useFetchData } from "@/hooks/useFetchData";
import type { ProductOptionData } from "@/types";

const getProductOptionPath = ({ productId }: { productId: number }) =>
  `/api/v1/products/${productId}/options`;

export const useGetProductOptions = () => {
  const { data, loading, error } = useFetchData<ProductOptionData>(
    (productId) => getProductOptionPath({ productId })
  );

  return {
    productOptions: data?.options || [],
    loading,
    error
  };
};