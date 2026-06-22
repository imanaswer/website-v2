import * as React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  /** Used for initials fallback. */
  name?: string;
  size?: "sm" | "md" | "lg" | "xl" | number;
  /** Gold ring for featured people. */
  ring?: boolean;
}

/** Circular portrait with initials fallback for faculty and testimonials. */
export function Avatar(props: AvatarProps): JSX.Element;
