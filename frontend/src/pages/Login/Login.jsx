import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiMailLine,
  RiLockLine,
  RiArrowRightLine,
  RiGoogleFill,
  RiSparklingLine,
  RiShieldCheckLine,
} from "react-icons/ri";
import useFormValidation, { VALIDATORS } from "../../hooks/useFormValidation";
import FormField from "../../components/forms/FormField";
import { authService } from "../../services/authService";

const RULES = {
  email: [VALIDATORS.required, VALIDATORS.email],
  password: [VALIDATORS.required, VALIDATORS.minLen(6)],
};

const INIT = { email: "", password: "", adminCode: "", remember: false };

// Stagger variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, validateAll } =
    useFormValidation(INIT, RULES);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validateAll()) return;
    setLoading(true);

    try {
      const res = await authService.login(values.email, values.password, values.adminCode);
      setLoading(false);
      if (res.role === "admin") navigate("/admin/dashboard");
      else if (res.role === "vendor") navigate("/vendor/dashboard");
      else navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      setApiError(error);
    }
  };

  return (
    <div className="min-h-[90svh] bg-ivory flex">

      {/* ── Left decorative panel (desktop) ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative overflow-hidden
                   bg-maroon-gradient flex-col justify-between p-12 xl:p-16"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #C9A84C 1px, transparent 1px),
                              radial-gradient(circle at 75% 75%, #C9A84C 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full
                        bg-gold/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-10 w-60 h-60 rounded-full
                        bg-maroon-light/40 blur-[60px] pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-heading text-4xl font-semibold text-maroon">
              Wed<span className="text-gold">Locater</span>
            </span>
            <span className="font-body text-[10px] tracking-[0.22em] uppercase text-amber/60 mt-1">
              Luxury Wedding Planning
            </span>
          </Link>
        </div>

        {/* Centre content */}
        <div className="relative z-10 flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <RiSparklingLine className="text-gold" size={16} />
              <span className="label-gold !text-gold/80">Welcome Back</span>
            </div>
            <h2 className="font-heading text-display-lg text-maroon/80 leading-tight mb-4">
              Your dream wedding
              <br />
              <em className="not-italic text-shimmer">awaits you.</em>
            </h2>
            <p className="font-body text-amber/55 text-base leading-relaxed max-w-sm">
              Sign in to access your personalised wedding dashboard, saved venues,
              vendor bookings, and AI planning tools.
            </p>
          </div>

          {/* Trust points */}
          <div className="flex flex-col gap-4">
            {[
              "5,000+ couples trust WedLocater",
              "AI-powered vendor matching",
              "Verified & background-checked vendors",
            ].map((pt) => (
              <div key={pt} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full border border-gold/30
                                flex items-center justify-center shrink-0">
                  <RiShieldCheckLine size={14} className="text-gold" />
                </div>
                <span className="font-body text-sm text-maroon/90">{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wedding image strip */}
        <div className="relative z-10 flex gap-3">
          {[
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300&q=80&auto=format&fit=crop",
          ].map((src, i) => (
            <div
              key={i}
              className="flex-1 h-20 rounded-xl overflow-hidden opacity-60
                         hover:opacity-80 transition-opacity duration-300"
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center
                      px-6 sm:px-10 lg:px-16 xl:px-20 py-12 lg:py-16">

        {/* Mobile logo */}
        <Link to="/" className="flex flex-col items-center leading-none mb-10 lg:hidden">
          <span className="font-heading text-3xl font-semibold text-maroon">
            Wed<span className="text-gold">Locater</span>
          </span>
          <span className="font-body text-[9px] tracking-[0.22em] uppercase text-muted mt-1">
            Luxury Wedding Planning
          </span>
        </Link>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-md"
        >
          {/* Heading */}
          <motion.div variants={fadeUp} className="mb-8">
            <p className="label-gold mb-3">Sign In</p>
            <h1 className="font-heading text-display-md text-dark mb-2">
              Welcome back
            </h1>
            <p className="font-body text-sm text-muted">
              Don't have an account?{" "}
              <Link to="/register" className="text-maroon font-medium hover:text-gold
                                              transition-colors duration-200">
                Create one free →
              </Link>
            </p>
          </motion.div>



          {/* API error */}
          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200
                         text-sm text-red-600 font-body"
            >
              {apiError}
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            variants={container}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            <motion.div variants={fadeUp}>
              <FormField
                label="Email Address"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
                placeholder="you@example.com"
                icon={RiMailLine}
                autoComplete="email"
                required
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <FormField
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
                placeholder="Enter your password"
                icon={RiLockLine}
                autoComplete="current-password"
                required
              />
            </motion.div>

            <motion.div variants={fadeUp}
              className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <FormField
                  name="remember"
                  type="checkbox"
                  value={values.remember}
                  onChange={handleChange}
                >
                  Remember me
                </FormField>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isAdmin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    className="w-4 h-4 rounded border-cream text-maroon focus:ring-maroon"
                  />
                  <label htmlFor="isAdmin" className="text-xs font-body text-dark">
                    Login as Admin
                  </label>
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="text-xs font-body text-maroon hover:text-gold
                           transition-colors duration-200 whitespace-nowrap shrink-0"
              >
                Forgot password?
              </Link>
            </motion.div>

            {isAdmin && (
              <motion.div variants={fadeUp}>
                <FormField
                  label="Admin Code"
                  name="adminCode"
                  type="password"
                  value={values.adminCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter special admin code"
                  icon={RiShieldCheckLine}
                />
              </motion.div>
            )}

            {/* Submit */}
            <motion.div variants={fadeUp} className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full !justify-center !py-4 !text-sm
                           disabled:opacity-70 disabled:cursor-not-allowed
                           disabled:hover:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor"
                        strokeWidth="3" strokeOpacity="0.3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"
                        strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Signing you in…
                  </span>
                ) : (
                  <>
                    Sign In to Dashboard
                    <RiArrowRightLine size={16} />
                  </>
                )}
              </button>
            </motion.div>
          </motion.form>

          {/* Footer note */}
          <motion.p
            variants={fadeUp}
            className="text-center text-[11px] text-muted font-body mt-8 leading-relaxed"
          >
            By signing in, you agree to our{" "}
            <Link to="/" className="text-maroon hover:text-gold transition-colors">Terms of Service</Link>{" "}
            and{" "}
            <Link to="/" className="text-maroon hover:text-gold transition-colors">Privacy Policy</Link>.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}