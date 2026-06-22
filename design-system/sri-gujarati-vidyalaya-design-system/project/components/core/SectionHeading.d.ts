import * as React from "react";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  /** "inverse" for dark/maroon backgrounds. */
  tone?: "default" | "inverse";
  maxWidth?: string;
}

/** Eyebrow + display title + lead paragraph that opens a page section. */
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
