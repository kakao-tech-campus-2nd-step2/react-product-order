import { Textarea } from '@chakra-ui/react'
import styled from '@emotion/styled';

export const MainOption = () => {
    return (
        <Wrapper>
            <InsideWrapper>
                <MessageWrapper>
                    <MessageTitle>
                        <Title>나에게 주는 선물</Title>
                    </MessageTitle>
                    <MessageContent>
                        <Content>
                            <Textarea size='md' placeholder='선물과 함께 보낼 메시지를 적어보세요' />
                        </Content>
                    </MessageContent>
                </MessageWrapper>
                <Border />
                <HistoryWrapper>
                    <HistoryTitle>선물내역</HistoryTitle>
                    <Space />
                    <History>
                        <HistoryBox>
                            <HistoryImg><Image width={86} src="https://st.kakaocdn.net/product/gift/product/20240703140657_19263fd5455146b0a308a4e0d6bacc6a.png" alt="img" /></HistoryImg>
                            <HistoryContent>
                                <HistoryContentTitle>산타마리아노벨라</HistoryContentTitle>
                                <HistoryContentDescription>
                                    [단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1) X 1개
                                </HistoryContentDescription>
                            </HistoryContent>
                        </HistoryBox>
                    </History>
                </HistoryWrapper>
            </InsideWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.main`
  width: 100%;
  max-width: 900px;
`;

const InsideWrapper = styled.div`
  border-left: 1px solid rgb(229, 229, 229);
  height: calc(-54px + 100vh);
`

const MessageWrapper = styled.section`
  width: 100%;
  padding: 44px 0px 32px;
`

const HistoryWrapper = styled.section`
  width: 100%;
  padding: 16px;
`

const MessageTitle = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
`

const Title = styled.span`
  font-size: 18px;
  line-height: 21px;
  color: rgb(34, 34, 34);
  box-sizing: border-box;
  font-weight: 700;
`

const MessageContent = styled.div`
  width: 100%;
  padding: 14px 30px;
`

const Content = styled.div`
  width: 100%;
  padding: 12px 30px 16px;
`

const Border = styled.div`
  width: 100%;
  background-color: rgb(237, 237, 237);
  height: 8px;
`

const HistoryTitle = styled.span`
  font-size: 15px;
  line-height: 24px;
  font-weight: 700;
  color: rgb(0, 0, 0);
`

const Space = styled.div`
  width: 100%;
  background-color: inherit;
  height: 16px;
`

const History = styled.div`
  width: 100%;
  padding: 20px 16px 16px;
  border-radius: 8px;
  border: 1px solid rgb(237, 237, 237);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 4px 8px;
`

const HistoryBox = styled.div`
  display: flex;
`

const HistoryImg = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
`

const HistoryContent = styled.div`
  padding-left: 8px;
`

const Image = styled.img`
  object-fit: cover;
  object-position: center center;
  border-radius: 0px;
  aspect-ratio: 1 / 1;
`

const HistoryContentTitle = styled.p`
  font-size: 13px;
  line-height: 14px;
  color: rgb(136, 136, 136);
  font-weight: 400;
`

const HistoryContentDescription = styled.p`
  font-size: 14px;
  line-height: 18px;
  margin-top: 3px;
  color: rgb(34, 34, 34);
  overflow: hidden;
  font-weight: 400;
`