import { css } from '@emotion/css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import LoadingUI from '@/components/common/LoadingUI';
import Header from '@/components/features/Header';
import type { OrderReq } from '@/entities/Order';
import type { ProductDetailData } from '@/entities/Product';
import useData from '@/hooks/useData';
import { orderHistoryStorage } from '@/lib/storage';

import InputMsg from './InputMsg';
import OrderDetail from './OrderDetail';
import PaymentInfo from './PaymentInfo';

export default () => {
    const orderHistory = orderHistoryStorage.get();
    const navigate = useNavigate();
    const productDetail = useData<ProductDetailData>(`/products/${orderHistory?.productId}/detail`);

    useEffect(() => {
        if (!orderHistory) {
            alert('주문 내역이 없습니다.');
            navigate('/', { replace: true });
            return;
        }
        if (productDetail?.httpStatusCode !== 200)
            navigate(`/error/${productDetail?.httpStatusCode}/order`, { replace: true });
    }, [navigate, orderHistory, productDetail?.httpStatusCode]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = Object.fromEntries(new FormData(event.currentTarget));
        if (formData.messageCardMessage === '') {
            alert('메세지를 입력해주세요.');
            return;
        }
        if (formData.hasCashReceipt !== undefined) {
            if (formData.cashReceiptNumber === '') {
                alert('현금영수증 정보를 입력해주세요.');
                return;
            }
            if (!/^\d*$/.test(formData.cashReceiptNumber as string)) {
                alert('현금영수증 번호는 숫자로만 입력해주세요.');
                return;
            }
        }

        // TODO Options 구현 후 수정
        // TODO 메세지 탬플릿, 센더/리시버 id
        const data: OrderReq = {
            productId: orderHistory!.productId,
            productOptionId: 0,
            productQuantity: orderHistory!.productQuantity,
            messageCardTemplateId: 0,
            messageCardMessage: formData.messageCardMessage as string,
            senderId: 0,
            receiverId: 0,
            hasCashReceipt: formData.hasCashReceipt !== undefined,
        };
        if (data.hasCashReceipt) {
            // TODO validation
            data.cashReceiptType = formData.cashReceiptType as string;
            data.cashReceiptNumber = formData.cashReceiptNumber as string;
        }

        // TODO 백엔드 오리진 허용 요청
        // axios.post('/order', data);
        console.log(data);

        orderHistoryStorage.set(undefined);
        alert('주문이 완료되었습니다.');
        navigate('/', { replace: true });
    };

    if (!orderHistory) return <div></div>;

    if (productDetail?.isLoading) return <LoadingUI />;

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
                <div className={gridStyle}>
                    <div>
                        <InputMsg />
                        <div className={dividerStyle} />
                        <OrderDetail
                            imageURL={productDetail!.data!.detail.imageURL}
                            productName={productDetail!.data!.detail.name}
                            brandName={productDetail!.data!.detail.brandInfo.name}
                            quantity={orderHistory!.productQuantity}
                        />
                    </div>
                    <div className={layout1}>
                        {/* TODO price 가져오기 및 적용 */}
                        <PaymentInfo
                            price={
                                productDetail!.data!.detail.price.sellingPrice *
                                orderHistory!.productQuantity
                            }
                        />
                        <Button type="submit">
                            {productDetail!.data!.detail.price.sellingPrice *
                                orderHistory!.productQuantity}
                            원 결제하기
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
