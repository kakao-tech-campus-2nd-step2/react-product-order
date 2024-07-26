import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@assets/styles';
import GiftDetail from '.';

const meta: Meta<typeof GiftDetail> = {
  title: 'features/Order/GiftDetail',
  component: GiftDetail,
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

type Story = StoryObj<typeof GiftDetail>;

export const Default: Story = {};
