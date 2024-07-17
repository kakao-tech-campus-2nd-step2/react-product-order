import styled from '@emotion/styled';

type Props = {
  src: string;
  alt: string;
};

const ProductImage = ({ src, alt }: Props) => {
  return <Image src={src} alt={alt} />;
};

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;

  @media (min-width: 768px) {
    max-width: 500px;
    height: auto;
  }
`;

export default ProductImage;
