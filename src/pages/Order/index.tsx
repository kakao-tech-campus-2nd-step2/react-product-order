import { Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation } from "react-router-dom";

import { OrderAside } from "@/components/features/Order/OrderAside";
import { OrderMain } from "@/components/features/Order/OrderMain";
import { RouterPath } from "@/routes/path";

export type FormValues = {
  message: string;
  isChecked: boolean;
  cashReceiptType: string;
  cashReceiptNumber: string;
};

export const OrderPage = () => {
  const location = useLocation();
  const { state } = location;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      message: "",
      isChecked: false,
      cashReceiptType: "PERSONAL",
      cashReceiptNumber: "",
    },
  });

  if (!state) return <Navigate to={RouterPath.notFound} />;

  const quantity = state?.quantity;
  const data = state?.data;

  const onSubmit = (formData: FormValues) => {
    const { message, isChecked, cashReceiptNumber } = formData;

    if (!message) {
      alert("메시지를 입력해주세요!");
      return;
    } else if (message.length > 100) {
      alert("메시지는 100자 이내로 입력해주세요.");
      return;
    }

    if (isChecked) {
      if (
        isNaN(Number(cashReceiptNumber)) ||
        Number(cashReceiptNumber).toString() !== cashReceiptNumber
      ) {
        alert("현금영수증 번호는 숫자로만 입력해주세요.");
        return;
      }
    }

    alert("주문이 완료되었습니다.");
    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex width="100%" justifyContent="center" alignItems="center">
        <Flex
          width="100%"
          maxWidth="1280px"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Flex
            width="100%"
            justifyContent="flex-start"
            alignItems="flex-start"
            position="relative"
          >
            <OrderMain quantity={quantity} data={data} register={register} watch={watch} />
            <OrderAside
              quantity={quantity}
              data={data}
              register={register}
              watch={watch}
              errors={errors}
            />
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};
