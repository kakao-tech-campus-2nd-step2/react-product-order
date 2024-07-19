import { useMemo } from 'react';

import { useGetProductsDetail } from '@/api/hooks/useGetProductDetail';

type Props = { productId: string };

export const useCurrentProduct = ({ productId }: Props) => {
    const { data, isLoading, isError } = useGetProductsDetail({ productId: productId });

    const isRender = useMemo(() => {
        if (!data && isError) return true;
        if (isLoading || isError) return false;
        if (!data) return false;
        return true;
    }, [data, isLoading, isError]);

    const currentProduct = useMemo(() => {
        return data?.detail?.isAccessableProductPage ?? false;
    }, [data]);

    return {
        isRender,
        currentProduct
    };
};
