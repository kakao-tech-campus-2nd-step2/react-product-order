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

type TextProps = {
  fontSize?: string;
  lineHeight?: string;
  color?: string;
  fontWeight?: string;
  overflow?: string;
};

export const Text = styled.span<TextProps>`
  font-size: ${({ fontSize }) => fontSize || '18px'};
  line-height: ${({ lineHeight }) => lineHeight || '21px'};
  color: ${({ color }) => color || '#000'};
  box-sizing: border-box;
  font-weight: ${({ fontWeight }) => (fontWeight === 'bold' || '700' ? '700' : '400')};
  overflow: ${({ overflow }) => overflow || 'none'};
`;
