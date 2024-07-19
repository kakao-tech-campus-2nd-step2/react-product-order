import * as S from './styles';
import { Img, Text } from '@chakra-ui/react';

type Props = {
  imageSrc: string;
  title: string;
  amount: number;
};

const ProductInfoSection = ({ imageSrc, title, amount }: Props) => {
  return (
    <S.MainBox>
      <S.ArticleBox>
        <S.DetailBox>
          <Img width='100%' maxWidth='450px' src={imageSrc} alt={title} />
          <S.TitleBox>
            <S.Title>{title}</S.Title>
            <Text
              width='100%'
              fontSize='30px'
              fontWeight='400'
              paddingTop='16px'
              minHeight='120px'
              lineHeight='120px'
              color='rgb(34, 34, 34)'
            >
              {amount}원
            </Text>
            <S.DividerBar />
            <Text
              paddingTop='24px'
              paddingLeft='12px'
              paddingRight='12px'
              paddingBottom='24px'
              fontSize='14px'
              fontWeight='700'
              color='rgb(17, 17, 17)'
            >
              카톡 친구가 아니어도 선물 코드를 선물 할 수 있어요!
            </Text>
            <S.DividerBar />
          </S.TitleBox>
        </S.DetailBox>
      </S.ArticleBox>
    </S.MainBox>
  );
};

export default ProductInfoSection;
