import {
  ThemeProvider,
  BrandProvider,
  SiteShell,
  SiteHeader,
  SiteFooter,
  Hero,
  Section,
  Container,
  FeatureGrid,
  FeatureGridItem,
  StatsRow,
  StatItem,
  FAQ,
  CTASection,
  Button,
  ModeToggle,
  BrandSelect,
} from '@acme/ui';
import { Zap, Shield, Palette, Globe, Lock, Sparkles, Github, Twitter } from 'lucide-react';

const Logo = () => (
  <a href="/" className="font-heading font-bold text-xl text-foreground">
    Acme
  </a>
);

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Stats', href: '#stats' },
  { label: 'FAQ', href: '#faq' },
];

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Storybook', href: '/storybook' },
      { label: 'GitHub', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];

const faqItems = [
  {
    question: 'What is included in the design system?',
    answer:
      'The design system includes foundational components, marketing blocks, layout utilities, and a complete theming system with support for multiple brands and dark mode.',
  },
  {
    question: 'How do I customize the theme?',
    answer:
      'Customize the theme by setting the data-brand attribute for brand switching and the .dark class for dark mode. All components use CSS variables for colors, making customization straightforward.',
  },
  {
    question: 'Is the design system accessible?',
    answer:
      'Yes! All components are built with accessibility in mind, following WCAG 2.2 AA guidelines. We include proper focus management, keyboard navigation, and ARIA attributes.',
  },
  {
    question: 'Can I use this with other frameworks?',
    answer:
      'The design system is built for React 19 but the token and CSS architecture can be adapted to other frameworks. The Tailwind preset works with any project that uses Tailwind CSS v4.',
  },
];

export function App() {
  return (
    <BrandProvider defaultBrand="aurora">
      <ThemeProvider defaultMode="system">
        <SiteShell>
          <SiteHeader
            logo={<Logo />}
            navItems={navItems}
            cta={{ label: 'Get Started', href: '#' }}
            themeControls={
              <>
                <BrandSelect />
                <ModeToggle />
              </>
            }
          />

          <main id="main-content">
            <Hero
              eyebrow="Acme Design System v1"
              title="Build beautiful landing pages faster"
              description="A versioned, installable design system with React, Tailwind CSS v4, and CSS variable tokens. Multi-brand theming and dark mode included."
              align="center"
              actions={
                <>
                  <Button size="lg">View Documentation</Button>
                  <Button size="lg" variant="outline">
                    Open Storybook
                  </Button>
                </>
              }
            />

            <Section id="features" tone="muted">
              <FeatureGrid
                title="Everything you need"
                description="Built with modern best practices for performance, accessibility, and developer experience."
                columns={3}
              >
                <FeatureGridItem
                  icon={<Zap className="h-6 w-6" />}
                  title="Lightning Fast"
                  description="Optimized for performance with minimal JavaScript and efficient CSS."
                />
                <FeatureGridItem
                  icon={<Shield className="h-6 w-6" />}
                  title="Accessible"
                  description="WCAG 2.2 AA compliant with proper focus management and ARIA support."
                />
                <FeatureGridItem
                  icon={<Palette className="h-6 w-6" />}
                  title="Themeable"
                  description="Multi-brand theming with CSS variables. Change brands without touching code."
                />
                <FeatureGridItem
                  icon={<Globe className="h-6 w-6" />}
                  title="Responsive"
                  description="Mobile-first design tested at 375px and 1440px breakpoints."
                />
                <FeatureGridItem
                  icon={<Lock className="h-6 w-6" />}
                  title="Type Safe"
                  description="Full TypeScript support with strict type checking and autocompletion."
                />
                <FeatureGridItem
                  icon={<Sparkles className="h-6 w-6" />}
                  title="Modern Stack"
                  description="React 19, Tailwind v4, shadcn/ui compose path, and Radix primitives."
                />
              </FeatureGrid>
            </Section>

            <Section id="stats">
              <Container>
                <h2 className="font-heading text-3xl font-bold text-center mb-8">
                  Built for scale
                </h2>
              </Container>
              <StatsRow>
                <StatItem value="50+" label="Components" />
                <StatItem value="2" label="Brand Themes" />
                <StatItem value="4" label="Theme Variants" />
                <StatItem value="AA" label="WCAG Compliant" />
              </StatsRow>
            </Section>

            <Section id="faq" tone="muted">
              <FAQ
                title="Frequently asked questions"
                description="Find answers to common questions about the design system."
                items={faqItems}
              />
            </Section>

            <CTASection
              title="Ready to build?"
              description="Get started with the Acme design system and ship beautiful landing pages faster."
              tone="muted"
              actions={
                <>
                  <Button size="lg">Get Started</Button>
                  <Button size="lg" variant="outline">
                    View on GitHub
                  </Button>
                </>
              }
            />
          </main>

          <SiteFooter
            logo={<Logo />}
            description="A modern design system for building beautiful, accessible landing pages."
            columns={footerColumns}
            socialLinks={[
              {
                label: 'GitHub',
                href: '#',
                icon: <Github className="h-5 w-5" />,
              },
              {
                label: 'Twitter',
                href: '#',
                icon: <Twitter className="h-5 w-5" />,
              },
            ]}
            copyright="© 2024 Acme Inc. All rights reserved."
            legalLinks={[
              { label: 'Privacy', href: '#' },
              { label: 'Terms', href: '#' },
            ]}
          />
        </SiteShell>
      </ThemeProvider>
    </BrandProvider>
  );
}
