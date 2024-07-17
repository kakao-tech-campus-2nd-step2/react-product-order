import { Checkbox, Input, Select } from '@chakra-ui/react';
import { css } from '@emotion/css';
import styled from '@emotion/styled';

export default () => {
    return (
        <div className={containerStyle}>
            <h2 className={h2Style}>결제 정보</h2>
            <div className={setReceiptStyle}>
                <Checkbox id="hasCashReceipt">현금영수증 신청</Checkbox>
                <Select id="cashReceiptType" defaultValue={1}>
                    <option value="1">개인소득공제</option>
                    <option value="2">사업자증빙용</option>
                </Select>
                <Input id="cashReceiptNumber" placeholder="(-없이) 숫자만 입력해주세요." />
            </div>
            <PriceBox>
                <p>최종 결제금액</p>
                <p>1000원</p>
            </PriceBox>
        </div>
    );
};

const containerStyle = css`
    > * {
        border-bottom: 1px solid #eee;
    }
`;
const setReceiptStyle = css`
    padding: 20px;
    > * {
        margin-bottom: 10px;
    }
`;
const h2Style = css`
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 20px;
`;
const PriceBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin-bottom: 20px;

    p:first-child {
        font-size: 15px;
        font-weight: 600;
    }
    p:last-child {
        font-size: 20px;
        font-weight: 700;
    }
`;
