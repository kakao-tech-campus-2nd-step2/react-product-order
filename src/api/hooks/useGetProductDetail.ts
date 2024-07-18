import { useQuery } from "@tanstack/react-query";

import type { GoodsData } from "@/types";

import { fetchInstance } from "../instance";

type AnnouncementsData = {
  name: string;
  value: string;
  displayOrder: number;
};

type TermsData = {
  displayCode: string;
  title: string;
  description: string;
};

type ProductDetailData = GoodsData & {
  isAccessableProductPage: boolean;
  review: {
    averageRating: number;
    totalReviewCount: number;
  };
  productDescription: {
    displayImage: string;
  };
  productDetailInfo: {
    announcements: AnnouncementsData[];
    terms: TermsData[];
  };
};

export type ProductDetailResponseData = {
  detail: ProductDetailData;
};

const getProductDetailPath = (productId: string) => {
  return `/v1/products/${productId}/detail`;
};

const getProductDetail = async (productId: string) => {
  const response = await fetchInstance.get<ProductDetailResponseData>(
    getProductDetailPath(productId),
  );
  return response.data;
};

export const useGetProductDetail = (productId: string) => {
  return useQuery<ProductDetailResponseData, Error>({
    queryKey: ["productsDetail", productId],
    queryFn: () => getProductDetail(productId),
  });
};
