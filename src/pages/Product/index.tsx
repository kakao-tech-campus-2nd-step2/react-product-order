import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ProductDetail {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
  };
}

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/${productId}/detail`,
        );
        const data = response.data.detail;
        setProductDetail({
          id: data.id,
          name: data.name,
          imageURL: data.imageURL,
          price: {
            basicPrice: data.price.basicPrice,
          },
        });
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Detail</h1>
      <p>ID: {productDetail.id}</p>
      <p>Name: {productDetail.name}</p>
      <img src={productDetail.imageURL} alt={productDetail.name} />
      <p>Basic Price: {productDetail.price.basicPrice}원</p>
    </div>
  );
};
