import type { Meta, StoryObj, ArgTypes } from '@storybook/preact';
import { Dropdown } from './Dropdown';
import { ClockIcon } from '../Icons/ClockIcon';
import { useState } from 'preact/hooks';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
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
    showIcon: {
      control: 'boolean',
      description: 'Show optional icon',
    },
    value: {
      control: 'text',
      description: 'Selected value',
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
type Story = StoryObj<typeof Dropdown>;

// Extended args type for Storybook controls
type StoryArgs = {
  showIcon?: boolean;
  value?: string;
};

const defaultOptions = [
  { value: 'retail', label: 'Retail Store Owner' },
  { value: 'convenience', label: 'Convenience Shop' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'catering', label: 'Catering & Events' },
  { value: 'online', label: 'Online/Delivery Only' },
];

export const Booker: Story = {
  render: (args) => {
    const storyArgs = args as unknown as StoryArgs;
    const [value, setValue] = useState<string | undefined>(storyArgs.value);
    return (
      <div className="brand-booker max-w-sm mx-auto">
        <Dropdown
          {...(args as any)}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          icon={storyArgs.showIcon ? <ClockIcon /> : undefined}
          brand="booker"
        />
      </div>
    );
  },
  args: {
    label: 'Label',
    placeholder: 'Select an option',
    options: defaultOptions,
    required: true,
    disabled: false,
    error: false,
    showIcon: true,
    value: undefined,
  } as any,
};

export const Venus: Story = {
  render: (args) => {
    const storyArgs = args as unknown as StoryArgs;
    const [value, setValue] = useState<string | undefined>(storyArgs.value);
    return (
      <div className="brand-venus max-w-sm mx-auto">
        <Dropdown
          {...(args as any)}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          icon={storyArgs.showIcon ? <ClockIcon /> : undefined}
          brand="venus"
        />
      </div>
    );
  },
  args: {
    label: 'Label',
    placeholder: 'Select an option',
    options: defaultOptions,
    required: true,
    disabled: false,
    error: false,
    showIcon: true,
    value: undefined,
  } as any,
};

export const AllStates: Story = {
  render: () => {
    // Brand A (Booker) state
    const [bookerDefault, setBookerDefault] = useState<string | undefined>(undefined);
    const [bookerFocused, setBookerFocused] = useState<string | undefined>(undefined);
    const [bookerWithIcon, setBookerWithIcon] = useState<string | undefined>(undefined);
    const [bookerWithoutIcon, setBookerWithoutIcon] = useState<string | undefined>(undefined);
    const [bookerSelected, setBookerSelected] = useState<string | undefined>('retail');
    
    // Brand B (Venus) state
    const [venusDefault, setVenusDefault] = useState<string | undefined>(undefined);
    const [venusFocused, setVenusFocused] = useState<string | undefined>(undefined);
    const [venusWithIcon, setVenusWithIcon] = useState<string | undefined>(undefined);
    const [venusWithoutIcon, setVenusWithoutIcon] = useState<string | undefined>(undefined);
    const [venusSelected, setVenusSelected] = useState<string | undefined>('retail');

    return (
    <div className="p-8 bg-white min-h-screen max-w-full overflow-x-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Brand A - Booker */}
      <div className="brand-booker space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-black">Brand A - Booker</h2>
          
          {/* Default State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Default State</h3>
            <div className="space-y-4">
              <Dropdown
                label="Label"
                placeholder="Select an option"
                options={defaultOptions}
                value={bookerDefault}
                onChange={setBookerDefault}
                required={true}
                icon={<ClockIcon />}
                brand="booker"
              />
            </div>
          </div>

          {/* Focused State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Focused State (A11y)</h3>
            <p className="text-sm text-gray-500 mb-2">Use Tab key to focus on the dropdown to see the keyboard focus state</p>
            <div className="space-y-4">
              <Dropdown
                label="Label"
                placeholder="Select an option"
                options={defaultOptions}
                value={bookerFocused}
                onChange={setBookerFocused}
                required={true}
                icon={<ClockIcon />}
                brand="booker"
              />
            </div>
          </div>

          {/* With Icon */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">With Icon</h3>
            <div className="space-y-4">
              <Dropdown
                label="Label"
                placeholder="Select an option"
                options={defaultOptions}
                value={bookerWithIcon}
                onChange={setBookerWithIcon}
                required={true}
                icon={<ClockIcon />}
                brand="booker"
              />
            </div>
          </div>

          {/* Without Icon */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Without Icon</h3>
            <div className="space-y-4">
              <Dropdown
                label="Label"
                placeholder="Select an option"
                options={defaultOptions}
                value={bookerWithoutIcon}
                onChange={setBookerWithoutIcon}
                required={true}
                brand="booker"
              />
            </div>
          </div>

          {/* Selected State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Selected State</h3>
            <div className="space-y-4">
              <Dropdown
                label="Label"
                placeholder="Select an option"
                options={defaultOptions}
                value={bookerSelected}
                onChange={setBookerSelected}
                required={true}
                icon={<ClockIcon />}
                brand="booker"
              />
            </div>
          </div>

          {/* Disabled State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Disabled State</h3>
            <div className="space-y-4">
              <Dropdown
                label="Label"
                placeholder="Select an option"
                options={defaultOptions}
                value="retail"
                required={true}
                disabled={true}
                icon={<ClockIcon />}
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
              <Dropdown
                label="Label"
                placeholder="Select an option"
                options={defaultOptions}
                value={venusDefault}
                onChange={setVenusDefault}
                required={true}
                icon={<ClockIcon />}
                brand="venus"
              />
            </div>
          </div>

          {/* Focused State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Focused State (A11y)</h3>
            <p className="text-sm text-gray-500 mb-2">Use Tab key to focus on the dropdown to see the keyboard focus state</p>
            <div className="space-y-4">
              <Dropdown
                label="Label"
                placeholder="Select an option"
                options={defaultOptions}
                value={venusFocused}
                onChange={setVenusFocused}
                required={true}
                icon={<ClockIcon />}
                brand="venus"
              />
            </div>
          </div>

          {/* With Icon */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">With Icon</h3>
            <div className="space-y-4">
              <Dropdown
                label="Label"
                placeholder="Select an option"
                options={defaultOptions}
                value={venusWithIcon}
                onChange={setVenusWithIcon}
                required={true}
                icon={<ClockIcon />}
                brand="venus"
              />
            </div>
          </div>

          {/* Without Icon */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Without Icon</h3>
            <div className="space-y-4">
              <Dropdown
                label="Label"
                placeholder="Select an option"
                options={defaultOptions}
                value={venusWithoutIcon}
                onChange={setVenusWithoutIcon}
                required={true}
                brand="venus"
              />
            </div>
          </div>

          {/* Selected State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Selected State</h3>
            <div className="space-y-4">
              <Dropdown
                label="Label"
                placeholder="Select an option"
                options={defaultOptions}
                value={venusSelected}
                onChange={setVenusSelected}
                required={true}
                icon={<ClockIcon />}
                brand="venus"
              />
            </div>
          </div>

          {/* Disabled State */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Disabled State</h3>
            <div className="space-y-4">
              <Dropdown
                label="Label"
                placeholder="Select an option"
                options={defaultOptions}
                value="retail"
                required={true}
                disabled={true}
                icon={<ClockIcon />}
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
