import { CSSObject, css } from '@emotion/react';

import { colors } from '@/styles/variants/theme';

export const containerStyle = css({
  padding: '3rem 4rem',
});

export const textAreaContainerStyle = css({
  position: 'relative',
  width: '100%',
});

export const textAreaStyle = css({
  height: '6.5rem',
});

export const textLengthStyle = (isMaxLength: boolean) => {
  const defaultStyle: CSSObject = {
    position: 'absolute',
    bottom: '-1.2rem',
    right: '0',
  };

  if (isMaxLength) {
    return css({
      ...defaultStyle,
      color: colors.red,
    });
  }

  return css({ ...defaultStyle });
};
