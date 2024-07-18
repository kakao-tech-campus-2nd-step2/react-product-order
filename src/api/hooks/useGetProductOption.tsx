import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import type { ProductOptionData } from '@/types';
import createErrorMessage from '@/utils/createErrorMessage';

import { fetchInstance } from '../instance';

export type ProductOptionsResponse = {
  productId: number;
  productName: string;
  productPrice: number;
  hasOption: boolean;
  giftOrderLimit: number;
  names: string[];
  options: ProductOptionData[];
};

const fetchProductOption = async (productId: string) => {
	try {
		const response = await fetchInstance.get<ProductOptionsResponse>(
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


export const useGetProductOption = (productId: string) => {
	const query = useQuery<ProductOptionsResponse, Error>(
		['productDetail', productId],
		() => fetchProductOption(productId),
	);

	return [query.data, { loading: query.isLoading, errorMessage: query.error?.message }] as const;
};


// const getProductOptionsPath = (productId: string) => `/v1/products/${productId}/options`;

// export const getProductOptions = async (productId: string) => {
//   const response = await fetchInstance.get<ProductOptionsResponse>(getProductOptionsPath(productId));
//   return response.data;
// };

// export const useGetProductOptions = (productId: string) => {
//   const [data, setData] = useState<ProductOptionsResponse | undefined>();
//   const [isLoading, setLoading] = useState(true);
//   const [isError, setError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(false);
//         const response = await getProductOptions(productId);
//         setData(response);
//         setLoading(false);
//       } catch (error) {
//         setError(true);
//         setData(undefined);
//       }
//     };

//     fetchData();
//   }, [productId]);

//   return {
//     data,
//     isLoading,
//     isError,
//   };
// };

// export default useGetProductOptions;