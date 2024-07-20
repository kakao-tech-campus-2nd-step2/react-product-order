import type { GoodsData, ThemeData } from '@/types';

import { fetchInstance } from '../instance';
import API from '../path';

export type ThemeResponseData = {
  themes: ThemeData[];
};

export type ThemeProductsRequestParams = {
  themeKey: string;
  pageToken?: string;
  maxResults?: number;
};

export type ThemesProductsResponseData = {
  products: GoodsData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export const getThemes = async () => {
  const response = await fetchInstance.get<ThemeResponseData>(API.THEME.GET_THEME);
  return response.data;
};

export const getThemesProducts = async (params: ThemeProductsRequestParams) => {
  const response = await fetchInstance.get<ThemesProductsResponseData>(
    API.THEME.GET_THEME_PRODUCTS(params),
  );
  return response.data;
};
