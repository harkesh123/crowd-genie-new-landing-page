import Button from "../components/Button";
import { TICKER, STEPS, PRODUCTS, PARTNERS } from "../data/content";
import "./Home.css";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="badge">MAS-licensed · Singapore</span>
            <h1>Capital for small business, without the six-week wait.</h1>
            <p className="hero-sub">
              Crowd Genie connects Singapore SMEs with accredited investors through invoice financing, term loans and
              property-backed lending — approved in under 24 hours.
            </p>
            <div className="hero-actions">
              <Button to="/signup/borrower" variant="primary">
                Apply for a Loan
              </Button>
              <Button to="/signup/investor" variant="ghost">
                Start Investing
              </Button>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <svg viewBox="0 0 320 300" fill="none">
              <circle className="fx-ring-bg" cx="160" cy="150" r="132" />
              <circle className="fx-ring-line" cx="160" cy="150" r="132" strokeWidth="1.5" fill="none" />
              <g>
                <rect className="fx-bar" x="70" y="188" width="30" height="62" rx="5" />
                <rect className="fx-bar" x="112" y="160" width="30" height="90" rx="5" />
                <rect className="fx-bar" x="154" y="128" width="30" height="122" rx="5" />
                <rect className="fx-bar-hi" x="196" y="94" width="30" height="156" rx="5" />
              </g>
              <path
                className="fx-connector"
                d="M78 186 L124 156 L166 122 L210 88"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.55"
              />
              <circle className="fx-dot" cx="210" cy="88" r="7" />
              <g opacity="0.9">
                <path
                  className="fx-lamp-smoke"
                  d="M160 30c-2 3-1.6 6.4.6 8.4M160 30c2 3 1.6 6.4-.6 8.4"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle className="fx-lamp" cx="160" cy="52" r="15" />
                <circle className="fx-lamp-core" cx="160" cy="52" r="6" />
              </g>
            </svg>
          </div>
        </div>

        <div className="ticker">
          <div className="wrap ticker-grid mono">
            {TICKER.map((t) => (
              <div key={t.label}>
                <div className="num">{t.num}</div>
                <div className="lab">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="split">
        <div className="split-bg split-bg-a" aria-hidden="true" />
        <div className="split-bg split-bg-b" aria-hidden="true" />
        <div className="wrap split-inner">
          <div className="split-a">
            <h2>SME Borrowers</h2>
            <div className="rate mono">
              9.0%<span> p.a. from</span>
            </div>
            <p>Unsecured and invoice-backed financing, decisioned in under 24 hours.</p>
            <Button to="/signup/borrower" variant="primary" className="split-cta">
              Apply for a Loan
            </Button>
          </div>
          <div className="split-b">
            <h2>Investors</h2>
            <div className="rate mono">
              15.2%<span> target yield</span>
            </div>
            <p>Assess each note manually or set an auto-invest mandate across the book.</p>
            <Button to="/signup/investor" variant="light" className="split-cta">
              Start Investing
            </Button>
          </div>
        </div>
      </section>

      <section className="wrap section-block">
        <h2>How Investing Works</h2>
        <ol className="step-row">
          {STEPS.map((s) => (
            <li className="step" key={s.n}>
              <span className="n mono" aria-hidden="true">
                {s.n}
              </span>
              <p>{s.label}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="prod-section">
        <div className="wrap">
          <h2 className="prod-heading">Products</h2>
          <div className="prod-grid">
            {PRODUCTS.map((p) => (
              <div className="prod-cell" key={p.name}>
                <h3>{p.name}</h3>
                <div className="amt mono">{p.amount}</div>
                <p>{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section-block partners">
        <h2>Our Partners</h2>
        <ul className="partner-list">
          {PARTNERS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
