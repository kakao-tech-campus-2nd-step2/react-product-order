import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { OrderSchema } from '@/schema/index';

import { FormField } from '@/components/ui/Form';
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
  form: ReturnType<typeof useForm<z.infer<typeof OrderSchema>>>;
};

export const GiftMessage = ({ form }: GiftMessageProps) => {
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
      <FormField
        control={form.control}
        name="gitfMessage"
        render={({ field }) => {
          const textLength = field.value.length;

          return (
            <div css={textAreaContainerStyle}>
              <TextArea
                value={field.value}
                onChange={field.onChange}
                placeholder="선물과 함께 보낼 메세지를 적어보세요"
                css={textAreaStyle}
              />
              <span css={textLengthStyle(textLength > 100)}>
                {textLength}/100
              </span>
            </div>
          );
        }}
      />
    </Container>
  );
};
