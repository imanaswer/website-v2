import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Image URL for a media card. */
  image?: string;
  imageAlt?: string;
  imageHeight?: number;
  /** Uppercase kicker above the title. */
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  /** Small meta line (date, category). */
  meta?: React.ReactNode;
  /** Footer node (link, button). */
  footer?: React.ReactNode;
  variant?: "elevated" | "outline" | "soft";
  /** Hover lift + image zoom. */
  interactive?: boolean;
  padding?: string;
  children?: React.ReactNode;
}

/**
 * Flexible content card for facilities, programmes, news and faculty.
 * @startingPoint section="Core" subtitle="Media + content card with hover lift" viewport="700x320"
 */
export function Card(props: CardProps): JSX.Element;
