import styled from '@emotion/styled';

import { Image } from '@/components/common/Image';

type Props = {
  name: string;
  imageURL: string;
  brandName: string; // brandInfo.name
  quantity: number;
};

export const Main = ({ name, imageURL, brandName, quantity }: Props) => {
  return (
    <StyledMain>
      <MessageContainer>
        <TextContainer>
          <Text>나에게 주는 선물</Text>
        </TextContainer>
        <MessageArea
          name="messageCardTextMessage"
          placeholder="선물과 함께 보낼 메시지를 적어보세요"
        />
      </MessageContainer>
      <div style={{ width: '100%', backgroundColor: 'rgb(237, 237, 237)', height: '8px' }} />
      <ProductInfo>
        <span>선물내역</span>
        <div style={{ height: '16px' }} />
        <div>
          <div>
            <Image src={imageURL} alt={`${name} 썸네일`} width="86px" />
          </div>
          <div>
            <p>{brandName}</p>
            <p>
              {name} X {quantity}
            </p>
          </div>
        </div>
      </ProductInfo>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  width: 100%;
  max-width: 900px;

  border-left: 1px solid rgb(229, 229, 229);
`;

const MessageContainer = styled.section`
  width: 100%;
  padding: 44px 0px 32px;
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  font-size: 18px;
  line-height: 21px;
  color: rgb(34, 34, 34);
  box-sizing: border-box;
  font-weight: 700;
`;

const MessageArea = styled.textarea`
  width: 100%;
  margin: 14px 30px;
  padding: 12px 30px 16px;

  width: 100%;
  font-size: var(--input-font-size);
  padding-inline-start: var(--input-padding);
  padding-inline-end: var(--input-padding);
  border-radius: var(--input-border-radius);
  outline: transparent solid 2px;
  outline-offset: 2px;
  position: relative;
  appearance: none;
  transition-property: var(--chakra-transition-property-common);
  transition-duration: var(--chakra-transition-duration-normal);
  padding-top: var(--chakra-space-2);
  padding-bottom: var(--chakra-space-2);
  min-height: var(--chakra-sizes-20);
  line-height: var(--chakra-lineHeights-short);
  vertical-align: top;
  --input-font-size: var(--chakra-fontSizes-md);
  --input-padding: var(--chakra-space-4);
  --input-border-radius: var(--chakra-radii-md);
  --input-height: var(--chakra-sizes-10);
  border-width: 2px;
  border-style: solid;
  border-image: initial;
  border-color: var(--chakra-colors-transparent);
  background: var(--chakra-colors-gray-100);
  resize: none;
  height: 100px;
`;

const ProductInfo = styled.section`
  width: 100%;
  padding: 16px;
`;
