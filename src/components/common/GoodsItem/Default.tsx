import { useNavigate } from 'react-router-dom';

import { Image } from '@/components/common/Image';
import styled from '@emotion/styled';

export type DefaultGoodsItemsProps = {
  imageSrc: string;
  subtitle: string;
  title: string;
  amount: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const DefaultGoodsItems = ({
  imageSrc,
  subtitle,
  title,
  amount,
  id,
  ...props
}: DefaultGoodsItemsProps) => {
  const navigate = useNavigate();

  const handlerDetail = () => {
    navigate(`/product/${id}`, {
      state: {
        id,
        title,
        imageSrc,
        amount,
        subtitle,
      },
    });
  };

  return (
    <Wrapper {...props} onClick={handlerDetail}>
      <Image
        src={imageSrc}
        alt={`${title} 소개`}
        width='100%'
        ratio='square'
        radius={4}
      />
      <InfoWrapper>
        <Subtitle>{subtitle}</Subtitle>
        <Title>{title}</Title>
        <Amount>
          {amount}
          <span>원</span>
        </Amount>
      </InfoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const InfoWrapper = styled.div`
  width: 100%;
  padding-top: 12px;
`;

const Subtitle = styled.p`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #999;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.h3`
  width: 100%;
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Amount = styled.p`
  padding-top: 8px;
  font-size: 20px;
  line-height: 30px;
  color: #222;
  font-weight: 700;
  word-break: break-word;

  & > span {
    font-weight: 400;
  }
`;
