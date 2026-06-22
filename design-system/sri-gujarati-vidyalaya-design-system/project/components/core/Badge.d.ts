import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Colour tone. Default "brand". */
  tone?: "brand" | "gold" | "neutral" | "success" | "info" | "outline";
  /** Show a leading status dot. */
  dot?: boolean;
  children?: React.ReactNode;
}

/** Small pill label for status, category or recognition tags. */
export function Badge(props: BadgeProps): JSX.Element;
