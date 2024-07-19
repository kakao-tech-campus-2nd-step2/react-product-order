import { Box, Flex, Image, Text, Textarea } from "@chakra-ui/react";
import type { UseFormRegister, UseFormWatch } from "react-hook-form";

import type { ProductDetailResponseData } from "@/api/hooks/useGetProductDetail";
import type { FormValues } from "@/pages/Order";

type OrderMainProps = {
  quantity: number;
  data: ProductDetailResponseData;
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
};

export const OrderMain = ({ quantity, data, register, watch }: OrderMainProps) => {
  const message = watch("message");

  return (
    <Box width="100%" maxWidth="900px">
      <Box
        borderLeft="1px solid rgb(229, 229, 229)"
        height="calc(-54px + 100vh)"
        padding="44px 0px 32px"
      >
        <Box>
          <Box width="100%" display="flex" justifyContent="center">
            <Text
              fontSize="18px"
              lineHeight="21px"
              color="rgb(34, 34, 34)"
              fontWeight="700"
              boxSizing="border-box"
            >
              나에게 주는 선물
            </Text>
          </Box>
          <Box width="100%" padding="14px 30px">
            <Box width="100%" padding="12px 30px 16px">
              <Textarea
                {...register("message")}
                name="message"
                placeholder="선물과 함께 보낼 메시지를 적어보세요"
                fontSize="md"
                paddingInlineStart="4"
                paddingInlineEnd="4"
                borderRadius="md"
                minWidth="0px"
                outline="transparent solid 2px"
                outlineOffset="2px"
                position="relative"
                appearance="none"
                transition="common 200ms"
                paddingTop="2"
                paddingBottom="2"
                minHeight="10"
                lineHeight="short"
                verticalAlign="top"
                borderWidth="2px"
                borderStyle="solid"
                borderColor="transparent"
                backgroundColor="gray.100"
                resize="none"
                height="100px"
                value={message}
              />
            </Box>
          </Box>
        </Box>
        <Box height="8px" backgroundColor="#EDEDED" />
        <Box width="100%" padding="16px">
          <Text fontSize="15px" lineHeight="24px" fontWeight="700" color="black">
            선물내역
          </Text>
          <Box height="16px" />
          <Flex
            width="100%"
            padding="20px 16px 16px"
            borderRadius="8px"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
          >
            <Box
              border="1px solid"
              borderColor="blackAlpha.50"
              borderRadius="4px"
              overflow="hidden"
              width="86px"
            >
              <Image
                src={data.detail.imageURL}
                width="86px"
                objectFit="cover"
                objectPosition="center center"
                borderRadius="0px"
                aspectRatio="1 / 1"
              />
            </Box>
            <Box pl="8px">
              <Text fontSize="13px" lineHeight="14px" color="gray.500" fontWeight="normal">
                {data.detail.brandInfo.name}
              </Text>
              <Text
                fontSize="14px"
                lineHeight="18px"
                marginTop="3px"
                color="gray.900"
                overflow="hidden"
                fontWeight="normal"
              >
                {data.detail.name} X {quantity}개
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
