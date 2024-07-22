import { Checkbox, Input, Select } from '@chakra-ui/react';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { useState } from 'react';
import type { Control } from 'react-hook-form';
import { Controller, type UseFormRegister } from 'react-hook-form';

import type OrderForm from './OrderForm';

export default ({
    price,
    register,
    control,
}: {
    price: number;
    register: UseFormRegister<OrderForm>;
    control: Control<OrderForm>;
}) => {
    const [cashReceipt, setCashReceipt] = useState(false);
    return (
        <div className={containerStyle}>
            <h2 className={h2Style}>결제 정보</h2>
            <div className={setReceiptStyle}>
                <Controller
                    control={control}
                    name="hasCashReceipt"
                    render={({ field }) => (
                        <Checkbox
                            {...field}
                            value={cashReceipt ? 'true' : 'false'}
                            onChange={(e) => {
                                field.onChange(e);
                                setCashReceipt((value) => !value);
                            }}
                        >
                            현금영수증 신청
                        </Checkbox>
                    )}
                />
                <Select {...register('cashReceiptType')} defaultValue={'개인소득공제'}>
                    <option value="개인소득공제">개인소득공제</option>
                    <option value="사업자증빙용">사업자증빙용</option>
                </Select>
                <Input
                    {...register('cashReceiptNumber', { pattern: /^\d*$/, required: cashReceipt })}
                    placeholder="(-없이) 숫자만 입력해주세요."
                />
            </div>
            <PriceBox>
                <p>최종 결제금액</p>
                <p>{price}원</p>
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

    p:first-of-type {
        font-size: 15px;
        font-weight: 600;
    }
    p:last-of-type {
        font-size: 20px;
        font-weight: 700;
    }
`;
