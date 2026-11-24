import * as React from 'react';
import { ExternalLinkIndicator } from '@/app/_components/ui/ExternalLinkIndicator';
import { cn } from '@/lib/className.utils';
import { buttonVariants } from './buttonVariants';
import { type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  hasExternalIcon = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    hasExternalIcon?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {asChild ? <Slot.Slottable>{children}</Slot.Slottable> : children}
      {hasExternalIcon ? <ExternalLinkIndicator /> : null}
    </Comp>
  );
}

export { Button, buttonVariants };
