import type { Meta, StoryObj } from '@storybook/react';

import NumberField from './NumberField';

const meta = {
    title: 'Common/Form/Input/NumberField',
    tags: ['autodocs'],
    component: NumberField,
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
