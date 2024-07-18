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
	Spinner,
	Stack,
	Text,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import {useGetProductOption} from "@/api/hooks/useGetProductOption";
import useForm from "@/hooks/useForm";

const PaymentPage = () => {
	const { productId } = useParams<{ productId: string }>();
	const validProductId = productId || "";
	const [data, { loading, errorMessage}] = useGetProductOption(validProductId);
	const {
		message,
		setMessage,
		receiptRequested,
		setReceiptRequested,
		receiptType,
		receiptNumber,
		setReceiptNumber,
		handleReceiptTypeChange,
	} = useForm();
	
	useEffect(() => {
			console.log(data?.options);
	}, [data?.options]);
	
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
		<Box maxW="1200px" mx="auto" p={4}>
		<HStack spacing={8} align="flex-start">
			<VStack spacing={8} align="stretch" flex={2}>
			<Box>
				<Text fontSize="2xl" fontWeight="bold">나에게 주는 선물</Text>
				<Textarea
				mt={4}
				placeholder="선물과 함께 보낼 메시지를 적어보세요"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
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
					<Text fontWeight="bold">{data.productName}</Text>
					<Text> X 1개</Text>
					</VStack>
				</HStack>
				</Box>
			</Box>
			</VStack>
			<VStack spacing={8} align="stretch" flex={1}>
			<Text fontSize="2xl" fontWeight="bold" mb={4}>결제 정보</Text>
			<Stack spacing={4}>
				<Checkbox
				isChecked={receiptRequested}
				colorScheme="yellow"
				onChange={(e) => setReceiptRequested(e.target.checked)}
				>
				현금영수증 신청
				</Checkbox>
				<FormControl>
				<FormLabel>현금영수증 종류</FormLabel>
				<Select value={receiptType} onChange={handleReceiptTypeChange}>
					<option value="개인소득공제">개인소득공제</option>
					<option value="사업자지출증빙">사업자지출증빙</option>
				</Select>
				</FormControl>
				<FormControl>
					<FormLabel>현금영수증 번호</FormLabel>
					<Input
						placeholder="(-없이) 숫자만 입력해주세요."
						value={receiptNumber}
						onChange={(e) => setReceiptNumber(e.target.value)}
					/>
				</FormControl>
				<Divider />
				<HStack w="100%" justifyContent="space-between">
				<Text fontWeight="bold">최종 결제금액</Text>
				<Text fontSize="2xl" fontWeight="bold">{data.productPrice}원</Text>
				</HStack>
				<Button colorScheme="yellow" size="lg" w="100%">
				{data.productPrice}원 결제하기
				</Button>
			</Stack>
			</VStack>
		</HStack>
		</Box>
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
	