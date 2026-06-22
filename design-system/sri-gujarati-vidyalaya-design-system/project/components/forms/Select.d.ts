import * as React from "react";

export interface SelectOption { value: string; label: string; }

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "style"> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  /** Options as strings or {value,label}. */
  options?: (string | SelectOption)[];
  placeholder?: string;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

/** Labelled dropdown for grade, stream and enquiry-type fields. */
export function Select(props: SelectProps): JSX.Element;
