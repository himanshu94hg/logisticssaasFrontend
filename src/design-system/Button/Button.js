import React from "react";
import "./Button.css";

const VARIANTS = ["primary", "outline", "cancel", "danger", "white"];

function Button({
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  const resolvedVariant = VARIANTS.includes(variant) ? variant : "primary";
  const classes = ["ds-btn", `ds-btn--${resolvedVariant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button {...rest} type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
