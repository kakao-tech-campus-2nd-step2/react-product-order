import { useLocation } from "react-router-dom";

import PaymentPage from '@/pages/Payment';

const PaymentPageWrapper = () => {
	const location = useLocation();
	const { data, loading, errorMessage, quantity} = location.state || {
    data: null,
    loading: true,
    errorMessage: "데이터를 불러오지 못했습니다.",
    quantity: 1,
};

  return <PaymentPage data={data} loading={loading} errorMessage={errorMessage} quantity={quantity}/>;
};

export default PaymentPageWrapper;
