import { useQuery } from '@tanstack/react-query';

import { getThemes } from '../apis/theme';
import API from '../path';

export const useGetThemes = () =>
  useQuery({
    queryKey: [API.THEME.GET_THEME],
    queryFn: getThemes,
  });
