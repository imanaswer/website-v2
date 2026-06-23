import { Icon } from "./Icon";

/* Editorial text link with animated arrow + sliding underline. */
export function TextLink({ children, onClick, href, onDark, style }) {
  const cls = "link-line" + (onDark ? " link-line--on-dark" : "");
  const inner = (
    <>
      {children}
      <Icon name="arrow-right" size={15} />
    </>
  );
  if (href) {
    return (
      <a className={cls} href={href} style={style}>{inner}</a>
    );
  }
  return (
    <button className={cls} onClick={onClick} style={style}>{inner}</button>
  );
}

/* Small mono overline label. */
export function Label({ children, onDark, style }) {
  return (
    <div className={"label" + (onDark ? " label--on-dark" : "")} style={style}>{children}</div>
  );
}
