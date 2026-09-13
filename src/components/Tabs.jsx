import { useId, useRef } from "react";
import "./Tabs.css";

export default function Tabs({ tabs, active, onChange, idBase }) {
  const generatedId = useId();
  const baseId = idBase || generatedId;
  const refs = useRef([]);

  function handleKeyDown(e, i) {
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next !== null) {
      e.preventDefault();
      onChange(tabs[next]);
      refs.current[next]?.focus();
    }
  }

  return (
    <div className="tabs" role="tablist" aria-label="FAQ category">
      {tabs.map((t, i) => {
        const isActive = active === t;
        return (
          <button
            key={t}
            ref={(el) => (refs.current[i] = el)}
            role="tab"
            id={`${baseId}-tab-${t}`}
            aria-selected={isActive}
            aria-controls={`${baseId}-panel-${t}`}
            tabIndex={isActive ? 0 : -1}
            className={isActive ? "on" : ""}
            onClick={() => onChange(t)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            type="button"
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
