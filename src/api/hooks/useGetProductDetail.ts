import { useEffect, useState } from 'react';

import { fetchInstance } from '../instance';

type RequestParams = {
    productId: string;
};

import { ProductsData } from '@/types';

const getProductsDetailPath = ({ productId }: RequestParams) => {
    const params = new URLSearchParams();
    return `/v1/products/${productId}/detail?${params.toString()}`;
};

export const getProductsDetail = async (params: RequestParams) => {
    const response = await fetchInstance.get<ProductsData>(
        getProductsDetailPath(params),
    );
    return response.data;
};

export const useGetProductsDetail = ({ productId }: RequestParams) => {
    const [data, setData] = useState<ProductsData | undefined>();
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await getProductsDetail({ productId });

                setData(response);
                setLoading(false);
            } catch {
                setError(true);
                setLoading(false);
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
}