import { useLocation } from 'react-router-dom';

export const OrderPage = () => {
  const location = useLocation();

  console.log(location.state);

  return (
    <div>
      <h1>Order</h1>
    </div>
  );
};
