// src/hooks/useProductDetail.ts
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchInstance } from '@/api/instance';
import { ProductDetail } from '@/types';

const fetchProductDetail = async (productId: string): Promise<ProductDetail> => {
  const response = await fetchInstance.get(`/v1/products/${productId}/detail`);
  if (response.status === 200) {
    return response.data.detail;
  }
  throw new Error('Failed to fetch product detail');
};

export const useProductDetail = (productId: string) => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productData = await fetchProductDetail(productId);
        setProduct(productData);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch product detail:', error);
        setIsError(true);
        navigate('/');
      }
    };

    fetchData();
  }, [productId, navigate]);

  return { product, quantity, setQuantity, isLoading, isError };
};
