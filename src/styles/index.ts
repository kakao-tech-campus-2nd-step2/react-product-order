import styled from '@emotion/styled';
import './reset.css';

export * as vars from './variants';

export const ErrorMessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;

export const StyledMain = styled.main`
  width: 100%;
  max-width: 900px;
  border-left: 1px solid rgb(229, 229, 229);
`;
