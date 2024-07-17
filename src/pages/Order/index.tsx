import { css } from '@emotion/css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import Header from '@/components/features/Header';
import { orderHistoryStorage } from '@/lib/storage';

import InputMsg from './InputMsg';
import OrderDetail from './OrderDetail';
import PaymentInfo from './PaymentInfo';

export default () => {
    const orderHistory = orderHistoryStorage.get();
    const navigate = useNavigate();

    useEffect(() => {
        if (!orderHistory) {
            alert('주문 내역이 없습니다.');
            navigate('/', { replace: true });
        }
    }, [navigate, orderHistory]);

    if (!orderHistory) return <div></div>;
    // TODO fetch data
    // TODO post data 이후 orderHIstory 삭제
    return (
        <div>
            <Header />
            <form>
                <div className={gridStyle}>
                    <div>
                        <InputMsg />
                        <div className={dividerStyle} />
                        <OrderDetail
                            imageURL={
                                'https://st.kakaocdn.net/product/gift/product/20230823153529_37aa37bcef074955ab6548f7fc799c18.jpg'
                            }
                            productName={'product'}
                            brandName={'brand'}
                            quantity={orderHistory!.productQuantity}
                        />
                    </div>
                    <div className={layout1}>
                        {/* TODO price 가져오기 및 적용 */}
                        <PaymentInfo price={1000 * orderHistory!.productQuantity} />
                        <Button type="submit">
                            {1000 * orderHistory!.productQuantity}원 결제하기
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

const gridStyle = css`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
    }
`;
const layout1 = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
`;

const dividerStyle = css`
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    height: 10px;
    background-color: #f9f9f9;
`;
