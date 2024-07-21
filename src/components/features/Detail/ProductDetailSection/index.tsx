import { Box, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';

interface ProductDetailSectionProps {
  productId: string;
}
const ProductDetailSection = ({ productId }: ProductDetailSectionProps) => {
  const { data, isPending, isError } = useGetProductDetail(productId);
  const navigate = useNavigate();

  if (isPending) {
    return <div>loading...</div>;
  }

  if (isError) {
    navigate('/');
    return <div>error...</div>;
  }
  const {
    imageURL,
    name,
    price: { basicPrice },
  } = data?.detail;

  return (
    <>
      <Box width={'50%'}>
        <Image src={imageURL} alt={name} />
      </Box>
      <Box>
        <div>{name}</div>
        <div>{basicPrice}</div>
      </Box>
    </>
  );
};

export default ProductDetailSection;
