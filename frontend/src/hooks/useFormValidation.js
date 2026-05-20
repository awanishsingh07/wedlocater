import { useState, useCallback } from "react";

const VALIDATORS = {
  required: (v)      => (!v || !v.toString().trim() ? "This field is required" : ""),
  email:    (v)      => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email address" : ""),
  phone:    (v)      => (!/^[6-9]\d{9}$/.test(v.replace(/\s/g, "")) ? "Enter a valid 10-digit Indian mobile number" : ""),
  minLen:   (n) => (v) => (v.length < n ? `Must be at least ${n} characters` : ""),
  maxLen:   (n) => (v) => (v.length > n ? `Must be at most ${n} characters` : ""),
  match:    (ref, label) => (v, allValues) =>
    v !== allValues[ref] ? `Must match ${label}` : "",
  password: (v) => {
    if (v.length < 8)            return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(v))        return "Include at least one uppercase letter";
    if (!/[0-9]/.test(v))        return "Include at least one number";
    return "";
  },
};

/**
 * useFormValidation
 * @param {Object} initialValues  – { fieldName: defaultValue }
 * @param {Object} rules          – { fieldName: [validatorFn, ...] }
 */
export default function useFormValidation(initialValues = {}, rules = {}) {
  const [values,  setValues]  = useState(initialValues);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});

  const runFieldValidators = useCallback(
    (name, value, allValues) => {
      const fieldRules = rules[name] || [];
      for (const rule of fieldRules) {
        const msg = rule(value, allValues);
        if (msg) return msg;
      }
      return "";
    },
    [rules]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const next = type === "checkbox" ? checked : value;
      setValues((prev) => {
        const updated = { ...prev, [name]: next };
        if (touched[name]) {
          setErrors((err) => ({
            ...err,
            [name]: runFieldValidators(name, next, updated),
          }));
        }
        return updated;
      });
    },
    [touched, runFieldValidators]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({
        ...prev,
        [name]: runFieldValidators(name, value, values),
      }));
    },
    [values, runFieldValidators]
  );

  const validateAll = useCallback(() => {
    const newErrors = {};
    let valid = true;
    Object.keys(rules).forEach((name) => {
      const msg = runFieldValidators(name, values[name] ?? "", values);
      if (msg) { newErrors[name] = msg; valid = false; }
    });
    setErrors(newErrors);
    setTouched(Object.keys(rules).reduce((a, k) => ({ ...a, [k]: true }), {}));
    return valid;
  }, [values, rules, runFieldValidators]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return { values, errors, touched, handleChange, handleBlur, validateAll, reset, setValues };
}

export { VALIDATORS };