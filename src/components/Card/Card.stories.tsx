import type { Meta, StoryObj, ArgTypes } from '@storybook/preact';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary'],
    },
    title: {
      control: 'text',
    },
    buttonLabel: {
      control: 'text',
    },
  } as ArgTypes,
  decorators: [
    (Story) => (
      <div style={{ width: '800px', maxWidth: '100%', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Booker: Story = {
  render: (args) => (
    <div className="brand-booker">
      <Card {...(args as any)} />
    </div>
  ),
  args: {
    variant: 'primary',
    title: 'Join the family.',
    buttonLabel: 'Join',
  } as any,
};

export const Venus: Story = {
  render: (args) => (
    <div className="brand-venus">
      <Card {...(args as any)} />
    </div>
  ),
  args: {
    variant: 'primary',
    title: 'Join the family.',
    buttonLabel: 'Join',
    buttonVariant: 'tertiary',
  } as any,
};
