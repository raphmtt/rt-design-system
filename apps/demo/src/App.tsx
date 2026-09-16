import { ThemeProvider, BrandProvider } from '@acme/ui';

export function App() {
  return (
    <BrandProvider defaultBrand="aurora">
      <ThemeProvider defaultMode="system">
        <main className="min-h-screen bg-background text-foreground">
          <div className="container mx-auto px-4 py-8">
            <h1 className="font-heading text-4xl font-bold">
              Acme Design System Demo
            </h1>
            <p className="mt-4 text-muted-foreground">
              This demo site showcases the Acme design system components.
              Components will be added in Phase 3-4.
            </p>
          </div>
        </main>
      </ThemeProvider>
    </BrandProvider>
  );
}
