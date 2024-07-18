import { useMemo } from 'react';

import { useGetProductsOption } from '@/api/hooks/useGetProductOption';

type Props = { productId: string };

export const useCurrentProductOption = ({ productId }: Props) => {
    const { data, isLoading, isError } = useGetProductsOption({ productId: productId });

    const isRender = useMemo(() => {
        if (!data && isError) return true;
        if (isLoading || isError) return false;
        if (!data) return false;
        return true;
    }, [data, isLoading, isError]);

    const currentProduct = useMemo(() => {
        return data?.options.hasOption ?? false;
    }, [data]);

    return {
        isRender,
        currentProduct
    };
};