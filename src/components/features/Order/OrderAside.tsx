import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Button, Checkbox, Divider, Input, Select, Text } from "@chakra-ui/react";

import type { ProductDetailResponseData } from "@/api/hooks/useGetProductDetail";

type HandleSubmitFunction = () => void;

export const OrderAside = (
  quantity: number,
  data: ProductDetailResponseData,
  isChecked: boolean,
  setChecked: React.Dispatch<React.SetStateAction<boolean>>,
  cashReceiptType: string,
  setCashReceiptType: React.Dispatch<React.SetStateAction<string>>,
  cashReceiptNumber: string,
  setCashReceiptNumber: React.Dispatch<React.SetStateAction<string>>,
  handleSubmit: HandleSubmitFunction,
) => {
  const price = quantity * data.detail.price.sellingPrice;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCashReceiptType(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCashReceiptNumber(event.target.value);
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
        height="100%"
        borderLeft="1px solid"
        borderRight="1px solid"
        borderColor="rgb(237, 237, 237)"
        padding="16px"
      >
        <Box padding="24px 0px 20px">
          <Text
            fontSize="18px"
            lineHeight="21px"
            color="rgb(34, 34, 34)"
            fontWeight="700"
            boxSizing="border-box"
          >
            결제 정보
          </Text>
        </Box>
        <Divider
          opacity={0.6}
          borderWidth="0px 0px 1px"
          borderColor="rgb(237, 237, 237)"
          borderStyle="solid"
          width="100%"
          color="rgb(237, 237, 237)"
        />
        <Box width="100%" padding="16px">
          <Checkbox
            isChecked={isChecked}
            onChange={handleCheckboxChange}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
              "& .chakra-checkbox__input": {
                border: "0",
                clip: "rect(0, 0, 0, 0)",
                height: "1px",
                width: "1px",
                margin: "-1px",
                padding: "0",
                overflow: "hidden",
                whiteSpace: "nowrap",
                position: "absolute",
              },
              "& .chakra-checkbox__control": {
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                userSelect: "none",
                flexShrink: "0",
                width: "var(--chakra-sizes-5)",
                height: "var(--chakra-sizes-5)",
                transitionProperty: "box-shadow",
                transitionDuration: "normal",
                borderWidth: "2px",
                borderStyle: "solid",
                borderRadius: "sm",
                borderColor: "inherit",
                color: "white",
              },
              "& .chakra-checkbox__label": {
                marginInlineStart: "0.5rem",
                userSelect: "none",
                fontSize: "lg",
              },
              "& .chakra-checkbox__label span": {
                fontSize: "15px",
                lineHeight: "24px",
                fontWeight: "700",
                color: "black",
              },
            }}
          >
            <Box as="span">
              <Text fontSize="15px" lineHeight="24px" fontWeight="700" color="black">
                현금영수증 신청
              </Text>
            </Box>
          </Checkbox>
          <Box width="100%" height="16px" />
          <Box width="100%" height="fit-content" position="relative">
            <Select
              name="cashReceiptType"
              variant="outline"
              size="md"
              paddingEnd="var(--chakra-space-8)"
              height="var(--input-height)"
              fontSize="var(--input-font-size)"
              paddingStart="var(--input-padding)"
              borderRadius="var(--input-border-radius)"
              borderWidth="1px"
              borderColor="inherit"
              background="inherit"
              icon={<ChevronDownIcon boxSize="1em" />}
              value={cashReceiptType}
              onChange={handleSelectChange}
            >
              <option value="PERSONAL">개인소득공제</option>
              <option value="BUSINESS">사업자증빙용</option>
            </Select>
            <Box width="100%" height="8px" />
            <Input
              name="cashReceiptNumber"
              placeholder="(-없이) 숫자만 입력해주세요."
              width="100%"
              height="10"
              fontSize="md"
              paddingLeft="4"
              paddingRight="4"
              borderRadius="md"
              outline="transparent solid 2px"
              outlineOffset="2px"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="inherit"
              backgroundColor="inherit"
              _placeholder={{ color: "gray.500" }}
              transition="all 0.2s"
              value={cashReceiptNumber}
              onChange={handleInputChange}
            />
          </Box>
        </Box>
        <Divider
          opacity={0.6}
          borderWidth="0px 0px 1px"
          borderColor="rgb(237, 237, 237)"
          borderStyle="solid"
          width="100%"
          color="rgb(237, 237, 237)"
        />
        <Box
          padding="16px"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="15px" lineHeight="24px" fontWeight="700" color="black">
            최종 결제내역
          </Text>
          <Text
            fontSize="18px"
            lineHeight="21px"
            color="gray.800"
            fontWeight="700"
            boxSizing="border-box"
          >
            {price}원
          </Text>
        </Box>
        <Divider
          opacity={0.6}
          borderWidth="0px 0px 1px"
          borderColor="rgb(237, 237, 237)"
          borderStyle="solid"
          width="100%"
          color="rgb(237, 237, 237)"
        />
        <Box width="100%" height="32px" />

        <Button
          type="submit"
          width="100%"
          borderRadius="4px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          transition="background-color 200ms ease"
          height={{ base: "40px", md: "60px" }}
          fontSize={{ base: "15px", md: "16px" }}
          fontWeight="400"
          color="gray.800"
          backgroundColor="rgb(254, 229, 0)"
          _hover={{ backgroundColor: "yellow.400" }}
          boxSizing="border-box"
          onClick={handleSubmit}
        >
          {price}원 결제하기
        </Button>
      </Box>
    </Box>
  );
};
