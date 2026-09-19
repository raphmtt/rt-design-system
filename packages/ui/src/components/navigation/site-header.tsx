'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button, buttonVariants } from '../button';
import { Icon } from '../icon';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '../sheet';
import { Container } from '../layout/container';

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  navItems?: NavItem[];
  cta?: {
    label: string;
    href: string;
  };
  themeControls?: React.ReactNode;
}

const SiteHeader = React.forwardRef<HTMLElement, SiteHeaderProps>(
  ({ className, logo, navItems = [], cta, themeControls, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <header
        ref={ref}
        className={cn(
          'sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          className
        )}
        {...props}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              {logo && <div className="flex-shrink-0">{logo}</div>}

              <nav className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {themeControls && (
                <div className="hidden sm:flex items-center gap-2">
                  {themeControls}
                </div>
              )}

              {cta && (
                <a
                  href={cta.href}
                  className={cn(buttonVariants(), 'hidden sm:inline-flex')}
                >
                  {cta.label}
                </a>
              )}

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Icon icon={Menu} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <nav className="flex flex-col gap-4 mt-8">
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                    {cta && (
                      <a
                        href={cta.href}
                        className={cn(buttonVariants(), 'mt-4')}
                        onClick={() => setIsOpen(false)}
                      >
                        {cta.label}
                      </a>
                    )}
                    {themeControls && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                        {themeControls}
                      </div>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </Container>
      </header>
    );
  }
);
SiteHeader.displayName = 'SiteHeader';

export { SiteHeader };
