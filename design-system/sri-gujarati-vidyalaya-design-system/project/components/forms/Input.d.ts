import * as React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  label?: React.ReactNode;
  /** Helper text below the field. */
  hint?: React.ReactNode;
  /** Error message; turns the field red. */
  error?: React.ReactNode;
  /** Leading icon node. */
  icon?: React.ReactNode;
  required?: boolean;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

/** Labelled text input with focus ring, hint and error states. */
export function Input(props: InputProps): JSX.Element;
