import type { Meta, StoryObj, ArgTypes } from '@storybook/preact';
import { Input } from './Input';
import { ClockIcon } from '../Icons/ClockIcon';
import { useState } from 'preact/hooks';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    success: {
      control: 'boolean',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show optional icon',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
  } as ArgTypes,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '100%', padding: '20px', minWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Booker: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>(args.value || '');
    return (
      <div className="brand-booker max-w-sm mx-auto">
        <Input
          {...(args as any)}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          icon={args.showIcon ? <ClockIcon /> : undefined}
          brand="booker"
        />
      </div>
    );
  },
  args: {
    label: 'Input label',
    placeholder: 'Placeholder',
    required: true,
    disabled: false,
    error: false,
    success: false,
    showIcon: false,
    value: '',
  } as any,
};

export const Venus: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>(args.value || '');
    return (
      <div className="brand-venus max-w-sm mx-auto">
        <Input
          {...(args as any)}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          icon={args.showIcon ? <ClockIcon /> : undefined}
          brand="venus"
        />
      </div>
    );
  },
  args: {
    label: 'Input label',
    placeholder: 'Placeholder',
    required: true,
    disabled: false,
    error: false,
    success: false,
    showIcon: false,
    value: '',
  } as any,
};

export const AllStates: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '100%', padding: '0', minWidth: '0' }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    // Brand A (Booker) state
    const [bookerDefault, setBookerDefault] = useState<string>('');
    const [bookerFocus, setBookerFocus] = useState<string>('');
    const [bookerFilled, setBookerFilled] = useState<string>('Placeholder');
    const [bookerDisabled] = useState<string>('Input label');
    const [bookerError, setBookerError] = useState<string>('Placeholder');
    const [bookerSuccess, setBookerSuccess] = useState<string>('Placeholder');
    
    // Brand B (Venus) state
    const [venusDefault, setVenusDefault] = useState<string>('');
    const [venusFocus, setVenusFocus] = useState<string>('');
    const [venusFilled, setVenusFilled] = useState<string>('Placeholder');
    const [venusDisabled] = useState<string>('Input label');
    const [venusError, setVenusError] = useState<string>('Placeholder');
    const [venusSuccess, setVenusSuccess] = useState<string>('Placeholder');

    return (
    <div style={{ width: '100%', maxWidth: '100%', margin: '0', boxSizing: 'border-box', overflowX: 'hidden', position: 'relative' }} className="bg-white min-h-screen px-2 md:px-8 py-4 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', margin: '0' }}>
      {/* Brand A - Booker */}
      <div className="brand-booker space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-black">Brand A - Booker</h2>
          
          {/* Default State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Default State</h3>
            <div className="space-y-4">
              <Input
                label="Input label"
                placeholder="Placeholder"
                value={bookerDefault}
                onChange={setBookerDefault}
                required={true}
                brand="booker"
              />
            </div>
          </div>

          {/* Focus State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Focus State (A11y)</h3>
            <p className="text-sm text-gray-500 mb-2">Use Tab key to focus on the input</p>
            <div className="space-y-4">
              <Input
                label="Label"
                placeholder="Placeholder"
                value={bookerFocus}
                onChange={setBookerFocus}
                required={true}
                brand="booker"
              />
            </div>
          </div>

          {/* Filled State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Filled State</h3>
            <div className="space-y-4">
              <Input
                label="Label"
                placeholder="Placeholder"
                value={bookerFilled}
                onChange={setBookerFilled}
                required={true}
                brand="booker"
              />
            </div>
          </div>

          {/* Disabled State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Disabled State</h3>
            <div className="space-y-4">
              <Input
                label="Label"
                placeholder="Placeholder"
                value={bookerDisabled}
                required={true}
                disabled={true}
                brand="booker"
              />
            </div>
          </div>

          {/* Error State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Error State</h3>
            <div className="space-y-4">
              <Input
                label="Label"
                placeholder="Placeholder"
                value={bookerError}
                onChange={setBookerError}
                required={true}
                error={true}
                brand="booker"
              />
            </div>
          </div>

          {/* Success State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Success State</h3>
            <div className="space-y-4">
              <Input
                label="Label"
                placeholder="Placeholder"
                value={bookerSuccess}
                onChange={setBookerSuccess}
                required={true}
                success={true}
                brand="booker"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand B - Venus */}
      <div className="brand-venus space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-black">Brand B - Venus</h2>
          
          {/* Default State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Default State</h3>
            <div className="space-y-4">
              <Input
                label="Input label"
                placeholder="Placeholder"
                value={venusDefault}
                onChange={setVenusDefault}
                required={true}
                brand="venus"
              />
            </div>
          </div>

          {/* Focus State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Focus State (A11y)</h3>
            <p className="text-sm text-gray-500 mb-2">Use Tab key to focus on the input</p>
            <div className="space-y-4">
              <Input
                label="Label"
                placeholder="Placeholder"
                value={venusFocus}
                onChange={setVenusFocus}
                required={true}
                brand="venus"
              />
            </div>
          </div>

          {/* Filled State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Filled State</h3>
            <div className="space-y-4">
              <Input
                label="Label"
                placeholder="Placeholder"
                value={venusFilled}
                onChange={setVenusFilled}
                required={true}
                brand="venus"
              />
            </div>
          </div>

          {/* Disabled State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Disabled State</h3>
            <div className="space-y-4">
              <Input
                label="Label"
                placeholder="Placeholder"
                value={venusDisabled}
                required={true}
                disabled={true}
                brand="venus"
              />
            </div>
          </div>

          {/* Error State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Error State</h3>
            <div className="space-y-4">
              <Input
                label="Label"
                placeholder="Placeholder"
                value={venusError}
                onChange={setVenusError}
                required={true}
                error={true}
                brand="venus"
              />
            </div>
          </div>

          {/* Success State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Success State</h3>
            <div className="space-y-4">
              <Input
                label="Label"
                placeholder="Placeholder"
                value={venusSuccess}
                onChange={setVenusSuccess}
                required={true}
                success={true}
                brand="venus"
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    );
  },
};
