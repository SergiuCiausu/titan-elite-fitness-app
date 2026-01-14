import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bgGradient = "bg-gradient-to-r from-primary via-secondary-hover to-accent bg-[length:200%_200%] hover:bg-[position:100%_50%] transition-[background-position] duration-700 ease-in-out"

const buttonVariants = cva(
  "inline-flex w-fit items-center justify-center font-semibold gap-2 whitespace-nowrap rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-secondary-foreground shadow hover:bg-primary-hover",
        CTA:
          `${bgGradient} border-[3px] border-primary-foreground md:border-[4px] text-secondary-foreground cta-shadow`,
        outline:
          "bg-transparent font-normal md:font-semibold shadow md:border-[4px] md:rounded-2xl md:border-secondary md:hover:border-secondary-hover text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-muted",
        link: "text-primary underline-offset-4 hover:underline",
        no_bg: "bg-none text-foreground hover:text-foreground-hover"
      },
      size: {
        default: "text-base h-fit px-6 py-2",
        sm: "text-sm h-fit px-5 py-2 leading-[1.14]",
        lg: "text-base 3xl:text-xl h-fit px-6 py-4 max-md:px-8",
        xl: "text-xl 3xl:text-2xl h-fit px-8 py-5 3xl:px-12 3xl:py-6 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
