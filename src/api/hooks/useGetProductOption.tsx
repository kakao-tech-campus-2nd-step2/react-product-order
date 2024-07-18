import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import type { ProductOptionData } from '@/types';
import createErrorMessage from '@/utils/createErrorMessage';

import { fetchInstance } from '../instance';

export type ProductOptionsResponse = {
  options: ProductData;
};

export type ProductData = {
  productId: number;
  productName: string;
  productPrice: number;
  hasOption: boolean;
  giftOrderLimit: number;
  names: string[];
  options: ProductOptionData[];
}

const fetchProductOption = async (productId: string) => {
	try {
		const response = await fetchInstance.get<ProductOptionsResponse>(
			`/v1/products/${productId}/options`,
		);
		return response.data;
	} catch (err) {
		const error = err as AxiosError;
		const errorMessage = error instanceof AxiosError ? createErrorMessage(error.response) : 'An unknown error occurred';
		console.error(errorMessage);
		throw new Error(errorMessage);
	}
};


export const useGetProductOption = (productId: string) => {
  const query = useQuery<ProductOptionsResponse, Error>(
    ['productDetail', productId],
    () => fetchProductOption(productId),
  );

  return { data: query.data, loading: query.isLoading, errorMessage: query.error?.message };
};