import { css } from '@emotion/css';

import { Image } from '@/components/common/Image';

interface Props {
    imageURL: string;
    productName: string;
    brandName: string;
    quantity: number;
}

export default ({ imageURL, productName, brandName, quantity }: Props) => {
    return (
        <section
            className={css`
                margin: 20px;
            `}
        >
            <h2 className={h2Style}>선물내역</h2>
            <div className={detailStyle}>
                <Image src={imageURL} alt="상품 사진" />
                <div>
                    <p>{brandName}</p>
                    <h3>
                        {productName} X {quantity}개
                    </h3>
                </div>
            </div>
        </section>
    );
};

const h2Style = css`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;
const detailStyle = css`
    display: flex;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 10px;
    img {
        max-width: 80px;
        margin-right: 20px;
        border: 1px solid #eee;
    }
    p {
        font-size: 15px;
        color: #666;
    }
    h3 {
        font-size: 17px;
        font-weight: 600;
    }
`;
