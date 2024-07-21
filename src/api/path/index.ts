import type { RankingFilterOption } from '@/types';

import type { ThemeProductsRequestParams } from '../apis/theme';

const PRODUCT = {
  OPTION: (productId: string) => `/v1/products/${productId}/options`,
  DETAIL: (productId: string) => `/v1/products/${productId}/detail`,
  RANKING: ({ targetType, rankType }: RankingFilterOption) =>
    `/v1/ranking/products?targetType=${targetType}&rankType=${rankType}`,
} as const;

const THEME = {
  GET_THEME: '/v1/themes',
  GET_THEME_PRODUCTS: ({ themeKey, pageToken, maxResults }: ThemeProductsRequestParams) => {
    const params = new URLSearchParams();
    if (pageToken) params.append('pageToken', pageToken);
    if (maxResults) params.append('maxResults', maxResults.toString());
    return `/v1/themes/${themeKey}/products?${params.toString()}`;
  },
} as const;

const ORDER = {
  POST_ORDER: '/v1/themes',
} as const;

const API = {
  PRODUCT,
  THEME,
  ORDER,
} as const;

export default API;
