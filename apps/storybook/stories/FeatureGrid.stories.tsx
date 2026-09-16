import type { Meta, StoryObj } from '@storybook/react';
import { FeatureGrid, FeatureGridItem } from '@acme/ui';
import { Zap, Shield, Palette, Globe, Lock, Sparkles } from 'lucide-react';

const meta: Meta<typeof FeatureGrid> = {
  title: 'Marketing/FeatureGrid',
  component: FeatureGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof FeatureGrid>;

export const ThreeColumns: Story = {
  args: {
    title: 'Everything you need',
    description: 'Our design system provides all the tools you need to build beautiful products.',
    columns: 3,
    children: (
      <>
        <FeatureGridItem
          icon={<Zap className="h-6 w-6" />}
          title="Lightning Fast"
          description="Optimized for performance with minimal JavaScript and efficient rendering."
        />
        <FeatureGridItem
          icon={<Shield className="h-6 w-6" />}
          title="Accessible"
          description="WCAG 2.2 AA compliant out of the box with proper keyboard navigation."
        />
        <FeatureGridItem
          icon={<Palette className="h-6 w-6" />}
          title="Themeable"
          description="Change brands and modes without touching component code."
        />
        <FeatureGridItem
          icon={<Globe className="h-6 w-6" />}
          title="Responsive"
          description="Mobile-first design that works on every screen size."
        />
        <FeatureGridItem
          icon={<Lock className="h-6 w-6" />}
          title="Type Safe"
          description="Full TypeScript support with strict type checking."
        />
        <FeatureGridItem
          icon={<Sparkles className="h-6 w-6" />}
          title="Modern Stack"
          description="Built with React 19, Tailwind v4, and the latest best practices."
        />
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    title: 'Why choose us',
    columns: 2,
    children: (
      <>
        <FeatureGridItem
          icon={<Zap className="h-6 w-6" />}
          title="Fast Development"
          description="Ship features faster with pre-built, customizable components."
        />
        <FeatureGridItem
          icon={<Shield className="h-6 w-6" />}
          title="Battle Tested"
          description="Used by teams worldwide to build production applications."
        />
        <FeatureGridItem
          icon={<Palette className="h-6 w-6" />}
          title="Design First"
          description="Figma kit included for seamless designer-developer handoff."
        />
        <FeatureGridItem
          icon={<Globe className="h-6 w-6" />}
          title="Documentation"
          description="Comprehensive docs and examples to get you started quickly."
        />
      </>
    ),
  },
};
