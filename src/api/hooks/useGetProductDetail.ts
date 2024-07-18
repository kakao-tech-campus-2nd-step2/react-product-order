import { useEffect,useState } from "react";

import type { ProductDetailData, ProductDetailResponseData } from "@/types";

import { fetchInstance } from "../instance";

const getProductDetailPath = ({ productId }: { productId: number }) =>
  `v1/products/${productId}/detail`;

export const getProductDetail = async (productId: number): Promise<ProductDetailData> => {
  const response = await fetchInstance.get<ProductDetailResponseData>(getProductDetailPath({ productId }));
  return response.data.detail;
};

export const useGetProductDetail = (productId: number) => {
  const [productDetail, setProductDetail] = useState<ProductDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await getProductDetail(productId);
        setProductDetail(data);
      } catch (err) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  return { productDetail, loading, error };
};