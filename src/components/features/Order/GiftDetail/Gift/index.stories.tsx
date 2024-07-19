import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@assets/styles';
import Gift from '.';

const meta: Meta<typeof Gift> = {
  title: 'features/Order/GiftDetail/Gift',
  component: Gift,
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

type Story = StoryObj<typeof Gift>;

export const Default: Story = {};
