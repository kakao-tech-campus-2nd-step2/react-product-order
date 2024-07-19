import BaseLayout from '@/layouts/BaseLayout';

import { Content } from '@/components/Content';
import { Divider } from '@/components/ui/Divider';
import { Form } from '@/components/ui/Form';

import { GiftSection } from './components/GiftSection';
import { PaymentSection } from './components/PaymentSection';
import { useOrderForm } from './hooks/useOrderForm';

export const OrderPage = () => {
  const { form, handleSubmit } = useOrderForm();

  return (
    <BaseLayout>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <Content height="92vh" maxWidth="1280px">
            <Divider direction="vertical" />
            <GiftSection form={form} />
            <Divider direction="vertical" />
            <PaymentSection form={form} />
            <Divider direction="vertical" />
          </Content>
        </form>
      </Form>
    </BaseLayout>
  );
};
