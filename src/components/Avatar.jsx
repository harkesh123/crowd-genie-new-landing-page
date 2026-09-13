import "./Avatar.css";

/**
 * Generative initials avatar — a deliberate replacement for the desaturated
 * stock headshots on the live site. Each variant pairs two brand tones.
 */
export default function Avatar({ initials, variant = "v1" }) {
  return (
    <div className={`avatar avatar-${variant}`} aria-hidden="true">
      <span>{initials}</span>
    </div>
  );
}
