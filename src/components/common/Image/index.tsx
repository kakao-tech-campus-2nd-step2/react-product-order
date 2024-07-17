import styled from '@emotion/styled';

type Props = {
  radius?: 'circle' | number;
  ratio?: 'square' | 'auto' | number;
  maxWidth?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const Image = ({ ...props }: Props) => <Wrapper {...props} />;

const Wrapper = styled.img<Pick<Props, 'ratio' | 'radius' | 'maxWidth'>>(
  {
    objectFit: 'cover',
    objectPosition: 'center',
  },
  ({ maxWidth }) => {
    if (maxWidth) {
      return {
        maxWidth: maxWidth,
      };
    }
  },
  ({ radius = 0 }) => {
    if (radius === 'circle') {
      return {
        borderRadius: '50%',
      };
    }

    if (typeof radius === 'number') {
      return {
        borderRadius: `${radius}px`,
      };
    }
  },
  ({ ratio = 'auto' }) => {
    if (ratio === 'square') {
      return {
        aspectRatio: '1 / 1',
      };
    }

    if (ratio === 'auto') {
      return {
        aspectRatio: 'auto',
      };
    }

    if (typeof ratio === 'number') {
      return {
        aspectRatio: `${ratio}`,
      };
    }
  },
);
