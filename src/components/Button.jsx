import { Link } from "react-router-dom";
import "./Button.css";

/**
 * Renders a real <button> for actions/submits, or a router <Link> for
 * navigation, so Cmd/Ctrl+click and middle-click keep working.
 */
export default function Button({
  as,
  to,
  href,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  children,
  ...rest
}) {
  const cls = `btn btn-${variant} btn-${size} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  const Comp = as || "button";
  return (
    <Comp type={Comp === "button" ? type : undefined} className={cls} {...rest}>
      {children}
    </Comp>
  );
}
