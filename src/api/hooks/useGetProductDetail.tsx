import { useEffect, useState } from 'react';

import type { ProductDetailData } from '@/types';

import { fetchInstance } from '../instance';

export type ProductDetailResponse = {
  detail: ProductDetailData;
};

const getProductDetailPath = (productId: string) =>
	`/v1/products/${productId}/detail`;
  
  export const getProductDetail = async (productId: string) => {
	const response = await fetchInstance.get<ProductDetailResponse>(
	  getProductDetailPath(productId),
	);
	return response.data;
  };

export const useGetProductDetail = (productId: string) => {
	const [data, setData] = useState<ProductDetailResponse | undefined>();
	const [isLoading, setLoading] = useState(true);
	const [isError, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(false);
				const response = await getProductDetail(productId);

				setData(response);
				setLoading(false);
			} catch {
				setError(true);
				setData(undefined);
			}
		};

		fetchData();
	}, [productId]);

	return {
		data,
		isLoading,
		isError,
	};
};