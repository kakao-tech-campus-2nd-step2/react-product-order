import { useEffect } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import BaseLayout from '@/layouts/BaseLayout';

import { Alert } from '@/components/Alert';
import { Content } from '@/components/Content';
import { Divider } from '@/components/ui/Divider';
import { Form } from '@/components/ui/Form';

import { GiftSection } from './components/GiftSection';
import { PaymentSection } from './components/PaymentSection';
import { useOrderForm } from './hooks/useOrderForm';

export const OrderPage = () => {
  const { form, handleSubmit, alertMessage, setAlertMessage } = useOrderForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (alertMessage.message) {
      onOpen();
    } else {
      onClose();
    }
  }, [alertMessage, onClose, onOpen]);

  useEffect(() => {
    if (!isOpen) {
      setAlertMessage({ isSuccess: true, message: '' });
    }
  }, [setAlertMessage, isOpen]);

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
      {isOpen && (
        <Alert
          message={alertMessage.message}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </BaseLayout>
  );
};
