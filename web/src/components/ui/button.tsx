import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: [
    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium outline-none transition-all",
    "focus-within:ring-1 focus-within:ring-secondary-600 focus-within:ring-offset-2 focus-within:ring-offset-primary-100 dark:focus-within:ring-secondary-400 dark:focus-within:ring-offset-primary-900",
  ],
  variants: {
    variant: {
      primary:
        "bg-secondary-600 text-secondary-50 hover:bg-secondary-500 dark:bg-secondary-400 dark:text-secondary-950 dark:hover:bg-secondary-500",
      secondary:
        "bg-primary-200 dark:bg-primary-800 text-primary-700 dark:text-primary-300 hover:bg-primary-300 dark:hover:bg-primary-700",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface IButton
  extends ComponentProps<"button">,
    VariantProps<typeof button> {}

export function Button({ className, variant, ...rest }: IButton) {
  return <button className={button({ variant, className })} {...rest} />;
}
