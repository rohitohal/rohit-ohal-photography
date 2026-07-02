import "./Container.css";

export default function Container({ children, wide = false }) {
  return (
    <div className={wide ? "container container-wide" : "container"}>
      {children}
    </div>
  );
}