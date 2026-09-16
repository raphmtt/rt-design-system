import type { Meta, StoryObj } from '@storybook/react';
import { CTASection, Button } from '@acme/ui';

const meta: Meta<typeof CTASection> = {
  title: 'Marketing/CTASection',
  component: CTASection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CTASection>;

export const Default: Story = {
  args: {
    title: 'Ready to get started?',
    description: 'Join thousands of teams building better landing pages.',
    tone: 'muted',
    actions: (
      <>
        <Button size="lg">Start Free Trial</Button>
        <Button size="lg" variant="outline">
          Contact Sales
        </Button>
      </>
    ),
  },
};

export const Primary: Story = {
  args: {
    title: 'Start building today',
    description: 'Get started with our free tier and upgrade when you need more.',
    tone: 'primary',
    actions: (
      <>
        <Button size="lg" variant="secondary">
          Get Started
        </Button>
        <Button
          size="lg"
          variant="ghost"
          className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
        >
          Learn More
        </Button>
      </>
    ),
  },
};

export const Simple: Story = {
  args: {
    title: 'Subscribe to our newsletter',
    description: 'Stay up to date with the latest updates and releases.',
    tone: 'muted',
    actions: <Button size="lg">Subscribe</Button>,
  },
};
