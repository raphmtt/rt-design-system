import type { Meta, StoryObj } from '@storybook/react';
import { FeatureGrid, FeatureGridItem, Icon, ICON_SIZE_FEATURE } from '@rtds/ui';
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
          icon={<Icon icon={Zap} size={ICON_SIZE_FEATURE} />}
          title="Lightning Fast"
          description="Optimized for performance with minimal JavaScript and efficient rendering."
        />
        <FeatureGridItem
          icon={<Icon icon={Shield} size={ICON_SIZE_FEATURE} />}
          title="Accessible"
          description="WCAG 2.2 AA compliant out of the box with proper keyboard navigation."
        />
        <FeatureGridItem
          icon={<Icon icon={Palette} size={ICON_SIZE_FEATURE} />}
          title="Themeable"
          description="Change niches and modes without touching component code."
        />
        <FeatureGridItem
          icon={<Icon icon={Globe} size={ICON_SIZE_FEATURE} />}
          title="Responsive"
          description="Mobile-first design that works on every screen size."
        />
        <FeatureGridItem
          icon={<Icon icon={Lock} size={ICON_SIZE_FEATURE} />}
          title="Type Safe"
          description="Full TypeScript support with strict type checking."
        />
        <FeatureGridItem
          icon={<Icon icon={Sparkles} size={ICON_SIZE_FEATURE} />}
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
          icon={<Icon icon={Zap} size={ICON_SIZE_FEATURE} />}
          title="Fast Development"
          description="Ship features faster with pre-built, customizable components."
        />
        <FeatureGridItem
          icon={<Icon icon={Shield} size={ICON_SIZE_FEATURE} />}
          title="Battle Tested"
          description="Used by teams worldwide to build production applications."
        />
        <FeatureGridItem
          icon={<Icon icon={Palette} size={ICON_SIZE_FEATURE} />}
          title="Design First"
          description="Figma kit included for seamless designer-developer handoff."
        />
        <FeatureGridItem
          icon={<Icon icon={Globe} size={ICON_SIZE_FEATURE} />}
          title="Documentation"
          description="Comprehensive docs and examples to get you started quickly."
        />
      </>
    ),
  },
};
