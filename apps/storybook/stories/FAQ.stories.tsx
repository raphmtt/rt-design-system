import type { Meta, StoryObj } from '@storybook/react';
import { FAQ } from '@acme/ui';

const meta: Meta<typeof FAQ> = {
  title: 'Marketing/FAQ',
  component: FAQ,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof FAQ>;

const sampleItems = [
  {
    question: 'What is included in the design system?',
    answer:
      'The design system includes all the foundational components you need to build landing pages: buttons, inputs, cards, navigation, hero sections, feature grids, pricing tables, and more.',
  },
  {
    question: 'Does it support dark mode?',
    answer:
      'Yes! Every component supports both light and dark mode out of the box. Simply toggle the .dark class on your HTML element.',
  },
  {
    question: 'How do I customize the theme?',
    answer:
      'You can customize the theme by modifying the CSS variables in your stylesheets. The design system uses semantic tokens, so you can change colors, fonts, and spacing without touching component code.',
  },
  {
    question: 'Is it accessible?',
    answer:
      'Yes, all components are built with accessibility in mind and follow WCAG 2.2 AA guidelines. We include proper focus management, keyboard navigation, and ARIA attributes.',
  },
  {
    question: 'Can I use this with Next.js?',
    answer:
      'Absolutely! The design system is framework-agnostic and works great with Next.js, Remix, Vite, or any other React-based framework.',
  },
];

export const Default: Story = {
  args: {
    title: 'Frequently asked questions',
    description: 'Find answers to common questions about our design system.',
    items: sampleItems,
  },
};

export const WithoutHeader: Story = {
  args: {
    items: sampleItems,
  },
};

export const FewItems: Story = {
  args: {
    title: 'Quick FAQ',
    items: sampleItems.slice(0, 3),
  },
};
