import styled from '@emotion/styled';

export const giftBox = styled.div`
  border-left: 1px solid rgb(229, 229, 229);
  height: calc(-54 + 100vh);
`;

export const giftSection = styled.section`
  width: 100%;
  padding: 44px 0 32px;
`;

export const giftListSection = styled.section`
  width: 100%;
  padding: 16px;
`;

export const giftDetailBox = styled.div`
  width: 100%;
  padding: 20px 16px 16px;
  border-radius: 8px;
  border: 1px solid rgb(237, 237, 237);
  box-shadow: rgba(0, 0, 0, 0.02) 0 4px 8px;
`;

export const giftImgBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
`;

export const AsideTitleBox = styled.h6`
  padding: 24px 0 20px;
`;

export const OptionItems = styled.option`
  background: #fff;
`;

export const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  border-radius: 4px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 200ms ease 0s;
  height: 40px;
  font-size: 15px;
  color: rgb(17, 17, 17);
  background-color: rgb(254, 229, 0);

  @media screen and (min-width: 768px) {
    height: 60px;
    font-size: 16px;
  }
`;
