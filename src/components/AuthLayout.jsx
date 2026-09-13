import "./AuthLayout.css";

export function AuthArt({ eyebrow, quote, cite, footnote }) {
  return (
    <div className="auth-art">
      <svg className="watermark" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path d="M50 8c-3 4-2.4 9.6.9 12.6M50 8c3 4 2.4 9.6-.9 12.6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="45" r="24" fill="#fff" />
      </svg>
      <span className="badge">{eyebrow}</span>
      <blockquote>
        {quote}
        {cite && <cite>{cite}</cite>}
      </blockquote>
      <div className="mono auth-footnote">{footnote}</div>
    </div>
  );
}

export default function AuthLayout({ art, children }) {
  return (
    <section className="wrap auth-wrap-outer">
      <div className="auth-card">
        {art}
        <div className="auth-form-col">{children}</div>
      </div>
    </section>
  );
}
