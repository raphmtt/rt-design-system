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
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        aurora: 'aurora',
        editorial: 'editorial',
      },
      defaultTheme: 'aurora',
      attributeName: 'data-brand',
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
      description: 'Brand theme',
      defaultValue: 'aurora',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: ['aurora', 'editorial'],
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
