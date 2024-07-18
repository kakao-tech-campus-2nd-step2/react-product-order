import React from 'react';

import { useGift } from '../../provider/Auth';

const Checkout = () => {
  const { selectedProduct, quantity, message, setMessage } = useGift();

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const totalPrice = selectedProduct ? selectedProduct.price.sellingPrice * quantity : 0;

  return (
    <div>
      {selectedProduct ? (
        <>
          <h1>나에게 주는 선물</h1>
          <p>선택한 제품: {selectedProduct.name}</p>
          <p>수량: {quantity}</p>
          <p>총 가격: {totalPrice}원</p>
          <div>
            <label>메세지: </label>
            <textarea value={message} onChange={handleMessageChange}></textarea>
          </div>
          <button>결제하기</button>
        </>
      ) : (
        <p>선택된 제품이 없습니다.</p>
      )}
    </div>
  );
};

export default Checkout;
