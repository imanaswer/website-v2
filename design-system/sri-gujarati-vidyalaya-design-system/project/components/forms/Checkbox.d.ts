import * as React from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  label?: React.ReactNode;
  /** Secondary line beneath the label. */
  description?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Custom checkbox with maroon fill — consent and multi-select options. */
export function Checkbox(props: CheckboxProps): JSX.Element;
