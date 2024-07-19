import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { OrderSchema } from '@/schema/index';

import { Divider } from '@/components/ui/Divider';
import { Container } from '@/components/ui/Layout/Container';

import { GiftDetail } from './GiftDetail';
import { GiftMessage } from './GiftMessage';
import { dividerStyle } from './styles';

type GiftSectionProps = {
  form: ReturnType<typeof useForm<z.infer<typeof OrderSchema>>>;
};

export const GiftSection = ({ form }: GiftSectionProps) => {
  return (
    <Container flexDirection="column">
      <GiftMessage form={form} />
      <Divider css={dividerStyle} />
      <GiftDetail />
    </Container>
  );
};
