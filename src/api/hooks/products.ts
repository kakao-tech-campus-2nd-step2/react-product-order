//react-query에서 사용하는 라이브러리
import { useQuery } from '@tanstack/react-query';

//제품 옵션 데이터를 정의
import type { ProductOptionsData } from '@/types';

//서버와 통신하기 위한 axios 인스턴스
import { fetchInstance } from '../instance';

//제품 옵션 데이터를 가져오는 비동기 함수
export const getProductOptions = async (
  productId: string,
  options?: string,
): Promise<ProductOptionsData> => {
  const response = await fetchInstance.get<ProductOptionsData>(
    `/v1/products/${productId}/options`,
    {
      params: options,
    },
  );
  return response.data;
};

//useQuery를 사용해서 데이터를 가져옴.
export const useGetProductOptions = (productId: string, options?: string) => {
  return useQuery<ProductOptionsData, Error>({
    queryKey: ['productOptions', productId, options],
    queryFn: () => getProductOptions(productId, options),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};

// option 항목을 추가함으로써 유연하게 대응할 수 있음.
