import { css } from '@emotion/css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import NumberField from '@/components/common/Form/Input/NumberField';
import Header from '@/components/features/Header';
import AuthContext from '@/context/AuthContext';

import ProductDetail from './ProductDetail';
import { PriceBox, SelectOption } from './PurchaseComps';

export default () => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    //TODO fetch data
    const price = 1000;
    const [count, setCount] = useState<number>(1);
    const onClick = () => {
        if (
            !isAuthenticated &&
            confirm('로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?')
        )
            navigate('/login');
        //TODO localStorage에 구매목록 저장 (orderHistory -> id, count)
        //TODO order 페이지로 이동
    };

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
                    <SelectOption>
                        {/* TODO 옵션 반영 */}
                        <NumberField setValue={setCount} />
                    </SelectOption>
                    <div>
                        <PriceBox>
                            <p>총 결제 금액</p>
                            <p>{price * count}원</p>
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
