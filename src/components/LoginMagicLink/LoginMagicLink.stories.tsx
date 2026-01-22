import type { Meta, StoryObj } from '@storybook/preact';
import { LoginMagicLink } from './LoginMagicLink';

const meta: Meta<typeof LoginMagicLink> = {
  title: 'Components/LoginMagicLink',
  component: LoginMagicLink,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '0 20px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LoginMagicLink>;

export const Booker: Story = {
  render: (args) => (
    <LoginMagicLink
      {...args}
      brand="booker"
      onClose={() => console.log('Close clicked')}
      onContinue={(customerType, email) => console.log('Continue:', customerType, email)}
      onPasswordLogin={() => console.log('Password login clicked')}
      onJoinFamily={() => console.log('Join family clicked')}
    />
  ),
  args: {
    title: 'Log into your account',
    subtitle: 'Please enter your email for a one-time-only code',
    customerTypeLabel: 'Customer type',
    emailLabel: 'Email',
    continueButtonLabel: 'Continue',
    passwordLoginLabel: 'Login with your password',
    cardTitle: 'Join the family.',
    cardButtonLabel: 'Become a member',
  },
};

export const Venus: Story = {
  render: (args) => (
    <LoginMagicLink
      {...args}
      brand="venus"
      onClose={() => console.log('Close clicked')}
      onContinue={(customerType, email) => console.log('Continue:', customerType, email)}
      onPasswordLogin={() => console.log('Password login clicked')}
      onJoinFamily={() => console.log('Join family clicked')}
    />
  ),
  args: {
    title: 'Log into your account',
    subtitle: 'Please enter your email for a one-time-only code',
    customerTypeLabel: 'Customer type',
    emailLabel: 'Email',
    continueButtonLabel: 'Continue',
    passwordLoginLabel: 'Login with your password',
    cardTitle: 'Join the family.',
    cardButtonLabel: 'Become a member',
  },
};

export const BothBrands: Story = {
  render: () => (
    <div className="flex gap-8 flex-wrap justify-center">
      <div>
        <h2 className="text-xl font-bold mb-4 text-center text-black">Brand A - Booker</h2>
        <LoginMagicLink
          brand="booker"
          onClose={() => console.log('Close clicked')}
          onContinue={(customerType, email) => console.log('Continue:', customerType, email)}
          onPasswordLogin={() => console.log('Password login clicked')}
          onJoinFamily={() => console.log('Join family clicked')}
        />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4 text-center text-black">Brand B - Venus</h2>
        <LoginMagicLink
          brand="venus"
          onClose={() => console.log('Close clicked')}
          onContinue={(customerType, email) => console.log('Continue:', customerType, email)}
          onPasswordLogin={() => console.log('Password login clicked')}
          onJoinFamily={() => console.log('Join family clicked')}
        />
      </div>
    </div>
  ),
};
