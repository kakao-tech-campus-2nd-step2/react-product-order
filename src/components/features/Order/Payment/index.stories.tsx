import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@assets/styles';
import Payment from '.';

const meta: Meta<typeof Payment> = {
  title: 'features/Order/Payment',
  component: Payment,
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

type Story = StoryObj<typeof Payment>;

export const Default: Story = {};
