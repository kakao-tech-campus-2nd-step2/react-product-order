import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControl,
	FormLabel,
	HStack,
	Image,
	Input,
	Select,
	Stack,
	Text,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

import { Spinner } from "@/components/common/Spinner";
import usePaymentForm from "@/hooks/usePaymentForm";

interface PaymentPageProps {
	data: {
		options: {
			productName: string;
			productPrice: number;
		};
	};
	loading: boolean;
	errorMessage: string;
	quantity: number;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ data, loading, errorMessage, quantity}) => {
	const {
		register,
		handleSubmit,
		onSubmit,
	} = usePaymentForm();
	
	
	if (loading) {
		return (
		<TextView>
			<Spinner />
		</TextView>
		);
	}
	if (errorMessage || !data) {
		return (
		<TextView>
			에러가 발생했습니다.
			{errorMessage}
		</TextView>
		);
	}
	
	return (
		<>
		{data && <Box maxW="1200px" mx="auto" p={4}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<HStack spacing={8} align="flex-start">
					<VStack spacing={8} align="stretch" flex={2}>
					<Box>
						<Text fontSize="2xl" fontWeight="bold">나에게 주는 선물</Text>
						<Textarea
						mt={4}
						placeholder="선물과 함께 보낼 메시지를 적어보세요"
						{...register("message", { required: "메시지를 입력해주세요.", maxLength: { value: 100, message: "메시지는 100자 이내로 입력해주세요." } })}
						bg="gray.50"
						/>
					</Box>
					<Box>
						<Text fontSize="2xl" fontWeight="bold" mb={4}>선물내역</Text>
						<Box p={4} borderWidth="1px" borderRadius="md">
						<HStack>
							<Image
							boxSize="100px"
							objectFit="cover"
							src="https://st.kakaocdn.net/product/gift/product/20240703140657_19263fd5455146b0a308a4e0d6bacc6a.png"
							alt="선물 이미지"
							/>
							<VStack align="start" spacing={1}>
							<Text fontWeight="bold">{data?.options.productName}</Text>
							<Text> X {quantity}개</Text>
							</VStack>
						</HStack>
						</Box>
					</Box>
					</VStack>
					<VStack spacing={8} align="stretch" flex={1}>
					<Text fontSize="2xl" fontWeight="bold" mb={4}>결제 정보</Text>
					<Stack spacing={4}>
						<Checkbox
						{...register("receiptRequested")}
						defaultChecked
						colorScheme="yellow"
						>
						현금영수증 신청
						</Checkbox>
						<FormControl>
						<FormLabel>현금영수증 종류</FormLabel>
						<Select {...register("receiptType")}>
							<option value="개인소득공제">개인소득공제</option>
							<option value="사업자지출증빙">사업자지출증빙</option>
						</Select>
						</FormControl>
						<FormControl>
							<FormLabel>현금영수증 번호</FormLabel>
							<Input
								placeholder="(-없이) 숫자만 입력해주세요."
								{...register("receiptNumber", { pattern: { value: /^[0-9]+$/, message: "현금영수증 번호는 숫자만 입력해주세요." } })}
							/>
						</FormControl>
						<Divider />
						<HStack w="100%" justifyContent="space-between">
						<Text fontWeight="bold">최종 결제금액</Text>
						<Text fontSize="2xl" fontWeight="bold">{data?.options.productPrice * quantity}원</Text>
						</HStack>
						<Button type="submit" colorScheme="yellow" size="lg" w="100%">
						{data?.options.productPrice * quantity}원 결제하기
						</Button>
					</Stack>
					</VStack>
				</HStack>
			</form>
		</Box>}
		</>
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
