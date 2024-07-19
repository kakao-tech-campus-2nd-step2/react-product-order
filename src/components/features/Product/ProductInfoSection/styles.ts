import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const MainBox = styled.main`
  width: 100%;
  max-width: 900px;
`;

export const ArticleBox = styled.article`
  width: 100%;
  padding: 16px 16px 60px;

  @media screen and (min-width: 768px) {
    padding: 32px 32px 80px;
  }
`;

export const DetailBox = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export const TitleBox = styled.div`
  width: 100%;

  @media screen and (min-width: 768px) {
    padding-left: 24px;
  }
`;

export const Title = styled.h2`
  padding-top: 24px;
  font-size: 24px;
  line-height: 33px;
  color: rgb(17, 17, 17);
  font-weight: 400;
  word-break: break-all;
`;

export const DividerBar = styled(Divider)`
  color: rgb(245, 245, 245);
  border-width: 0px 0px 1px;
  border-image: initial;
`;
