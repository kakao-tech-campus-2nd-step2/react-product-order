import NumberField from '@/components/common/Form/Input/NumberField';
import LoadingUI from '@/components/common/LoadingUI';
import type { ProductOptions } from '@/entities/ProductOptions';
import useData from '@/hooks/useData';

import { SelectOption } from './PurchaseComps';

export default ({
    setCount,
    productId,
}: {
    setCount: (count: number) => void;
    productId: string | undefined;
}) => {
    const productOptions = useData<ProductOptions>(`products/${productId}/options`);

    if (productOptions?.isLoading) return <LoadingUI />;

    return (
        <SelectOption>
            {/* TODO 옵션 반영 */}
            <NumberField
                setValue={setCount}
                maxValue={productOptions?.data?.options.giftOrderLimit}
            />
        </SelectOption>
    );
};
