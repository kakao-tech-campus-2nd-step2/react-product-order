import { Box, Button, Grid, GridItem, Input, Text } from '@chakra-ui/react';
import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import { useGetProductsInfo } from "@/api/hooks/useGetProductsInfo"
import { Button as CustomBtn } from "@/components/common/Button"
import { Image } from "@/components/common/Image"
import { Spinner } from "@/components/common/Spinner"
import { useAuth } from "@/provider/Auth"
import { getDynamicPath, RouterPath } from "@/routes/path"

type Props = {
  productId: string
}

export const ProductsDetail = ({ productId }: Props) => {
  const { data, isLoading, isError } = useGetProductsInfo(productId)
  const [itemCount, setItemCount] = useState<number>(1)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const authInfo = useAuth()
  const navigate = useNavigate()

  // 선물 최대 제한 수량 
  const giftOrderLimit = data?.options?.giftOrderLimit ?? 0

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (isNaN(value) || value < 1 || (giftOrderLimit && value > giftOrderLimit)) return
    setItemCount(value)
  }

  const handleIncrement = () => {
    if (itemCount < giftOrderLimit) {
      setItemCount(itemCount + 1)
    } else {
      alert(`최대 선물 가능 수량은 ${giftOrderLimit}개 입니다.`)
    }
  }

  const handleDecrement = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1)
    }
  }

  const handleNavigate = () => {
    if (!authInfo) {
      const check = window.confirm('로그인이 필요한 서비스 입니다. 로그인 페이지로 이동하시겠습니까?') 
      if (check) {
        navigate(getDynamicPath.login())
      }
    } else {
      navigate(RouterPath.order, { state: { itemCount, totalPrice, data } })
    }
  }

  useEffect(() => {
    if (data) {
      setTotalPrice(data.detail.price.basicPrice * itemCount)
      console.log(`상품명: ${data.detail.name} / 선물 최대 제한 수량: ${giftOrderLimit}`)
    }
  }, [data, itemCount, giftOrderLimit])

  if (isLoading) {
    return (
      <CenteredBox>
        <Spinner />
      </CenteredBox>
    )
  }

  if (isError) {
    return (
      <Navigate to={RouterPath.notFound} />
    )
  }

  return (
    <Wrapper>
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 2fr' }}
        gap={6}
        maxWidth={1200}
        mx="auto"
        p={4}
      >
        <GridItem>
          <Image src={data?.detail?.imageURL} alt={data?.detail?.name} />
        </GridItem>

        <GridItem>
          <Box>
            <Text fontSize="2xl" fontWeight="bold">{data?.detail?.name}</Text>
            <Text fontSize="xl" color="gray.600">{data?.detail?.price.basicPrice} 원</Text>
            <Text mt={4} fontSize="md" color="gray.500">
              카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
            </Text>
          </Box>

          <Box mt={6}>
            <QuantityControl>
              <Button size="sm" onClick={handleDecrement}>-</Button>
              <Input
                type="number"
                width="60px"
                textAlign="center"
                value={itemCount}
                onChange={handleChange}
                mx={2}
              />
              <Button size="sm" onClick={handleIncrement}>+</Button>
            </QuantityControl>
          </Box>

          <Box mt={6} display="flex" justifyContent="space-between" alignItems="center">
            <Text fontSize="lg">총 결제 금액</Text>
            <Text fontSize="2xl" fontWeight="bold">{totalPrice} 원</Text>
          </Box>

          <Box mt={6}>
            <CustomBtn theme="black" size="large" onClick={handleNavigate}>
              나에게 선물하기
            </CustomBtn>
          </Box>
        </GridItem>
      </Grid>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const CenteredBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

export default ProductsDetail;
