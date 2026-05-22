import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RiUserLine, RiMailLine, RiLockLine, RiSparklingLine, RiStoreLine, RiShieldUserLine } from "react-icons/ri";
import { authService } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    adminCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await authService.register({ ...formData, role });
      setLoading(false);
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "vendor") navigate("/vendor/dashboard");
      else navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

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
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #C9A84C 1px, transparent 1px),
                              radial-gradient(circle at 75% 75%, #C9A84C 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-gold/15 blur-[70px] pointer-events-none" />

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
            Join 50,000+ couples and vendors who use WedLocater to plan and manage perfect celebrations.
          </p>
        </div>

        <div className="relative z-10 flex gap-3">
          {[
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300&q=80&auto=format&fit=crop",
          ].map((src, i) => (
            <div key={i} className="flex-1 h-20 rounded-xl overflow-hidden opacity-50 hover:opacity-70 transition-opacity duration-300">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 lg:px-14 xl:px-20 py-12 overflow-y-auto">
        <Link to="/" className="flex flex-col items-center leading-none mb-8 lg:hidden">
          <span className="font-heading text-3xl font-semibold text-maroon">
            Wed<span className="text-gold">Locater</span>
          </span>
        </Link>

        <div className="w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <p className="label-gold mb-3">Create Account</p>
            <h1 className="font-heading text-display-sm text-dark mb-1.5">Join WedLocater</h1>
            <p className="font-body text-sm text-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-maroon font-medium hover:text-gold transition-colors duration-200">
                Sign in →
              </Link>
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Role Selection */}
            <div className="grid grid-cols-3 gap-3 mb-2">
              {[
                { id: "user", label: "Couple", icon: RiUserLine },
                { id: "vendor", label: "Vendor", icon: RiStoreLine },
                { id: "admin", label: "Admin", icon: RiShieldUserLine },
              ].map(r => (
                <button
                  key={r.id} type="button"
                  onClick={() => setRole(r.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200
                    ${role === r.id ? "bg-maroon/5 border-maroon text-maroon" : "bg-white border-cream text-muted hover:border-gold"}
                  `}
                >
                  <r.icon size={20} />
                  <span className="font-body text-xs font-semibold">{r.label}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-medium text-dark/70">Full Name</label>
              <div className="relative">
                <RiUserLine size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-luxury !pl-10 text-sm" placeholder={role === "vendor" ? "Business Name" : "Your Name"} required />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-medium text-dark/70">Email Address</label>
              <div className="relative">
                <RiMailLine size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-luxury !pl-10 text-sm" placeholder="you@example.com" required />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-medium text-dark/70">Password</label>
              <div className="relative">
                <RiLockLine size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-luxury !pl-10 text-sm" placeholder="••••••••" required />
              </div>
            </div>

            {role === "admin" && (
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-xs font-medium text-dark/70">Admin Code</label>
                <div className="relative">
                  <RiShieldUserLine size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input type="password" name="adminCode" value={formData.adminCode} onChange={handleChange} className="input-luxury !pl-10 text-sm" placeholder="Enter special admin code" required />
                </div>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-gold !py-4 w-full !justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}