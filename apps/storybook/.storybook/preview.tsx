import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute, withThemeByClassName } from '@storybook/addon-themes';
import '../styles.css';

const VIEWPORTS = {
  mobile: {
    name: 'Mobile (375)',
    styles: { width: '375px', height: '812px' },
  },
  tablet: {
    name: 'Tablet (768)',
    styles: { width: '768px', height: '1024px' },
  },
  desktop: {
    name: 'Desktop (1440)',
    styles: { width: '1440px', height: '900px' },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: VIEWPORTS,
      defaultViewport: 'desktop',
    },
    backgrounds: { disable: true },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-full w-full items-center justify-center bg-background p-8 text-foreground">
        <Story />
      </div>
    ),
    withThemeByDataAttribute({
      themes: {
        atlas: 'atlas',
        folio: 'folio',
        maison: 'maison',
      },
      defaultTheme: 'atlas',
      attributeName: 'data-theme',
    }),
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  globalTypes: {
    brand: {
      description: 'Niche theme',
      defaultValue: 'atlas',
      toolbar: {
        title: 'Niche',
        icon: 'paintbrush',
        items: ['atlas', 'folio', 'maison'],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Color mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
