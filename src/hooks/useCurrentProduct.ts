import { useMemo } from 'react';

import { useGetProductsDetail } from '@/api/hooks/useGetProductDetail';
import { getCurrentProduct } from '@/components/features/ProductDetail/MainProduct';

type Props = { productId: string };

export const useCurrentProduct = ({ productId }: Props) => {
    const { data, isLoading, isError } = useGetProductsDetail({ productId: productId });

    if (data) {
        console.log(data);
    }

    const isRender = useMemo(() => {
        if (isLoading || isError) return false;
        if (!data) return false;
        return true;
    }, [data, isLoading, isError]);

    const currentProduct = useMemo(() => {
        return data?.detail.isAccessableProductPage ?? false
    }, [data]);


    // const currentProduct = getCurrentProduct(data?.detail.isAccessableProductPage ?? '');

    return {
        isRender,
        currentProduct
    };
};