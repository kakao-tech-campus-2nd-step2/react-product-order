import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@assets/styles';
import QuantitySelector from '.';

const meta: Meta<typeof QuantitySelector> = {
  title: 'features/Product/ProductOrder/QuantitySelector',
  component: QuantitySelector,
  tags: ['autodocs'],
  decorators: (Story) => (
    <ChakraProvider>
      <GlobalStyles />
      <Story />
    </ChakraProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof QuantitySelector>;

export const Default: Story = {};
