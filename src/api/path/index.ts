import type { RankingFilterOption } from '@/types';

const PRODUCT = {
  OPTION: (productId: string) => `/v1/products/${productId}/options`,
  DETAIL: (productId: string) => `/v1/products/${productId}/detail`,
  RANKING: ({ targetType, rankType }: RankingFilterOption) =>
    `/v1/ranking/products?targetType=${targetType}&rankType=${rankType}`,
} as const;

const API = {
  PRODUCT,
} as const;

export default API;
