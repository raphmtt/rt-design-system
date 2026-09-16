import * as React from 'react';
import { cn } from '../../lib/utils';
import { Container } from '../layout/container';
import { Separator } from '../separator';

export interface FooterColumn {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface SiteFooterProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  description?: string;
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright?: string;
  legalLinks?: Array<{
    label: string;
    href: string;
  }>;
}

const SiteFooter = React.forwardRef<HTMLElement, SiteFooterProps>(
  (
    {
      className,
      logo,
      description,
      columns = [],
      socialLinks = [],
      copyright,
      legalLinks = [],
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={cn('border-t bg-background', className)}
        {...props}
      >
        <Container>
          <div className="py-12 md:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                {logo && <div className="mb-4">{logo}</div>}
                {description && (
                  <p className="text-sm text-muted-foreground max-w-xs">
                    {description}
                  </p>
                )}
                {socialLinks.length > 0 && (
                  <div className="flex gap-4 mt-6">
                    {socialLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={link.label}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {columns.length > 0 && (
                <div className="lg:col-span-8">
                  <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
                    {columns.map((column) => (
                      <div key={column.title}>
                        <h3 className="text-sm font-semibold text-foreground mb-4">
                          {column.title}
                        </h3>
                        <ul className="space-y-3">
                          {column.links.map((link) => (
                            <li key={link.href}>
                              <a
                                href={link.href}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {copyright && (
              <p className="text-sm text-muted-foreground">{copyright}</p>
            )}
            {legalLinks.length > 0 && (
              <nav className="flex gap-6">
                {legalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </Container>
      </footer>
    );
  }
);
SiteFooter.displayName = 'SiteFooter';

export { SiteFooter };
