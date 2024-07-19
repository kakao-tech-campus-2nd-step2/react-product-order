import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@assets/styles';
import ReceiptForm from '.';

const meta: Meta<typeof ReceiptForm> = {
  title: 'features/Order/Payment/ReceiptForm',
  component: ReceiptForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ChakraProvider>
        <GlobalStyles />
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ReceiptForm>;

export const Default: Story = {};
