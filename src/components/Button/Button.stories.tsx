import type { Meta, StoryObj, ArgTypes } from '@storybook/preact';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  } as ArgTypes,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Booker: Story = {
  render: (args) => (
    <div className="brand-booker">
      <Button {...(args as any)} />
    </div>
  ),
  args: {
    variant: 'primary',
    size: 'md',
  } as any,
};

export const Venus: Story = {
  render: (args) => (
    <div className="brand-venus">
      <Button {...(args as any)} />
    </div>
  ),
  args: {
    variant: 'primary',
    size: 'md',
  } as any,
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-12 p-8 bg-white min-h-screen">
      {/* Brand A - Booker */}
      <div className="brand-booker space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-black">Brand A - Booker</h2>
          
          {/* Primary Variant */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Primary Variant</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Default (md)</p>
                <Button variant="primary" size="md" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Default (lg)</p>
                <Button variant="primary" size="lg" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Disabled (md)</p>
                <Button variant="primary" size="md" disabled={true} />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Disabled (lg)</p>
  
                <Button variant="primary" size="lg" disabled={true} />
              </div>
            </div>
          </div>

          {/* Secondary Variant */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Secondary Variant</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Default (md)</p>
                <Button variant="secondary" size="md" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Default (lg)</p>
                <Button variant="secondary" size="lg" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Disabled (md)</p>
                <Button variant="secondary" size="md" disabled={true} />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Disabled (lg)</p>
                <Button variant="secondary" size="lg" disabled={true} />
              </div>
            </div>
          </div>

          {/* Tertiary Variant */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Tertiary Variant</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Default (md)</p>
                <Button variant="tertiary" size="md" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Default (lg)</p>
                <Button variant="tertiary" size="lg" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Disabled (md)</p>
                <Button variant="tertiary" size="md" disabled={true} />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Disabled (lg)</p>
                <Button variant="tertiary" size="lg" disabled={true} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand B - Venus */}
      <div className="brand-venus space-y-8 border-t-2 pt-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-black">Brand B - Venus</h2>
          
          {/* Primary Variant */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Primary Variant</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Default (md)</p>
                <Button variant="primary" size="md" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Default (lg)</p>
                <Button variant="primary" size="lg" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Disabled (md)</p>
                <Button variant="primary" size="md" disabled={true} />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Disabled (lg)</p>
                <Button variant="primary" size="lg" disabled={true} />
              </div>
            </div>
          </div>

          {/* Secondary Variant */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Secondary Variant</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Default (md)</p>
                <Button variant="secondary" size="md" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Default (lg)</p>
                <Button variant="secondary" size="lg" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Disabled (md)</p>
                <Button variant="secondary" size="md" disabled={true} />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Disabled (lg)</p>
                <Button variant="secondary" size="lg" disabled={true} />
              </div>
            </div>
          </div>

          {/* Tertiary Variant */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-black">Tertiary Variant</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Default (md)</p>
                <Button variant="tertiary" size="md" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Default (lg)</p>
                <Button variant="tertiary" size="lg" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Disabled (md)</p>
                <Button variant="tertiary" size="md" disabled={true} />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Disabled (lg)</p>
                <Button variant="tertiary" size="lg" disabled={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
