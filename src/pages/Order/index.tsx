import { css } from '@emotion/css';

import Header from '@/components/features/Header';

import InputMsg from './InputMsg';
import OrderDetail from './OrderDetail';

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
                    <div></div>
                </div>
            </form>
        </div>
    );
};

const gridStyle = css`
    display: grid;
    grid-template-columns: 2fr 1fr;
`;

const dividerStyle = css`
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    height: 10px;
    background-color: #f9f9f9;
`;
