import { Image } from '@chakra-ui/react';
import { css } from '@emotion/css';

export default () => {
    return (
        <div className={containerStyle}>
            <Image
                src="https://st.kakaocdn.net/product/gift/product/20230823153529_37aa37bcef074955ab6548f7fc799c18.jpg"
                alt="Product"
            />
            <div className={detailStyle}>
                <h1>Product Name</h1>
                <p className={priceStyle}>1000원</p>
                <p className={msgStyle}>카톡 친구가 아니어도 선물코드로 선물할 수 있어요!</p>
            </div>
        </div>
    );
};

const containerStyle = css`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding: 20px;
    img {
        max-width: 450px;
    }
    @media (max-width: 768px) {
        flex-direction: column;
        img {
            margin: 0 auto;
        }
    }
`;
const detailStyle = css`
    padding: 20px;
    h1 {
        font-size: 24px;
    }
    * {
        margin-bottom: 20px;
    }
`;
const priceStyle = css`
    font-size: 26px;
    font-weight: 600;
`;
const msgStyle = css`
    margin-top: 50px;
    padding: 20px 10px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
`;
