import { useEffect, useState } from 'react';

import { fetchInstance } from '../instance';

type RequestParams = {
    productId: string;
};

import { ProductOptionData } from '@/types';



const getProductsOptionPath = ({ productId }: RequestParams) => {
    const params = new URLSearchParams();
    return `/v1/products/${productId}/options?${params.toString()}`;
};

export const getProductsOption = async (params: RequestParams) => {
    const response = await fetchInstance.get<ProductOptionData>(
        getProductsOptionPath(params),
    );
    console.log(response.data);
    return response.data;
};

export const useGetProductsOption = ({ productId }: RequestParams) => {
    const [dataOption, setDataOption] = useState<ProductOptionData | undefined>();
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await getProductsOption({ productId });

                setDataOption(response);
                setLoading(false);
            } catch {
                setError(true);
                setLoading(false);
                setDataOption(undefined);
            }
        };

        fetchData();
    }, [productId]);

    return {
        dataOption,
        isLoading,
        isError,
    };
}