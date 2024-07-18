import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import type { ProductsInfoData } from '@/types'

const getProductsPath = (product: string) => `/v1/products/${product}/detail`

export const getProducts = async (product: string) => {
  const response = await axios.get<ProductsInfoData>(getProductsPath(product))
  return response.data.detail
}

export const useGetProductsInfo = (product: string) =>
  useQuery({
    queryKey: [getProductsPath(product)],
    queryFn: () => getProducts(product)
  })