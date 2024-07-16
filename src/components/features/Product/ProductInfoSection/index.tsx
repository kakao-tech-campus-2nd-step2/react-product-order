import * as S from './styles';
import { Img, Text } from '@chakra-ui/react';

const ProductInfoSection = ({
  Title,
  Price,
}: {
  Title: string;
  Price: number;
}) => {
  return (
    <S.MainBox>
      <S.ArticleBox>
        <S.DetailBox>
          <Img
            width='100%'
            maxWidth='450px'
            src='https://st.kakaocdn.net/product/gift/product/20240516094905_425d02258d7d4fffaccc7219285a951d.jpg'
            alt={Title}
          />
          <S.TitleBox>
            <S.Title>{Title}</S.Title>
            <Text
              width='100%'
              fontSize='30px'
              fontWeight='400'
              paddingTop='16px'
              minHeight='120px'
              lineHeight='120px'
              color='rgb(34, 34, 34)'
            >
              {Price}원
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
