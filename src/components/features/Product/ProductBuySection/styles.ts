import styled from '@emotion/styled';

export const AsideBox = styled.aside`
  display: none;
  position: sticky;
  top: 54px;
  width: 100%;
  max-width: 360px;
  height: calc(-54px + 100vh);

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

export const AsideWrapper = styled.div`
  width: 100%;
  padding: 30px 12px 30px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

export const ProductNumberBox = styled.div`
  width: 100%;
  padding: 12px 14px 16px;
  border: 1px solid rgb(237, 237, 237);
  border-radius: 2px;
`;

export const ButtonBox = styled.div`
  padding: 12px 0px 0px;
`;

export const ButtonItem = styled.button`
  width: 100%;
  border-radius: 4px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 200ms ease 0s;
  height: 60px;
  font-size: 16px;
  color: rgb(255, 255, 255);
  background-color: rgb(17, 17, 17);
`;

export const TotalPriceBox = styled.div`
  margin-bottom: 20px;
  padding: 18px 20px;
  border-radius: 4px;
  background-color: rgb(245, 245, 245);
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: rgb(17, 17, 17);
`;

export const PriceText = styled.span`
  font-size: 20px;
  letter-spacing: -0.02em;
`;

export const ItemNumberBox = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 8px;
  gap: 8px;
`;
