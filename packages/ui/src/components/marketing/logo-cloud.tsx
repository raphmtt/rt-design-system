import * as React from 'react';
import { cn } from '../../lib/utils';
import { Container } from '../layout/container';

export interface LogoItem {
  name: string;
  logo: React.ReactNode;
}

export interface LogoCloudProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  logos: LogoItem[];
}

const LogoCloud = React.forwardRef<HTMLElement, LogoCloudProps>(
  ({ className, title, logos, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn('py-12 md:py-16', className)}
        {...props}
      >
        <Container>
          {title && (
            <p className="text-center text-sm text-muted-foreground mb-8">
              {title}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
                title={item.name}
              >
                {item.logo}
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }
);
LogoCloud.displayName = 'LogoCloud';

export { LogoCloud };
