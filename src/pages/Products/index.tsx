import { Box, Button, Divider, Flex, Heading, Image, Input, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { useGetProductDetail } from "@/api/hooks/useGetProductDetail";
import { Spinner } from "@/components/common/Spinner";
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
          {AsideContent(data.detail.name, data.detail.price.sellingPrice, quantity, setQuantity)}
        </Flex>
      </Flex>
    </Flex>
  );
};

const MainContent = (src: string, title: string, price: number) => {
  return (
    <Box width="100%" maxWidth="900px">
      <Box width="100%" padding={{ base: "16px 16px 60px", md: "32px 32px 80px" }}>
        <Flex width="100%" direction={{ base: "column", md: "row" }}>
          <Image src={src} width="100%" maxWidth="450px" />
          <Box width="100%" paddingLeft={{ base: "0", md: "24px" }}>
            <Heading
              as="h2"
              paddingTop="24px"
              fontSize="24px"
              lineHeight="33px"
              color="rgb(17, 17, 17)"
              fontWeight="400"
              wordBreak="break-all"
            >
              {title}
            </Heading>
            <Text
              width="100%"
              minHeight="120px"
              paddingTop="16px"
              fontSize="30px"
              fontWeight="400"
              lineHeight="52px"
              color="rgb(34, 34, 34)"
            >
              {price}원
            </Text>
            <Divider
              orientation="horizontal"
              opacity="0.6"
              borderWidth="0 0 1px"
              borderColor="inherit"
              width="100%"
              color="rgb(245, 245, 245)"
            />
            <Text padding="24px 12px" fontSize="14px" fontWeight="700" color="rgb(17, 17, 17)">
              카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
            </Text>
            <Divider
              orientation="horizontal"
              opacity="0.6"
              borderWidth="0 0 1px"
              borderColor="inherit"
              width="100%"
              color="rgb(245, 245, 245)"
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

const AsideContent = (
  title: string,
  price: number,
  quantity: number,
  setQuantity: React.Dispatch<React.SetStateAction<number>>,
) => {
  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setQuantity(value);
    }
  };

  return (
    <Box
      display={{ base: "none", md: "block" }}
      position="sticky"
      top="54px"
      width="100%"
      maxWidth="360px"
      height="calc(-54px + 100vh)"
    >
      <Box
        width="100%"
        padding="30px 12px 30px 30px"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box
          width="100%"
          padding="12px 14px 16px"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="rgb(237, 237, 237)"
          borderRadius="2px"
        >
          <Text
            fontWeight="700"
            lineHeight="22px"
            color="rgb(17, 17, 17)"
            overflowWrap="break-word"
            wordBreak="break-all"
          >
            {title}
          </Text>
          <Flex justifyContent="center" paddingTop="8px" gap="8px">
            <Button
              aria-label="수량 1개 감소"
              onClick={decreaseQuantity}
              isDisabled={quantity <= 1}
              role="button"
              tabIndex={-1}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              userSelect="none"
              position="relative"
              whiteSpace="nowrap"
              verticalAlign="middle"
              outline="transparent solid 2px"
              outlineOffset="2px"
              lineHeight="1.2"
              borderRadius="md"
              fontWeight="semibold"
              transitionProperty="common"
              transitionDuration="normal"
              height="10"
              fontSize="md"
              paddingInlineStart="4"
              paddingInlineEnd="4"
              bg="gray.100"
              color="gray.800"
              opacity="0.4"
              _hover={{ opacity: "0.6" }}
            >
              <Box as="span" className="css-onkibi" boxSize="1em">
                <svg
                  viewBox="0 0 24 24"
                  focusable="false"
                  className="chakra-icon css-onkibi"
                  aria-hidden="true"
                >
                  <g fill="currentColor">
                    <rect height="4" width="20" x="2" y="10"></rect>
                  </g>
                </svg>
              </Box>
            </Button>
            <Input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*(.[0-9]+)?"
              role="spinbutton"
              aria-valuemin={1}
              aria-valuemax={100}
              aria-valuenow={quantity}
              aria-valuetext={quantity.toString()}
              autoComplete="off"
              autoCorrect="off"
              onChange={handleInputChange}
              value={quantity}
            />
            <Button
              aria-label="수량 1개 추가"
              onClick={increaseQuantity}
              isDisabled={quantity >= 100}
              role="button"
              tabIndex={-1}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              userSelect="none"
              position="relative"
              whiteSpace="nowrap"
              verticalAlign="middle"
              outline="transparent solid 2px"
              outlineOffset="2px"
              lineHeight="1.2"
              borderRadius="md"
              fontWeight="semibold"
              transitionProperty="common"
              transitionDuration="normal"
              height="10"
              fontSize="md"
              paddingInlineStart="4"
              paddingInlineEnd="4"
              bg="gray.100"
              color="gray.800"
              opacity="0.4"
              _hover={{ opacity: "0.6" }}
            >
              <Box as="span" className="css-onkibi" boxSize="1em">
                <svg
                  viewBox="0 0 24 24"
                  focusable="false"
                  className="chakra-icon css-onkibi"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z"
                  ></path>
                </svg>
              </Box>
            </Button>
          </Flex>
        </Box>
        <Box padding="12px 0 0">
          <Box
            marginBottom="20px"
            padding="18px 20px"
            borderRadius="4px"
            backgroundColor="rgb(245, 245, 245)"
            display="flex"
            justifyContent="space-between"
            fontSize="14px"
            fontWeight="bold"
            lineHeight="1.4"
            color="rgb(17, 17, 17)"
          >
            총 결제 금액
            <Text fontSize="20px" letterSpacing="-0.02em" lineHeight="1" fontWeight="700">
              {price * quantity}원
            </Text>
          </Box>
          <Button
            width="100%"
            borderRadius="4px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            transition="background-color 200ms ease"
            height="60px"
            fontSize="16px"
            fontWeight="400"
            color="white"
            backgroundColor="rgb(17, 17, 17)"
            boxSizing="border-box"
          >
            나에게 선물하기
          </Button>
        </Box>
      </Box>
    </Box>
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
