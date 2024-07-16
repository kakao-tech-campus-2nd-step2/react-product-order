import { css } from '@emotion/css';
import { useState } from 'react';

import NumberField from '@/components/common/Form/Input/NumberField';
import Header from '@/components/features/Header';

import ProductDetail from './ProductDetail';

export default () => {
    //TODO fetch data
    const price = 1000;
    const [count, setCount] = useState<number>(1);

    return (
        <div>
            <Header />
            <div className={layout}>
                <section>
                    <ProductDetail
                        imageURL="https://st.kakaocdn.net/product/gift/product/20230823153529_37aa37bcef074955ab6548f7fc799c18.jpg"
                        productName={'product name'}
                        price={price}
                    />
                </section>
                <section className={purchaseLayout}>
                    <div className={selectOptionStyle}>
                        {/* TODO 옵션 반영 */}
                        <NumberField setValue={setCount} />
                    </div>
                    <div className={priceStyle}>
                        <p>총 결제 금액</p>
                        <p>{price * count}원</p>
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
const selectOptionStyle = css`
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
`;
const priceStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    border-radius: 5px;
    background-color: #eee;
    p:first-child {
        font-size: 15px;
        font-weight: 600;
    }
    p:last-child {
        font-size: 20px;
        font-weight: 700;
    }
`;
