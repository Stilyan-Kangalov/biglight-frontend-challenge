import type { Meta, StoryObj } from '@storybook/preact';
import { LoginDrawer } from './LoginDrawer';

const meta: Meta<typeof LoginDrawer> = {
  title: 'Components/LoginDrawer',
  component: LoginDrawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoginDrawer>;

export const Booker: Story = {
  render: (args) => (
    <div style={{ padding: '40px' }}>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Click the button below to open the login drawer
      </p>
      <LoginDrawer
        {...args}
        brand="booker"
        onContinue={(customerType, email) => {
          console.log('Continue clicked:', { customerType, email });
          alert(`Login attempt:\nCustomer Type: ${customerType}\nEmail: ${email}`);
        }}
        onPasswordLogin={() => console.log('Password login clicked')}
        onJoinFamily={() => console.log('Join family clicked')}
      />
    </div>
  ),
  args: {
    buttonLabel: 'Log in',
  },
};

export const Venus: Story = {
  render: (args) => (
    <div style={{ padding: '40px' }}>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Click the button below to open the login drawer
      </p>
      <LoginDrawer
        {...args}
        brand="venus"
        onContinue={(customerType, email) => {
          console.log('Continue clicked:', { customerType, email });
          alert(`Login attempt:\nCustomer Type: ${customerType}\nEmail: ${email}`);
        }}
        onPasswordLogin={() => console.log('Password login clicked')}
        onJoinFamily={() => console.log('Join family clicked')}
      />
    </div>
  ),
  args: {
    buttonLabel: 'Log in',
  },
};

export const BothBrands: Story = {
  render: () => (
    <div style={{ padding: '40px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>Brand A - Booker</h3>
        <LoginDrawer
          brand="booker"
          buttonLabel="Log in"
          onContinue={(customerType, email) => console.log('Booker:', { customerType, email })}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>Brand B - Venus</h3>
        <LoginDrawer
          brand="venus"
          buttonLabel="Log in"
          onContinue={(customerType, email) => console.log('Venus:', { customerType, email })}
        />
      </div>
    </div>
  ),
};
