import { forwardRef, useId } from "react";
import "./Field.css";

const Field = forwardRef(function Field({ label, type = "text", as = "input", error, hint, ...inputProps }, ref) {
  const id = useId();
  const errorId = `${id}-error`;
  const Comp = as;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Comp
        id={id}
        ref={ref}
        type={as === "input" ? type : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={error ? "has-error" : ""}
        {...inputProps}
      />
      {hint && !error && <p className="field-hint">{hint}</p>}
      {error && (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Field;
