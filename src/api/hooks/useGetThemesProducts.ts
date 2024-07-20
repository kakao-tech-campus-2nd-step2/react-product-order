import {
  type InfiniteData,
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { ThemeProductsRequestParams, ThemesProductsResponseData } from '../apis/theme';
import { getThemesProducts } from '../apis/theme';

type Params = Pick<ThemeProductsRequestParams, 'maxResults' | 'themeKey'> & {
  initPageToken?: string;
};
export const useGetThemesProducts = ({
  themeKey,
  maxResults = 20,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<ThemesProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['themesProducts', themeKey, maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getThemesProducts({ themeKey, pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
