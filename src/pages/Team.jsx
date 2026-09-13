import Avatar from "../components/Avatar";
import Button from "../components/Button";
import { TEAM } from "../data/content";
import "./Team.css";

export default function Team() {
  return (
    <>
      <section className="wrap team-hero">
        <span className="kicker">Who&rsquo;s underwriting your capital</span>
        <h1>Experienced entrepreneurs. Smart investors.</h1>
        <p className="team-sub">
          Crowd Genie is built by a team with direct experience in SME lending, credit risk and financial technology in
          Singapore.
        </p>
      </section>

      <section className="wrap team-grid">
        {TEAM.map((m) => (
          <article className="member" key={m.name}>
            <Avatar initials={m.initials} variant={m.variant} />
            <h2>{m.name}</h2>
            <p className="member-role">{m.role}</p>
            <ul className="member-highlights">
              {m.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <p className="member-bio">{m.bio}</p>
          </article>
        ))}
      </section>

      <section className="wrap team-cta">
        <h2>Join our community today</h2>
        <Button to="/signup/investor" variant="primary">
          Create a Free Account
        </Button>
      </section>
    </>
  );
}
