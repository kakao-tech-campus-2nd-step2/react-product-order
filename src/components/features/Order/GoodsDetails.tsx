import { Image } from '@chakra-ui/react';
import styled from '@emotion/styled';

import type { GoodsData } from '@/types';

type Props = {
  productDetail: GoodsData;
  count: number;
};

export const GoodsDetails = ({ productDetail, count }: Props) => (
  <Wrapper>
    <Image src={productDetail.imageURL} alt={productDetail.name} boxSize="100px" />
    <TextWrapper>
      <BrandText>{productDetail.brandInfo.name}</BrandText>
      <Text>
        {productDetail.name} X {count}
      </Text>
    </TextWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  margin: 5px 0;
`;

const TextWrapper = styled.div`
  margin-left: 20px;
`;

const BrandText = styled.p`
  margin: 5px 0;
  font-size: 12px; // Adjust the size as needed
  color: gray; // Change the color to gray
`;

export default GoodsDetails;
