import { OrderFormType } from '@/types/orderType';

import { Container } from '@/components/ui/Layout/Container';
import { Text } from '@/components/ui/Text';
import { TextArea } from '@/components/ui/TextArea';

import {
  containerStyle,
  textAreaContainerStyle,
  textAreaStyle,
  textLengthStyle,
} from './styles';

type GiftMessageProps = {
  formData: OrderFormType;
  handleInputChange: (inputField: keyof OrderFormType, value: string) => void;
};

export const GiftMessage = ({
  formData,
  handleInputChange,
}: GiftMessageProps) => {
  const textLength = formData.gitfMessage.length;

  return (
    <Container
      flexDirection="column"
      alignItems="center"
      gap="1rem"
      css={containerStyle}
    >
      <Text size="lg" isBold>
        나에게 주는 선물
      </Text>
      <div css={textAreaContainerStyle}>
        <TextArea
          placeholder="선물과 함께 보낼 메세지를 적어보세요"
          value={formData.gitfMessage}
          onChange={(e) => handleInputChange('gitfMessage', e.target.value)}
          css={textAreaStyle}
        />
        <span css={textLengthStyle(textLength > 100)}>{textLength}/100</span>
      </div>
    </Container>
  );
};
