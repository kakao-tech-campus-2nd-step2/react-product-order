import { Textarea } from '@chakra-ui/react';
import { css } from '@emotion/css';
import type { UseFormRegister } from 'react-hook-form';

import type OrderForm from './OrderForm';

export default ({ register }: { register: UseFormRegister<OrderForm> }) => {
    return (
        <section className={layout}>
            <h1 className={h1Style}>나에게 주는 선물</h1>
            <Textarea
                {...register('messageCardMessage', { required: true })}
                bg="#eee"
                placeholder="선물과 함께 보낼 메세지를 적어보세요"
                rows={4}
            />
        </section>
    );
};

const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
`;

const h1Style = css`
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: bold;
`;
