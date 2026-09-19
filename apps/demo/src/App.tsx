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
  Icon,
  ICON_SIZE_FEATURE,
  useBrand,
  useTheme,
} from '@rtds/ui';
import { brandLabels } from '@rtds/tokens';
import {
  Zap,
  Shield,
  Palette,
  Globe,
  Lock,
  Sparkles,
  Github,
  Twitter,
} from 'lucide-react';

const Logo = () => (
  <a href="/" className="font-heading font-bold text-xl text-foreground">
    RTDS
  </a>
);

const navItems = [
  { label: 'Button', href: '#button-poc' },
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
      'The design system includes foundational components, marketing blocks, layout utilities, and a complete theming system with three niches (atlas, folio, maison) and dark mode.',
  },
  {
    question: 'How do I customize the theme?',
    answer:
      'Set data-brand="atlas|folio|maison" on <html> and toggle the .dark class. Colors, radius, and type tokens remap — components stay the same. See docs/HOW-TO-THEME.md.',
  },
  {
    question: 'Is the design system accessible?',
    answer:
      'Yes. Palettes target WCAG 2.2 AA contrast. Components include focus management, keyboard navigation, and ARIA attributes.',
  },
  {
    question: 'Can I use this with other frameworks?',
    answer:
      'The design system is built for React 19 but the token and CSS architecture can be adapted. The Tailwind preset works with any project that uses Tailwind CSS v4.',
  },
];

function Landing() {
  const { brand } = useBrand();
  const { resolvedMode } = useTheme();
  const niche = brandLabels[brand];

  return (
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
          eyebrow={`${niche} · ${resolvedMode}`}
          title="Build beautiful landing pages faster"
          description="Switch niche and color mode in the header — the whole page restyles from tokens. Atlas, Folio, and Maison × light/dark. Lucide icons, Instrument Serif display, Inter, JetBrains Mono."
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

        <Section id="button-poc">
          <Container>
            <h2 className="font-heading text-3xl font-bold text-center mb-3">Button</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
              1:1 Base UI wrapper styled with CSS tokens. Switch {niche} × {resolvedMode} in
              the header — these restyle with no code edits.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Container>
        </Section>

        <Section id="features" tone="muted">
          <FeatureGrid
            title="Everything you need"
            description="Built with modern best practices for performance, accessibility, and developer experience."
            columns={3}
          >
            <FeatureGridItem
              icon={<Icon icon={Zap} size={ICON_SIZE_FEATURE} />}
              title="Lightning Fast"
              description="Optimized for performance with minimal JavaScript and efficient CSS."
            />
            <FeatureGridItem
              icon={<Icon icon={Shield} size={ICON_SIZE_FEATURE} />}
              title="Accessible"
              description="WCAG 2.2 AA compliant with proper focus management and ARIA support."
            />
            <FeatureGridItem
              icon={<Icon icon={Palette} size={ICON_SIZE_FEATURE} />}
              title="Themeable"
              description="Three niches via CSS variables. Change atlas, folio, or maison without touching components."
            />
            <FeatureGridItem
              icon={<Icon icon={Globe} size={ICON_SIZE_FEATURE} />}
              title="Responsive"
              description="Mobile-first design tested at 375px and 1440px breakpoints."
            />
            <FeatureGridItem
              icon={<Icon icon={Lock} size={ICON_SIZE_FEATURE} />}
              title="Type Safe"
              description="Full TypeScript support with strict type checking and autocompletion."
            />
            <FeatureGridItem
              icon={<Icon icon={Sparkles} size={ICON_SIZE_FEATURE} />}
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
            <StatItem value="3" label="Niches" />
            <StatItem value="6" label="Theme variants" />
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
          description="Get started with the RTDS design system and ship beautiful landing pages faster."
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
            icon: <Icon icon={Github} />,
          },
          {
            label: 'Twitter',
            href: '#',
            icon: <Icon icon={Twitter} />,
          },
        ]}
        copyright="© 2026 RTDS. All rights reserved."
        legalLinks={[
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
        ]}
      />
    </SiteShell>
  );
}

export function App() {
  return (
    <BrandProvider defaultBrand="atlas">
      <ThemeProvider defaultMode="system">
        <Landing />
      </ThemeProvider>
    </BrandProvider>
  );
}
