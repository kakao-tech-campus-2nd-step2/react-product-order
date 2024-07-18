import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { useGetProductDetail } from "@/api/hooks/useGetProductDetail";
import { Spinner } from "@/components/common/Spinner";
import { AsideContent } from "@/components/features/Products/ProductAside";
import { MainContent } from "@/components/features/Products/ProductMain";
import { RouterPath } from "@/routes/path";

export const ProductsPage = () => {
  const { productId = "" } = useParams<{ productId: string }>();
  const { data, isError, isLoading } = useGetProductDetail(productId);
  const [quantity, setQuantity] = useState(1);

  if (!productId) {
    return <Navigate to={RouterPath.notFound} />;
  }

  if (isLoading)
    return (
      <TextView>
        <Spinner />
      </TextView>
    );
  if (isError) return <Navigate to={RouterPath.notFound} />;
  if (!data) return <></>;

  return (
    <Flex width="100%" justifyContent="center" alignItems="center">
      <Flex
        maxWidth="1280px"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Flex width="100%" justifyContent="flex-start" alignItems="flex-start" position="relative">
          {MainContent(data.detail.imageURL, data.detail.name, data.detail.price.sellingPrice)}
          {AsideContent(data, quantity, setQuantity)}
        </Flex>
      </Flex>
    </Flex>
  );
};

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
