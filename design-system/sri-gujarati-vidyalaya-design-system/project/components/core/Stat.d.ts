import * as React from "react";

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The number to display. */
  value: number;
  /** Text appended after the number, e.g. "%", "+". */
  suffix?: string;
  /** Text before the number. */
  prefix?: string;
  /** Caption beneath the figure. */
  label: string;
  align?: "center" | "left";
  /** "inverse" for dark backgrounds. */
  tone?: "default" | "inverse";
  /** Count up on scroll into view. Default true. */
  animate?: boolean;
}

/**
 * Animated "at a glance" statistic with count-up.
 * @startingPoint section="Core" subtitle="Count-up stat for At-a-Glance bands" viewport="700x150"
 */
export function Stat(props: StatProps): JSX.Element;
