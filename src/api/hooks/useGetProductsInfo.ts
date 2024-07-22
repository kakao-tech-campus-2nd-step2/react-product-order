import { useQuery } from '@tanstack/react-query'

import type { ProductsDetailData, ProductsOptionData } from '@/types'

import { fetchInstance } from '../instance'

const getProductsDetailPath = (product: string) => `/v1/products/${product}/detail`
const getProductsOptionPath = (product: string) => `/v1/products/${product}/options`

export const getProductsDetail = async (product: string) => {
  const response = await fetchInstance.get<ProductsDetailData>(getProductsDetailPath(product))
  return response.data.detail
}

export const getProductsOptions = async (product: string) => {
  const response = await fetchInstance.get<ProductsOptionData>(getProductsOptionPath(product))
  return response.data.options
}

export const useGetProductsInfo = (product: string) =>
  useQuery({
    queryKey: [getProductsDetailPath(product), getProductsOptionPath(product)],
    queryFn: async () => {
      const [detail, options] = await Promise.all([
        getProductsDetail(product),
        getProductsOptions(product),
      ])
      return { detail, options }
    }
  })