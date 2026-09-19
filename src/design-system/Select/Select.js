import React, { useId } from "react";
import ReactSelect from "react-select";
import "./Select.css";

function Select({
  id,
  variant = "native",
  label,
  options = [],
  value = "",
  onChange,
  placeholder = "Select",
  error,
  disabled = false,
  className = "",
  ...rest
}) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const errorId = `${selectId}-error`;
  const hasError = Boolean(error);
  const classes = ["ds-select", hasError ? "ds-select--error" : "", className]
    .filter(Boolean)
    .join(" ");

  const handleNativeChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const selectedOption =
    options.find((option) => option.value === value) || null;

  const handleSearchableChange = (option) => {
    if (onChange) {
      onChange(option ? option.value : "");
    }
  };

  return (
    <div className={classes}>
      {label ? (
        <label className="ds-select__label" htmlFor={selectId}>
          {label}
        </label>
      ) : null}

      {variant === "searchable" ? (
        <ReactSelect
          {...rest}
          inputId={selectId}
          classNamePrefix="ds-select"
          options={options}
          value={selectedOption}
          onChange={handleSearchableChange}
          placeholder={placeholder}
          isDisabled={disabled}
          isSearchable
          aria-invalid={hasError}
          aria-errormessage={hasError ? errorId : undefined}
        />
      ) : (
        <select
          {...rest}
          id={selectId}
          className="ds-select__native"
          value={value}
          onChange={handleNativeChange}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {hasError ? (
        <p id={errorId} className="ds-select__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default Select;
