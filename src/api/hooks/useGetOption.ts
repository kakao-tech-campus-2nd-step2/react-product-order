import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { fetchInstance } from '../instance';

export const useCurrentOption = (productKey: string) => {
  const getOptionPath = `/v1/products/${productKey}/options`;
  const optionQueryKey = [getOptionPath];
  const getOption = async () => {
    const response = await fetchInstance.get(getOptionPath);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: optionQueryKey,
    queryFn: getOption,
  });

  const isRender = useMemo(() => {
    if (isLoading || isError) return false;
    if (!data) return false;
    return true;
  }, [data, isLoading, isError]);

  const currentOption = data;

  return {
    isRender,
    currentOption,
  };
};
