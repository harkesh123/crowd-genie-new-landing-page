import { useRef, useState } from "react";
import Field from "../components/Field";
import Button from "../components/Button";
import { CONTACT } from "../data/content";
import "./Contact.css";

const initialForm = { name: "", email: "", phone: "", question: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | sent
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const questionRef = useRef(null);

  function validate(values) {
    const next = {};
    if (!values.name.trim()) next.name = "Enter your full name.";
    if (!values.email.trim()) {
      next.email = "Enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      next.email = "Enter a valid email address, like name@company.com.";
    }
    if (!values.question.trim()) next.question = "Describe your question.";
    return next;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.question) questionRef.current?.focus();
      return;
    }

    setStatus("submitting");
    // Simulated submit — no backend wired up in this design prototype.
    setTimeout(() => {
      setStatus("sent");
      setForm(initialForm);
    }, 600);
  }

  return (
    <section className="wrap contact-page">
      <div className="contact-intro">
        <span className="kicker">Contact Us</span>
        <h1>Ask Us Anything</h1>
        <p className="contact-sub">
          Have you checked our <a href="/faqs">FAQs</a>? If your question wasn&rsquo;t covered, use the form and
          we&rsquo;ll reply within one business day.
        </p>
      </div>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <Field
            label="Full name"
            name="name"
            autoComplete="name"
            placeholder="Ada Tan…"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            ref={nameRef}
          />
          <Field
            label="Email address"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            ref={emailRef}
          />
          <Field
            label="Phone number (optional)"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+65 9123 4567"
            value={form.phone}
            onChange={handleChange}
          />
          <Field
            label="Describe your question"
            name="question"
            as="textarea"
            placeholder="I'd like to know…"
            value={form.question}
            onChange={handleChange}
            error={errors.question}
            ref={questionRef}
          />

          <Button type="submit" variant="primary" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Send Message"}
          </Button>

          <p className="contact-status" role="status" aria-live="polite">
            {status === "sent" ? "Message sent — we'll reply within one business day." : ""}
          </p>
        </form>

        <aside className="contact-info">
          <div className="info-row">
            <div className="k">Email</div>
            <a className="v" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
          </div>
          <div className="info-row">
            <div className="k">Phone</div>
            <a className="v" href={`tel:${CONTACT.phoneHref}`}>
              {CONTACT.phone}
            </a>
          </div>
          <div className="info-row">
            <div className="k">Office</div>
            <div className="v">
              {CONTACT.addressLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>

          <div className="office-card" aria-hidden="true">
            <svg viewBox="0 0 200 120" fill="none">
              <rect className="oc-bg" x="0" y="0" width="200" height="120" rx="10" />
              <path className="oc-road" d="M0 80 H200" strokeWidth="2" />
              <path className="oc-road" d="M60 0 V120" strokeWidth="2" />
              <circle className="oc-pin-dot" cx="126" cy="52" r="4" />
              <path
                className="oc-pin"
                d="M126 30c9 0 16 7 16 16 0 12-16 26-16 26s-16-14-16-26c0-9 7-16 16-16Z"
              />
            </svg>
            <p>46 Kim Yam Road, Singapore</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
