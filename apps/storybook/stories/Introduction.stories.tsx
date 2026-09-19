import type { Meta, StoryObj } from '@storybook/react';

function Introduction() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="font-heading text-4xl font-bold text-foreground">
        RTDS Design System
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        A versioned, installable landing/sites design system built with React,
        Tailwind CSS v4, shadcn/ui compose path, and CSS variable tokens.
      </p>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Features
        </h2>
        <ul className="mt-4 space-y-2 text-foreground">
          <li>✓ Multi-niche theming (atlas, folio, maison)</li>
          <li>✓ Dark mode on all components</li>
          <li>✓ Responsive design (375, 768, 1440)</li>
          <li>✓ WCAG 2.2 AA accessibility</li>
          <li>✓ CSS variable tokens</li>
          <li>✓ Lucide icons + Instrument Serif / Inter / JetBrains Mono</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Getting Started
        </h2>
        <pre className="mt-4 p-4 bg-muted rounded-lg overflow-x-auto">
          <code className="text-sm text-foreground">
{`# Install packages
pnpm add @rtds/ui @rtds/tokens @rtds/tw-preset

# Or scaffold a new project
pnpm create @rtds landing my-site`}
          </code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Theme Controls
        </h2>
        <p className="mt-2 text-muted-foreground">
          Use the toolbar above to switch between niches (atlas / folio / maison) and
          modes (light/dark). All components support these theme variations.
        </p>
      </section>
    </div>
  );
}

const meta: Meta<typeof Introduction> = {
  title: 'Introduction',
  component: Introduction,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Introduction>;

export const Default: Story = {};
