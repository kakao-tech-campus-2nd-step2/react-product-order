import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@assets/styles';
import OrderMessage from '.';

const meta: Meta<typeof OrderMessage> = {
  title: 'features/Order/OrderMessage',
  component: OrderMessage,
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

type Story = StoryObj<typeof OrderMessage>;

export const Default: Story = {};
