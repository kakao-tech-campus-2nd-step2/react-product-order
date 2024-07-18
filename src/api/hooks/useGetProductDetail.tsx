import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import type { ProductDetailData } from '@/types';
import createErrorMessage from '@/utils/createErrorMessage';

import { fetchInstance } from '../instance';

export type ProductDetailResponse = {
	detail: ProductDetailData;
};


const fetchProductDetail = async (productId: string) => {
	try {
		const response = await fetchInstance.get<ProductDetailResponse>(
			`/v1/products/${productId}/detail`,
		);
		return response.data;
	} catch (err) {
		const error = err as AxiosError;
		const errorMessage = error instanceof AxiosError ? createErrorMessage(error.response) : 'An unknown error occurred';
		console.error(errorMessage);
		throw new Error(errorMessage);
	}
};


export const useGetProductDetail = (productId: string) => {
	const query = useQuery<ProductDetailResponse, Error>(
		['productDetail', productId],
		() => fetchProductDetail(productId),
	);

	return [query.data, { loading: query.isLoading, errorMessage: query.error?.message }] as const;
};
