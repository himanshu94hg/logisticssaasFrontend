import React from "react";
import "./StatusBadge.css";

const VARIANTS = ["primary", "success", "warning", "error", "info"];

function StatusBadge({ variant = "primary", className = "", children, ...rest }) {
  const resolvedVariant = VARIANTS.includes(variant) ? variant : "primary";
  const classes = [
    "ds-status-badge",
    `ds-status-badge--${resolvedVariant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}

export default StatusBadge;
