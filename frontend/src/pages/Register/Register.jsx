import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiUserLine,
  RiMailLine,
  RiLockLine,
  RiPhoneLine,
  RiCalendarLine,
  RiMapPinLine,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiGoogleFill,
  RiSparklingLine,
  RiCheckLine,
} from "react-icons/ri";
import useFormValidation, { VALIDATORS } from "../../hooks/useFormValidation";
import FormField from "../../components/forms/FormField";

// ── Step config ──────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Account",  desc: "Your credentials"  },
  { id: 2, label: "Personal", desc: "About yourself"    },
  { id: 3, label: "Wedding",  desc: "The big day"       },
];

const STEP_RULES = {
  1: {
    fullName: [VALIDATORS.required, VALIDATORS.minLen(3)],
    email:    [VALIDATORS.required, VALIDATORS.email],
    password: [VALIDATORS.required, VALIDATORS.password],
    confirm:  [VALIDATORS.required, VALIDATORS.match("password", "Password")],
  },
  2: {
    phone:    [VALIDATORS.required, VALIDATORS.phone],
    city:     [VALIDATORS.required],
    agree:    [(v) => (!v ? "You must accept the terms to continue" : "")],
  },
  3: {
    weddingDate:  [VALIDATORS.required],
    guestCount:   [VALIDATORS.required],
    budgetRange:  [VALIDATORS.required],
  },
};

const INIT = {
  fullName: "", email: "", password: "", confirm: "",
  phone: "", city: "", agree: false,
  weddingDate: "", guestCount: "", budgetRange: "",
};

const CITIES = [
  "Mumbai","Delhi","Bangalore","Chennai","Hyderabad",
  "Jaipur","Udaipur","Kolkata","Pune","Ahmedabad","Goa","Chandigarh",
];
const GUEST_OPTS = [
  { value: "lt100",    label: "Up to 100 guests"   },
  { value: "100-300",  label: "100 – 300 guests"   },
  { value: "300-500",  label: "300 – 500 guests"   },
  { value: "500-1000", label: "500 – 1,000 guests" },
  { value: "gt1000",   label: "1,000+ guests"      },
];
const BUDGET_OPTS = [
  { value: "lt5l",   label: "Under ₹5 Lakhs"          },
  { value: "5-15l",  label: "₹5 – 15 Lakhs"           },
  { value: "15-30l", label: "₹15 – 30 Lakhs"          },
  { value: "30-50l", label: "₹30 – 50 Lakhs"          },
  { value: "gt50l",  label: "₹50 Lakhs & Above"       },
];

// ── Animation variants ───────────────────────────────────
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ── Step indicator ───────────────────────────────────────
function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done    = step.id < current;
        const active  = step.id === current;
        return (
          <div key={step.id} className="flex items-center">
            {/* Circle */}
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={
                  done   ? { backgroundColor: "#C9A84C", borderColor: "#C9A84C" } :
                  active ? { borderColor: "#6B0F1A", backgroundColor: "#FAF7F2" } :
                           { borderColor: "#E2C97E", backgroundColor: "#FAF7F2" }
                }
                transition={{ duration: 0.3 }}
                className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
              >
                {done ? (
                  <RiCheckLine size={16} className="text-white" />
                ) : (
                  <span className={`text-xs font-body font-semibold
                    ${active ? "text-maroon" : "text-muted/50"}`}>
                    {step.id}
                  </span>
                )}
              </motion.div>
              <span className={`text-[10px] font-body font-medium tracking-wide
                ${active ? "text-maroon" : done ? "text-gold-dark" : "text-muted/50"}`}>
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className="w-12 sm:w-16 h-px mx-2 relative -mt-5 overflow-hidden bg-cream">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold"
                  animate={{ width: step.id < current ? "100%" : "0%" }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main component ───────────────────────────────────────
export default function Register() {
  const navigate          = useNavigate();
  const [step, setStep]   = useState(1);
  const [dir,  setDir]    = useState(1);
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, validateAll } =
    useFormValidation(INIT, STEP_RULES[step]);

  const goNext = () => {
    if (!validateAll()) return;
    setDir(1);
    setStep(s => s + 1);
  };

  const goPrev = () => {
    setDir(-1);
    setStep(s => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    navigate("/dashboard");
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-[90svh] bg-ivory flex">

      {/* ── Left panel ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden lg:flex lg:w-[42%] xl:w-[45%] relative overflow-hidden
                   bg-maroon-gradient flex-col justify-between p-12 xl:p-16"
      >
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #C9A84C 1px, transparent 1px),
                              radial-gradient(circle at 75% 75%, #C9A84C 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full
                        bg-gold/15 blur-[70px] pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-heading text-4xl font-semibold text-maroon">
              Wed<span className="text-gold">Locater</span>
            </span>
            <span className="font-body text-[10px] tracking-[0.22em] uppercase text-creme/40 mt-1">
              Luxury Wedding Planning
            </span>
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-5">
            <RiSparklingLine className="text-gold" size={16} />
            <span className="label-gold !text-gold/80">Start Your Journey</span>
          </div>
          <h2 className="font-heading text-display-md xl:text-display-lg text-maroon/80 leading-tight mb-5">
            Plan the wedding
            <br />
            <em className="not-italic text-shimmer">you've dreamed of.</em>
          </h2>
          <p className="font-body text-orange/50 text-sm leading-relaxed max-w-xs">
            Join 50,000+ couples who used WedLocater to plan their perfect celebration —
            from palaces in Udaipur to beach ceremonies in Goa.
          </p>

          {/* Mini feature cards */}
          <div className="mt-8 flex flex-col gap-3">
            {[
              { emoji: "🤖", title: "AI Vendor Matching",   desc: "Personalised to your budget & style"     },
              { emoji: "📋", title: "All-in-One Dashboard", desc: "Checklist, budget & bookings in one place" },
              { emoji: "✅", title: "Verified Vendors Only", desc: "Background checked & reviewed"           },
            ].map((f) => (
              <div key={f.title}
                className="flex items-start gap-3 p-3 rounded-xl
                           bg-white/8 border border-white/10">
                <span className="text-xl">{f.emoji}</span>
                <div>
                  <p className="text-sm font-body font-semibold text-maroon/90">{f.title}</p>
                  <p className="text-[11px] font-body text-amber/50">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom image strip */}
        <div className="relative z-10 flex gap-3">
          {[
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300&q=80&auto=format&fit=crop",
          ].map((src, i) => (
            <div key={i}
              className="flex-1 h-20 rounded-xl overflow-hidden opacity-50
                         hover:opacity-70 transition-opacity duration-300">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center
                      px-6 sm:px-10 lg:px-14 xl:px-20 py-12 overflow-y-auto">

        {/* Mobile logo */}
        <Link to="/" className="flex flex-col items-center leading-none mb-8 lg:hidden">
          <span className="font-heading text-3xl font-semibold text-maroon">
            Wed<span className="text-gold">Locater</span>
          </span>
        </Link>

        <div className="w-full max-w-md">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="label-gold mb-3">Create Account</p>
            <h1 className="font-heading text-display-sm text-dark mb-1.5">
              {step === 1 && "Set up your account"}
              {step === 2 && "Tell us about yourself"}
              {step === 3 && "About your wedding"}
            </h1>
            <p className="font-body text-sm text-muted">
              Already have an account?{" "}
              <Link to="/login"
                className="text-maroon font-medium hover:text-gold transition-colors duration-200">
                Sign in →
              </Link>
            </p>
          </motion.div>

          {/* Step indicator */}
          <StepIndicator current={step} />

          {/* Progress bar */}
          <div className="h-1 bg-cream rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-gold-gradient rounded-full"
              animate={{ width: `${progress === 0 ? 10 : progress}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          {/* ── Animated step forms ── */}
          <form onSubmit={handleSubmit} noValidate>
            <AnimatePresence mode="wait" custom={dir}>
              {/* ── Step 1 ── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-4"
                >
                  {/* Google */}
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3
                               px-5 py-3.5 rounded-xl border border-cream bg-white
                               text-sm font-body font-medium text-dark
                               shadow-luxury hover:shadow-luxury-md hover:-translate-y-0.5
                               transition-all duration-200"
                  >
                    <RiGoogleFill size={18} className="text-[#EA4335]" />
                    Sign up with Google
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-cream" />
                    <span className="text-xs text-muted font-body">or with email</span>
                    <div className="flex-1 h-px bg-cream" />
                  </div>

                  <FormField
                    label="Full Name"
                    name="fullName"
                    type="text"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.fullName}
                    touched={touched.fullName}
                    placeholder="Priya & Rahul Sharma"
                    icon={RiUserLine}
                    autoComplete="name"
                    required
                  />
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
                  <FormField
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    touched={touched.password}
                    placeholder="Min 8 chars, 1 uppercase, 1 number"
                    icon={RiLockLine}
                    autoComplete="new-password"
                    required
                  />
                  <FormField
                    label="Confirm Password"
                    name="confirm"
                    type="password"
                    value={values.confirm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.confirm}
                    touched={touched.confirm}
                    placeholder="Re-enter your password"
                    icon={RiLockLine}
                    autoComplete="new-password"
                    required
                  />
                </motion.div>
              )}

              {/* ── Step 2 ── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-4"
                >
                  <FormField
                    label="Mobile Number"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.phone}
                    touched={touched.phone}
                    placeholder="98765 43210"
                    icon={RiPhoneLine}
                    autoComplete="tel"
                    required
                  />
                  <FormField
                    label="Your City"
                    name="city"
                    type="select"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.city}
                    touched={touched.city}
                    placeholder="Select your city"
                    icon={RiMapPinLine}
                    options={CITIES.map(c => ({ value: c, label: c }))}
                    required
                  />

                  {/* Referral (optional, no validation) */}
                  <FormField
                    label="Referral Code (optional)"
                    name="referral"
                    type="text"
                    value={values.referral || ""}
                    onChange={handleChange}
                    placeholder="Enter referral code if any"
                    icon={RiSparklingLine}
                  />

                  {/* Terms */}
                  <FormField
                    name="agree"
                    type="checkbox"
                    value={values.agree}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.agree}
                    touched={touched.agree}
                  >
                    I agree to WedLocater's{" "}
                    <Link to="/" className="text-maroon hover:text-gold transition-colors">
                      Terms of Service
                    </Link>{" "}
                    &{" "}
                    <Link to="/" className="text-maroon hover:text-gold transition-colors">
                      Privacy Policy
                    </Link>
                  </FormField>
                  {touched.agree && errors.agree && (
                    <p className="text-xs text-red-500 font-body -mt-2">{errors.agree}</p>
                  )}
                </motion.div>
              )}

              {/* ── Step 3 ── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col gap-4"
                >
                  <FormField
                    label="Wedding Date"
                    name="weddingDate"
                    type="date"
                    value={values.weddingDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.weddingDate}
                    touched={touched.weddingDate}
                    placeholder=""
                    icon={RiCalendarLine}
                    required
                  />
                  <FormField
                    label="Expected Guest Count"
                    name="guestCount"
                    type="select"
                    value={values.guestCount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.guestCount}
                    touched={touched.guestCount}
                    placeholder="Select guest count"
                    icon={RiUserLine}
                    options={GUEST_OPTS}
                    required
                  />
                  <FormField
                    label="Total Wedding Budget"
                    name="budgetRange"
                    type="select"
                    value={values.budgetRange}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.budgetRange}
                    touched={touched.budgetRange}
                    placeholder="Select your budget range"
                    icon={RiSparklingLine}
                    options={BUDGET_OPTS}
                    required
                  />

                  {/* Summary card */}
                  {values.weddingDate && values.guestCount && values.budgetRange && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-cream border border-gold/20"
                    >
                      <p className="label-gold mb-2">Your Wedding Summary</p>
                      <div className="flex flex-col gap-1.5">
                        {[
                          ["Date",    values.weddingDate],
                          ["Guests",  GUEST_OPTS.find(o => o.value === values.guestCount)?.label],
                          ["Budget",  BUDGET_OPTS.find(o => o.value === values.budgetRange)?.label],
                        ].map(([k, v]) => v && (
                          <div key={k} className="flex items-center justify-between">
                            <span className="text-xs text-muted font-body">{k}</span>
                            <span className="text-xs font-semibold text-dark font-body">{v}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Navigation buttons ── */}
            <div className={`flex gap-3 mt-8 ${step > 1 ? "justify-between" : "justify-end"}`}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={goPrev}
                  className="btn-secondary !px-6 !py-3.5 !text-sm !gap-2"
                >
                  <RiArrowLeftLine size={15} />
                  Back
                </button>
              )}

              {step < STEPS.length ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="btn-primary !px-8 !py-3.5 !text-sm flex-1 sm:flex-none !justify-center"
                >
                  Continue
                  <RiArrowRightLine size={15} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold !px-8 !py-3.5 !text-sm flex-1 sm:flex-none
                             !justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor"
                          strokeWidth="3" strokeOpacity="0.3" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"
                          strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Creating your account…
                    </span>
                  ) : (
                    <>
                      Start Planning My Wedding
                      <RiSparklingLine size={15} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}