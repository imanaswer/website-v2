import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Default "primary". */
  variant?: "primary" | "accent" | "secondary" | "ghost" | "inverse";
  /** Size. Default "md". */
  size?: "sm" | "md" | "lg";
  /** Icon node rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label. */
  iconRight?: React.ReactNode;
  /** Stretch to container width. */
  fullWidth?: boolean;
  /** Render as an anchor when set. */
  as?: "button" | "a";
  href?: string;
  children?: React.ReactNode;
}

/**
 * Primary call-to-action button. Pill-shaped, heritage maroon by default.
 * @startingPoint section="Core" subtitle="CTA button — maroon, gold, outline, ghost" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
