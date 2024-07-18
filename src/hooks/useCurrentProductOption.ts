import { useMemo } from 'react';

import { useGetProductsOption } from '@/api/hooks/useGetProductOption';

type Props = { productId: string };

export const useCurrentProductOption = ({ productId }: Props) => {
    const { dataOption, isLoading, isError } = useGetProductsOption({ productId: productId });

    const isRender = useMemo(() => {
        if (!dataOption && isError) return true;
        if (isLoading || isError) return false;
        if (!dataOption) return false;
        return true;
    }, [dataOption, isLoading, isError]);

    const currentProduct = useMemo(() => {
        return dataOption?.options.hasOption ?? false;
    }, [dataOption]);

    return {
        isRender,
        currentProduct
    };
};