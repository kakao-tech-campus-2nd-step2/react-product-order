import { css } from '@emotion/css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import NumberField from '@/components/common/Form/Input/NumberField';
import LoadingUI from '@/components/common/LoadingUI';
import Header from '@/components/features/Header';
import AuthContext from '@/context/AuthContext';
import type { ProductDetailData } from '@/entities/Product';
import useData from '@/hooks/useData';
import { orderHistoryStorage } from '@/lib/storage';

import ProductDetail from './ProductDetail';
import { PriceBox, SelectOption } from './PurchaseComps';

export default () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { productId } = useParams();
    const navigate = useNavigate();
    const productDetail = useData<ProductDetailData>(`/products/${productId}/detail`);

    const [count, setCount] = useState<number>(1);
    const onClick = () => {
        if (!isAuthenticated) {
            if (confirm('로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?'))
                navigate('/login');
            return;
        }

        orderHistoryStorage.set({ productId: Number(productId), productQuantity: count });
        navigate('/order');
    };
    useEffect(() => {
        if (productDetail?.httpStatusCode !== 200) navigate('/');
    }, [productDetail?.httpStatusCode, navigate]);

    if (productDetail?.isLoading) return <LoadingUI />;

    return (
        <div>
            <Header />
            <div className={layout}>
                <section>
                    <ProductDetail
                        imageURL={productDetail!.data!.detail.imageURL}
                        productName={productDetail!.data!.detail.name}
                        price={productDetail!.data!.detail.price.sellingPrice}
                    />
                </section>
                <section className={purchaseLayout}>
                    <SelectOption>
                        {/* TODO 옵션 반영 */}
                        <NumberField setValue={setCount} />
                    </SelectOption>
                    <div>
                        <PriceBox>
                            <p>총 결제 금액</p>
                            <p>{productDetail!.data!.detail.price.sellingPrice * count}원</p>
                        </PriceBox>
                        <Button theme="black" onClick={onClick}>
                            나에게 선물하기
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
};

const layout = css`
    display: flex;
    > * {
        margin: 10px;
    }
`;
const purchaseLayout = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
