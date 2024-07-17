import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Image } from '@/components/common/Image';
import { useBuyInfo } from '@/provider/BuyInfo';
type Props = {
  brandName: string;
  imageUrl: string;
  name: string;
};
export const GiftDetail = ({ brandName, imageUrl, name }: Props) => {
  const { quantity } = useBuyInfo();
  return (
    <Container>
      <Title>선물내역</Title>
      <Box boxShadow="base" p="5" mb="20" rounded="md" bg="white" display="flex" gap="5">
        <Image src={imageUrl} radius={5} width={100} />
        <Wrapper>
          <BrandName>{brandName}</BrandName>
          <Name>
            {name} X {quantity}
          </Name>
        </Wrapper>
      </Box>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  border-top: 8px solid rgb(237, 237, 237);
`;
const Title = styled.div`
  font-weight: bold;
  margin: 20px 0;
`;
const Wrapper = styled.div``;
const BrandName = styled.div`
  font-size: 14px;
  font-color: gray;
`;
const Name = styled.div`
  font-size: 15px;
`;
