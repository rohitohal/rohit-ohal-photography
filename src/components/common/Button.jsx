import "./Button.css";

export default function Button({
  children,
  href,
  onClick,
  variant = "outline",
  type = "button",
}) {
  if (href) {
    return (
      <a href={href} className={`btn btn-${variant}`}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}