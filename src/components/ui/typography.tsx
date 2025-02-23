import { cva, VariantProps } from 'class-variance-authority';
import { ElementType, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';


const typographyStyles = cva('', {
  variants: {
    variant: {
      title: 'lg:text-3xl xl:text-4xl 2xl:text-6xl text-2xl text-gray-900 font-semibold',
      heading2: 'lg:text-2xl xl:text-3xl text-xl text-gray-900 font-semibold',
      heading3: 'lg:text-xl xl:text-2xl text-lg text-gray-800 font-semibold',
      desc: 'text-xs sm:text-sm md:text-base 2xl:text-lg text-gray-500'
    }
  },
  defaultVariants: {
    variant: 'desc'
  }
});

type TypographyProps = VariantProps<typeof typographyStyles> & {
  children: ReactNode;
  component?: ElementType;
  className?: string;
};

export const Typography = forwardRef<HTMLHeadingElement | HTMLParagraphElement, TypographyProps>(
  ({ variant = 'desc', children, className = '', component = 'p', ...props }, ref) => {
    let Component = component;

    if (variant === 'title' && Component == 'p') {
      Component = 'h1';
    } else if (variant === 'heading2' && Component == 'p') {
      Component = 'h2';
    }

    return (
      <Component ref={ref} className={clsx(typographyStyles({ variant }), className)} {...props}>
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';
