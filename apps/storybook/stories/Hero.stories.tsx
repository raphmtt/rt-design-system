import type { Meta, StoryObj } from '@storybook/react';
import { Hero, Button } from '@acme/ui';

const meta: Meta<typeof Hero> = {
  title: 'Marketing/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Center: Story = {
  args: {
    eyebrow: 'Introducing v1.0',
    title: 'Build beautiful landing pages faster',
    description:
      'A design system that makes it easy to create stunning, responsive landing pages without starting from scratch.',
    align: 'center',
    actions: (
      <>
        <Button size="lg">Get Started</Button>
        <Button size="lg" variant="outline">
          Learn More
        </Button>
      </>
    ),
  },
};

export const Left: Story = {
  args: {
    eyebrow: 'New Release',
    title: 'The future of design systems',
    description:
      'Build faster, design better, and ship with confidence using our comprehensive component library.',
    align: 'left',
    actions: (
      <>
        <Button size="lg">Start Building</Button>
        <Button size="lg" variant="ghost">
          View Documentation
        </Button>
      </>
    ),
  },
};

export const WithMedia: Story = {
  args: {
    title: 'Experience the difference',
    description: 'See how our design system can transform your development workflow.',
    align: 'center',
    actions: <Button size="lg">Try it Free</Button>,
    media: (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">Media Placeholder</span>
      </div>
    ),
  },
};

export const Minimal: Story = {
  args: {
    title: 'Simple. Powerful. Elegant.',
    align: 'center',
    actions: <Button size="lg">Get Started</Button>,
  },
};
