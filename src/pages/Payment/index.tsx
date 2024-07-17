import { Spinner } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";

import useGetProductOption from "@/api/hooks/useGetProductOption";

const PaymentPage = () => {
	const { productId } = useParams<{ productId: string }>();
	const validProductId = productId || "";
	const { data, isLoading, isError } = useGetProductOption(validProductId);

  if (isLoading) {
    return (
      <TextView>
        <Spinner />
      </TextView>
    );
  }
  if (isError || !data) {
    return (
      <TextView>
        에러가 발생했습니다.
      </TextView>
    );
  }

	  return (
	<div>
	  <h1>Payment</h1>
	</div>
  );
};

export default PaymentPage;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;