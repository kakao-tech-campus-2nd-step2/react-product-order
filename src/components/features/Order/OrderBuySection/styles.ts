import styled from '@emotion/styled';

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
