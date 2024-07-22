import styled from '@emotion/styled';

import { Image } from '@/components/common/Image';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useMessage } from '@/context/message/MessageContext';
import { Text } from '@/styles';

type Props = {
  name: string;
  imageURL: string;
  brandName: string; // brandInfo.name
  quantity: number;
};

export const Main = ({ name, imageURL, brandName, quantity }: Props) => {
  const { message, setMessage } = useMessage();

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  return (
    <Wrapper>
      <MessageContainer>
        <TitleContainer>
          <Text fontSize="18px" lineHeight="21px" color="rgb(34, 34, 34)" fontWeight="bold">
            나에게 주는 선물
          </Text>
        </TitleContainer>
        <MessageArea
          name="messageCardTextMessage"
          placeholder="선물과 함께 보낼 메시지를 적어보세요"
          value={message}
          onChange={handleMessageChange}
        />
      </MessageContainer>
      <Spacing height={8} backgroundColor="rgb(237, 237, 237)" />
      <ProductInfoContainer>
        <Text fontSize="15px" lineHeight="14px" fontWeight="bold">
          선물내역
        </Text>
        <div style={{ backgroundColor: 'inherit', height: '16px' }} />
        <ProductInfo>
          <Image src={imageURL} alt={`${name} 썸네일`} width="86px" radius={4} ratio="square" />
          <Name>
            <Text fontSize="13px" lineHeight="14px" color="rgb(136, 136, 136)">
              {brandName}
            </Text>
            <Text fontSize="14px" lineHeight="18px" color="rgb(34, 34, 34)" overflow="hidden">
              {name} X {quantity}
            </Text>
          </Name>
        </ProductInfo>
      </ProductInfoContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-left: 1px solid #e5e5e5;
  height: calc(100vh - 54px);
`;

const MessageContainer = styled.section`
  width: 100%;
  padding: 44px 0px 32px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MessageArea = styled.textarea`
  width: 100%;
  margin: 14px 30px;
  padding: 12px 30px 16px;
  outline: transparent solid 2px;
  outline-offset: 2px;
  position: relative;
  appearance: none;
  vertical-align: top;
  border-width: 2px;
  border-style: solid;
  border-image: initial;
  resize: none;
  height: 100px;
`;

const ProductInfoContainer = styled.section`
  width: 100%;
  padding: 16px;
`;

const ProductInfo = styled.div`
  width: 100%;
  padding: 20px 16px 16px;
  border-radius: 8px;
  border: 1px solid rgb(237, 237, 237);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 4px 8px;
  display: flex;
`;

const Name = styled.div`
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
