import { Image, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";

import { useGetProductDetail } from "@/api/hooks/useGetProductDetail";
import { Spinner } from "@/components/common/Spinner";

const ProductDetailPage = () => {
	const {productId} = useParams<{productId: string}>();
	const validProductId = productId || "";
	const {data, isLoading, isError } = useGetProductDetail(validProductId);

	console.log(data);
	console.log(validProductId)

	
	if (isLoading) {
		return (
			<TextView>
				<Spinner />
			</TextView>
		)
	}
	if (isError || !data) {
		return (
			<TextView>
				에러가 발생했습니다.
			</TextView>
		)
	}

  return (
	<>
		<Image src={data?.detail.imageURL} alt={data?.detail.name} />
		<Text>
		{data?.detail.name}
		<br/>
		{data?.detail.price.sellingPrice}
		<br/>
		{data?.detail.brandInfo.name}
		</Text>
	</>
  );
};

export default ProductDetailPage;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
