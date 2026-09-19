import type { Meta, StoryObj } from '@storybook/react';
import { SiteHeader, ModeToggle, BrandSelect } from '@rtds/ui';

const Logo = () => (
  <div className="font-heading font-bold text-xl">RTDS</div>
);

const meta: Meta<typeof SiteHeader> = {
  title: 'Navigation/SiteHeader',
  component: SiteHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SiteHeader>;

export const Default: Story = {
  args: {
    logo: <Logo />,
    navItems: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Docs', href: '#docs' },
      { label: 'Blog', href: '#blog' },
    ],
    cta: { label: 'Get Started', href: '#' },
  },
};

export const WithThemeControls: Story = {
  args: {
    logo: <Logo />,
    navItems: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
    ],
    cta: { label: 'Sign Up', href: '#' },
    themeControls: (
      <>
        <BrandSelect />
        <ModeToggle />
      </>
    ),
  },
};

export const MinimalNav: Story = {
  args: {
    logo: <Logo />,
    navItems: [
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },
};

export const LogoOnly: Story = {
  args: {
    logo: <Logo />,
    cta: { label: 'Login', href: '#' },
  },
};
