import axios from 'axios';
import { useQuery } from 'react-query';

type ProductOption = {
  id: number;
  name: string;
  additionalPrice: number;
};

const fetchProductOptions = async (productId: number): Promise<ProductOption[]> => {
  const response = await axios.get(`/v1/products/${productId}/options`);
  return response.data;
};

export const useGetProductOptions = (productId: number) => {
  return useQuery<ProductOption[], Error>(['productOptions', productId], () => fetchProductOptions(productId));
};
