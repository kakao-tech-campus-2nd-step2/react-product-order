import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";

import type { ProductDetailData, ProductDetailResponseData } from "@/types";

import { fetchInstance } from "../instance";

const getProductDetailPath = ({ productId }: { productId: number }) =>
  `v1/products/${productId}/detail`;

export const getProductDetail = async (productId: number): Promise<ProductDetailData> => {
  const response = await fetchInstance.get<ProductDetailResponseData>(getProductDetailPath({ productId }));
  return response.data.detail;
};

export const useGetProductDetail = () => {
  const [productDetail, setProductDetail] = useState<ProductDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const location = useLocation();
  const productId = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const data = await getProductDetail(Number(productId));
        setProductDetail(data);
      } catch (err) {
        setNotFound(true);
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  return { productDetail, loading, error, notFound };
};