import { Box, Button, Checkbox, Flex, Image, Input, Select,Text, Textarea, VStack } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { Navigate,useLocation } from "react-router-dom";

type FormValues = {
  message: string;
  cashReceipt: boolean;
  cashReceiptType: string;
  cashReceiptNumber: string;
};

export const OrderPage = () => {
  const location = useLocation();
  const { productDetail, productQuantity } = location.state || {};

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      message: "",
      cashReceipt: false,
      cashReceiptType: "PERSONAL",
      cashReceiptNumber: ""
    }
  });

  const watchCashReceipt = watch("cashReceipt");
  const totalPrice = productDetail.price.sellingPrice * productQuantity;

  const onSubmit = (data: FormValues) => {
    if (data.message.trim() === "") {
      alert("선물 메시지를 입력해주세요.");
      return;
    }

    if (data.cashReceipt) {
      if (data.cashReceiptNumber.trim() === "") {
        alert("현금영수증 번호를 입력해주세요.");
        return;
      }

      if (isNaN(Number(data.cashReceiptNumber))) {
        alert("현금영수증 번호는 숫자만 입력해주세요.");
        return;
      }
    }

    alert("주문이 완료되었습니다.");
  };

  if (!productDetail || !productQuantity) {
    return <Navigate to="/" />;
  }

  return (
    <Box p={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>나에게 주는 선물</Text>
        <Flex direction="column" gap={4}>
        <Box flex="1" p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">선물 메시지</Text>
            <Controller
              name="message"
              control={control}
              rules={{
                required: "선물 메시지를 입력해주세요.",
                maxLength: {
                  value: 100,
                  message: "선물 메시지는 100자 이내로 입력해주세요."
                }
              }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="선물과 함께 보낼 메시지를 적어보세요"
                  size="lg"
                />
              )}
            />
            {errors.message && <Text color="red.500">{errors.message.message}</Text>}
          </Box>

          <Box flex="1" p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold">선물 내역</Text>
            <Flex direction="row" align="center">
              <Image src={productDetail.imageURL} alt={productDetail.name} boxSize="100px" />
              <Box ml={4}>
                <Text>{productDetail.name}</Text>
                <Text>{productDetail.price.sellingPrice}원 x {productQuantity}개</Text>
              </Box>
            </Flex>
          </Box>

          <Box flex="1" p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold" mb={4}>결제 정보</Text>
            <VStack align="flex-start" spacing={4}>
            <Controller
                name="cashReceipt"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    isChecked={field.value}
                    onChange={(e) => {
                      setValue("cashReceipt", e.target.checked);
                      if (!e.target.checked) {
                        setValue("cashReceiptNumber", "");
                      }
                    }}
                  >
                    현금영수증 신청
                  </Checkbox>
                )}
              />
              {watchCashReceipt && (
                <>
                  <Text>현금영수증 타입</Text>
                  <Controller
                    name="cashReceiptType"
                    control={control}
                    render={({ field }) => (
                      <Select {...field}>
                        <option value="PERSONAL">개인소득공제</option>
                        <option value="BUSINESS">사업자지출증빙</option>
                      </Select>
                    )}
                  />
                  <Text>현금영수증 번호</Text>
                  <Controller
                    name="cashReceiptNumber"
                    control={control}
                    rules={{
                      required: watchCashReceipt && "현금영수증 번호를 입력해주세요.",
                      validate: value => !watchCashReceipt || !isNaN(Number(value)) || "현금영수증 번호는 숫자만 입력해주세요."
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="(-없이) 숫자만 입력해주세요"
                      />
                    )}
                  />
                  {errors.cashReceiptNumber && <Text color="red.500">{errors.cashReceiptNumber.message}</Text>}
                </>
              )}
              <Text fontSize="lg" fontWeight="bold">최종 결제금액</Text>
              <Text fontSize="2xl" fontWeight="bold">{totalPrice}원</Text>
              <Button type="submit" colorScheme="yellow" size="lg">
                {totalPrice}원 결제하기
              </Button>
            </VStack>
          </Box>
        </Flex>
      </form>
    </Box>
  );
};