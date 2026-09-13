import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout, { AuthArt } from "../components/AuthLayout";
import Field from "../components/Field";
import Button from "../components/Button";
import "../components/AuthLayout.css";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate(values) {
    const next = {};
    if (!values.email.trim()) next.email = "Enter your email address.";
    if (!values.password) next.password = "Enter your password.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (nextErrors.email) return emailRef.current?.focus();
    if (nextErrors.password) return passwordRef.current?.focus();

    setStatus("submitting");
    setTimeout(() => setStatus("sent"), 600);
  }

  return (
    <AuthLayout
      art={
        <AuthArt
          eyebrow="Welcome back"
          quote="Your portfolio, repayments and new note offerings — all in one dashboard."
          footnote="15.2% avg. lender yield"
        />
      }
    >
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit} noValidate style={{ marginTop: 20 }}>
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
          autoComplete="current-password"
          placeholder="Your password…"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <Button type="submit" variant="primary" className="auth-submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Signing in…" : "Sign In"}
        </Button>
        <p role="status" aria-live="polite" className="auth-note">
          {status === "sent" ? "Signed in — redirecting to your dashboard." : ""}
        </p>
      </form>

      <p className="auth-note">
        New here? <Link to="/signup">Create an account</Link> ·{" "}
        <a href="mailto:help@crowd-genie.com?subject=Forgot%20password">Forgot password</a>
      </p>
    </AuthLayout>
  );
}
