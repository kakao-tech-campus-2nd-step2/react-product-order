import React from 'react';
import { Navigate,useParams } from 'react-router-dom';

import ProductContents from '@/components/features/product'; 
import { RouterPath } from '@/routes/path'; 

type Params = {
  productKey: string;
};

const ProductPage: React.FC = () => {
  const { productKey } = useParams<Params>();
  console.log('Product key from useParams:', productKey);
  if (!productKey) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return <ProductContents productId={productKey} />;
};

export default ProductPage;