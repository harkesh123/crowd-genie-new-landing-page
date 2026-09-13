import { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AuthLayout, { AuthArt } from "../components/AuthLayout";
import Field from "../components/Field";
import Button from "../components/Button";
import "../components/AuthLayout.css";

export default function SignUp() {
  const { role: roleParam } = useParams();
  const initialRole = roleParam === "borrower" ? "borrower" : "investor";
  const [role, setRole] = useState(initialRole);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate(values) {
    const next = {};
    if (!values.name.trim()) next.name = "Enter your full name.";
    if (!values.email.trim()) {
      next.email = "Enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!values.password || values.password.length < 8) {
      next.password = "Use at least 8 characters.";
    }
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (nextErrors.name) return nameRef.current?.focus();
    if (nextErrors.email) return emailRef.current?.focus();
    if (nextErrors.password) return passwordRef.current?.focus();

    setStatus("submitting");
    setTimeout(() => setStatus("sent"), 600);
  }

  return (
    <AuthLayout
      art={
        <AuthArt
          eyebrow="MAS-licensed · Est. 2016"
          quote={
            <>&ldquo;Approved in under 24 hours — faster than our bank called us back.&rdquo;</>
          }
          cite="— SME borrower, F&B sector"
          footnote="S$18.4M disbursed · 100+ SMEs assessed"
        />
      }
    >
      <h1>Create Your Account</h1>

      <fieldset className="role-seg" onChange={(e) => setRole(e.target.value)}>
        <legend className="visually-hidden">Account type</legend>
        <label className={role === "investor" ? "on" : ""}>
          <input
            type="radio"
            name="role"
            value="investor"
            checked={role === "investor"}
            onChange={() => setRole("investor")}
            className="visually-hidden"
          />
          Investor
        </label>
        <label className={role === "borrower" ? "on" : ""}>
          <input
            type="radio"
            name="role"
            value="borrower"
            checked={role === "borrower"}
            onChange={() => setRole("borrower")}
            className="visually-hidden"
          />
          Borrower
        </label>
      </fieldset>

      <form onSubmit={handleSubmit} noValidate>
        <Field
          ref={nameRef}
          label="Name"
          name="name"
          autoComplete="name"
          placeholder="Full name…"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Field
          ref={emailRef}
          label="Email address"
          name="email"
          type="email"
          inputMode="email"
          spellCheck={false}
          autoComplete="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Field
          ref={passwordRef}
          label="Password"
          name="password"
          type="password"
          spellCheck={false}
          autoComplete="new-password"
          placeholder="At least 8 characters…"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <Button type="submit" variant="primary" className="auth-submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Creating account…" : "Register"}
        </Button>
        <p role="status" aria-live="polite" className="auth-note">
          {status === "sent" ? `Account created as ${role === "investor" ? "an investor" : "a borrower"}.` : ""}
        </p>
      </form>

      <p className="auth-note">
        Already a member? <Link to="/signin">Sign in</Link>
      </p>
    </AuthLayout>
  );
}
