import * as React from "react";

export interface AccordionItem {
  /** Question / header (alias: title). */
  q?: React.ReactNode;
  title?: React.ReactNode;
  /** Answer / body (alias: content). */
  a?: React.ReactNode;
  content?: React.ReactNode;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  /** Index open by default, or null for all closed. */
  defaultOpen?: number | null;
  /** Allow several panels open at once. */
  allowMultiple?: boolean;
}

/**
 * Collapsible panels for fees, FAQs and long content blocks.
 * @startingPoint section="Feedback" subtitle="FAQ / fees accordion" viewport="700x300"
 */
export function Accordion(props: AccordionProps): JSX.Element;
