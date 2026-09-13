import { useEffect, useState } from "react";
import { STAT_CARDS, QUARTERLY_DISBURSED } from "../data/content";
import "./Statistics.css";

export default function Statistics() {
  const max = Math.max(...QUARTERLY_DISBURSED.map((d) => d.value));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="wrap stats-page">
      <span className="kicker">Last updated 31 Jan 2026</span>
      <h1>Statistics</h1>
      <p className="stats-sub">
        Live portfolio figures, published here directly instead of a downloadable PDF — so they stay readable on any
        device.
      </p>

      {loading ? (
        <div className="stats-skeleton" role="status" aria-live="polite">
          <span className="visually-hidden">Loading statistics…</span>
          <div className="stat-cards" aria-hidden="true">
            {STAT_CARDS.map((s) => (
              <div className="stat-card skel-card" key={s.cap}>
                <div className="skel-line skel-line-lg" />
                <div className="skel-line skel-line-sm" />
              </div>
            ))}
          </div>
          <div className="chart-card skel-card" aria-hidden="true">
            <div className="skel-line skel-line-sm" style={{ width: "42%" }} />
            <div className="skel-bars">
              {QUARTERLY_DISBURSED.map((d) => (
                <div key={d.q} className="skel-bar" style={{ height: `${(d.value / max) * 100}%` }} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="stats-content">
          <div className="stat-cards">
            {STAT_CARDS.map((s) => (
              <div className="stat-card" key={s.cap}>
                <div className="big mono">{s.big}</div>
                <div className="cap">{s.cap}</div>
              </div>
            ))}
          </div>

          <div className="chart-card">
            <h2>Loans Disbursed by Quarter (S$M)</h2>
            <svg
              className="chart-svg"
              viewBox="0 0 480 220"
              role="img"
              aria-label={`Bar chart of quarterly loans disbursed in Singapore dollars, millions: ${QUARTERLY_DISBURSED.map(
                (d) => `${d.q} ${d.value}`
              ).join(", ")}`}
            >
              {QUARTERLY_DISBURSED.map((d, i) => {
                const barWidth = 64;
                const gap = 28;
                const x = 24 + i * (barWidth + gap);
                const height = (d.value / max) * 150;
                const y = 170 - height;
                const isLast = i === QUARTERLY_DISBURSED.length - 1;
                return (
                  <g key={d.q}>
                    <rect x={x} y={y} width={barWidth} height={height} rx="6" className={isLast ? "bar-hi" : "bar"} />
                    <text x={x + barWidth / 2} y={y - 10} textAnchor="middle" className="bar-value mono">
                      {d.value}
                    </text>
                    <text x={x + barWidth / 2} y="196" textAnchor="middle" className="bar-label mono">
                      {d.q}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
