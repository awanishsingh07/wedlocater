import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { RiEyeLine, RiEyeOffLine, RiCheckLine, RiErrorWarningLine } from "react-icons/ri";

/*
  Props:
  ─────────────────────────────────────────────────────
  label       string
  name        string
  type        string   – text | email | password | tel | select | checkbox
  value       string
  onChange    fn
  onBlur      fn
  error       string
  touched     boolean
  placeholder string
  icon        React component
  options     [{value, label}]   – for select
  children    node               – for checkbox label
  required    boolean
  className   string
  ─────────────────────────────────────────────────────
*/

export default function FormField({
  label,
  name,
  type        = "text",
  value       = "",
  onChange,
  onBlur,
  error       = "",
  touched     = false,
  placeholder = "",
  icon: Icon  = null,
  options     = [],
  children,
  required    = false,
  className   = "",
  autoComplete,
}) {
  const [showPwd, setShowPwd] = useState(false);
  const hasError  = touched && !!error;
  const isValid   = touched && !error && value;
  const inputType = type === "password" ? (showPwd ? "text" : "password") : type;

  if (type === "checkbox") {
    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <div className="relative mt-0.5">
          <input
            id={name}
            name={name}
            type="checkbox"
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            className="sr-only peer"
          />
          <label
            htmlFor={name}
            className="w-5 h-5 rounded-md border-2 border-cream bg-white
                       flex items-center justify-center cursor-pointer
                       peer-checked:border-gold peer-checked:bg-gold
                       transition-all duration-200"
          >
            {value && <RiCheckLine size={12} className="text-white" />}
          </label>
        </div>
        <label htmlFor={name} className="text-sm font-body text-muted cursor-pointer leading-snug">
          {children}
        </label>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label */}
      {label && (
        <label htmlFor={name} className="font-body text-xs font-medium text-dark/70 tracking-wide">
          {label}
          {required && <span className="text-maroon ml-1">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        {/* Left icon */}
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon size={16} className={`transition-colors duration-200
              ${hasError ? "text-red-400" : isValid ? "text-gold" : "text-muted"}`}
            />
          </div>
        )}

        {/* Select */}
        {type === "select" ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`select-luxury transition-all duration-200
              ${Icon ? "!pl-10" : ""}
              ${hasError
                ? "!border-red-400 !ring-2 !ring-red-100"
                : isValid
                ? "!border-gold !ring-2 !ring-gold/15"
                : ""
              }`}
          >
            <option value="" disabled>{placeholder || "Select an option"}</option>
            {options.map(({ value: v, label: l }) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={inputType}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={`input-luxury transition-all duration-200
              ${Icon ? "!pl-10" : ""}
              ${type === "password" ? "!pr-11" : ""}
              ${hasError
                ? "!border-red-400 !ring-2 !ring-red-100"
                : isValid
                ? "!border-gold !ring-2 !ring-gold/15"
                : ""
              }`}
          />
        )}

        {/* Right: password toggle OR valid check */}
        {type === "password" && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPwd(v => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2
                       text-muted hover:text-gold transition-colors duration-200"
          >
            {showPwd ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
          </button>
        )}
        {type !== "password" && isValid && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            <RiCheckLine size={16} className="text-gold" />
          </div>
        )}
        {hasError && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            <RiErrorWarningLine size={16} className="text-red-400" />
          </div>
        )}
      </div>

      {/* Error message */}
      <AnimatePresence mode="wait">
        {hasError && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-red-500 font-body flex items-center gap-1"
          >
            <RiErrorWarningLine size={11} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}