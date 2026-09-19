import { ThemeProvider, BrandProvider } from '@rtds/ui';

export function App() {
  return (
    <BrandProvider defaultBrand="atlas">
      <ThemeProvider defaultMode="system">
        <main className="min-h-screen bg-background text-foreground">
          <div className="container mx-auto px-4 py-16">
            <h1 className="font-display text-5xl font-normal">
              Welcome to Your Landing Page
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              This project was scaffolded with the RTDS design system. 
              Start building your landing page using the components from @rtds/ui.
            </p>
            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                Get Started
              </button>
              <button className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </main>
      </ThemeProvider>
    </BrandProvider>
  );
}
