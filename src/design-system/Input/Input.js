import React, { useId } from "react";
import "./Input.css";

function Input({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  type = "text",
  className = "",
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);
  const classes = ["ds-input", hasError ? "ds-input--error" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {label ? (
        <label className="ds-input__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        {...rest}
        id={inputId}
        className="ds-input__field"
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        {...(value !== undefined ? { value, onChange } : { onChange })}
      />
      {hasError ? (
        <p id={errorId} className="ds-input__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default Input;
