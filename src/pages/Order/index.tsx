import { css } from '@emotion/css';

import { Button } from '@/components/common/Button';
import Header from '@/components/features/Header';

import InputMsg from './InputMsg';
import OrderDetail from './OrderDetail';
import PaymentInfo from './PaymentInfo';

export default () => {
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
                            quantity={1}
                        />
                    </div>
                    <div className={layout1}>
                        {/* TODO price 가져오기 및 적용 */}
                        <PaymentInfo />
                        <Button type="submit">1000원 결제하기</Button>
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
