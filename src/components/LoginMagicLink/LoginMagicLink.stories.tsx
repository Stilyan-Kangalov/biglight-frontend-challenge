import type { Meta, StoryObj } from '@storybook/preact';
import { within } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { LoginMagicLink } from './LoginMagicLink';
import type { LoginMagicLinkProps } from './LoginMagicLink.types';

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
  render: (args) => {
    const storyArgs = args as unknown as LoginMagicLinkProps;
    return (
      <LoginMagicLink
        {...storyArgs}
        brand="booker"
        onClose={() => console.log('Close clicked')}
        onContinue={(customerType, email) => console.log('Continue:', customerType, email)}
        onPasswordLogin={() => console.log('Password login clicked')}
        onJoinFamily={() => console.log('Join family clicked')}
      />
    );
  },
  args: {
    title: 'Log into your account',
    subtitle: 'Please enter your email for a one-time-only code',
    customerTypeLabel: 'Customer type',
    emailLabel: 'Email',
    continueButtonLabel: 'Continue',
    passwordLoginLabel: 'Login with your password',
    cardTitle: 'Join the family.',
    cardButtonLabel: 'Become a member',
  } as any,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test Case 1: "Continue" button is disabled on initial render
    const continueButton = canvas.getByRole('button', { name: /continue/i }) as HTMLButtonElement;
    if (!continueButton.disabled) {
      throw new Error('Continue button should be disabled on initial render');
    }

    // Test Case 2: Selecting a "Customer type" and typing a valid email enables the "Continue" button
    // Find all buttons and get the one that's the dropdown (has aria-haspopup)
    const buttons = canvas.getAllByRole('button');
    const dropdownButton = buttons.find(btn => btn.getAttribute('aria-haspopup') === 'listbox');
    
    if (dropdownButton) {
      await user.click(dropdownButton);
    }
    
    // Wait for dropdown menu to appear and select an option
    const option = await canvas.findByText('Retail Store Owner');
    await user.click(option);

    // Find email input by role (textbox) - there should only be one textbox in the form
    const emailInput = canvas.getByRole('textbox') as HTMLInputElement;
    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');

    // Verify button is now enabled
    if (continueButton.disabled) {
      throw new Error('Continue button should be enabled after selecting customer type and entering valid email');
    }

    // Test Case 3: Clicking the "X" (clear) icon in the Email input disables the "Continue" button again
    const clearButton = canvas.getByRole('button', { name: /clear input/i });
    await user.click(clearButton);

    // Verify button is disabled again
    if (!continueButton.disabled) {
      throw new Error('Continue button should be disabled after clearing email input');
    }
  },
};

export const Venus: Story = {
  render: (args) => {
    const storyArgs = args as unknown as LoginMagicLinkProps;
    return (
      <LoginMagicLink
        {...storyArgs}
        brand="venus"
        onClose={() => console.log('Close clicked')}
        onContinue={(customerType, email) => console.log('Continue:', customerType, email)}
        onPasswordLogin={() => console.log('Password login clicked')}
        onJoinFamily={() => console.log('Join family clicked')}
      />
    );
  },
  args: {
    title: 'Log into your account',
    subtitle: 'Please enter your email for a one-time-only code',
    customerTypeLabel: 'Customer type',
    emailLabel: 'Email',
    continueButtonLabel: 'Continue',
    passwordLoginLabel: 'Login with your password',
    cardTitle: 'Join the family.',
    cardButtonLabel: 'Become a member',
  } as any,
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
