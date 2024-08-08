import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const likeMessageButton = tv({
  base: [
    "mt-3 flex items-center gap-2 rounded-lg text-sm font-medium outline-none transition-all",
    "focus-within:ring-1 focus-within:ring-secondary-600 focus-within:ring-offset-2 focus-within:ring-offset-primary-100 dark:focus-within:ring-secondary-400 dark:focus-within:ring-offset-primary-900",
  ],
  variants: {
    variant: {
      primary:
        "text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300",
      secondary:
        "text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ILikeMessageButton
  extends ComponentProps<"button">,
    VariantProps<typeof likeMessageButton> {}

export function LikeMessageButton({
  className,
  variant,
  ...rest
}: ILikeMessageButton) {
  return (
    <button className={likeMessageButton({ variant, className })} {...rest} />
  );
}
