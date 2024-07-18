import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

import type { ProductDetailResponseData } from "@/api/hooks/useGetProductDetail";

type HandleClickFunction = () => void;

export const AsideContent = (
  data: ProductDetailResponseData,
  quantity: number,
  setQuantity: React.Dispatch<React.SetStateAction<number>>,
  handleClick: HandleClickFunction,
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
            {data.detail.name}
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
              {data.detail.price.sellingPrice * quantity}원
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
            onClick={handleClick}
          >
            나에게 선물하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
