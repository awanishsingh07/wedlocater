import { motion } from "framer-motion";
import { RiCheckLine, RiSparklingLine } from "react-icons/ri";

const FMT = (n, unit = "") =>
  unit === "per plate"
    ? `₹${n.toLocaleString("en-IN")}/plate`
    : n >= 100000
    ? `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`
    : `₹${n.toLocaleString("en-IN")}`;

export default function VendorPackageCard({ pkg, unit = "", onSelect, index = 0 }) {
  if (!pkg) return null;
  const { name, price, popular, features, duration } = pkg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative flex flex-col rounded-luxury border shadow-luxury
                  hover:shadow-luxury-md hover:-translate-y-1 transition-all duration-300
                  overflow-hidden
                  ${popular
                    ? "bg-maroon-gradient border-maroon/20"
                    : "bg-white border-cream"
                  }`}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <span className="inline-flex items-center gap-1 px-4 py-1
                           bg-gold text-dark text-[10px] font-body font-bold
                           rounded-b-xl shadow-gold">
            <RiSparklingLine size={10} />
            Most Popular
          </span>
        </div>
      )}

      <div className={`flex flex-col flex-1 p-5 sm:p-6 ${popular ? "pt-8" : ""}`}>
        {/* Name */}
        <p className={`font-body text-xs font-semibold uppercase tracking-widest mb-2
                       ${popular ? "text-gold/80" : "text-muted"}`}>
          {name}
        </p>

        {/* Price */}
        <div className="mb-1">
          <span className={`font-heading text-4xl font-semibold leading-none
                            ${popular ? "text-ivory" : "text-maroon"}`}>
            {FMT(price, unit)}
          </span>
        </div>
        {duration && (
          <p className={`font-body text-xs mb-5 ${popular ? "text-ivory/50" : "text-muted"}`}>
            {duration}
          </p>
        )}

        <div className={`h-px mb-5 ${popular ? "bg-white/10" : "bg-cream"}`} />

        {/* Features */}
        <ul className="flex flex-col gap-2.5 flex-1 mb-6">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5
                              ${popular ? "bg-gold/20 text-gold" : "bg-gold/10 text-gold-dark"}`}>
                <RiCheckLine size={10} />
              </div>
              <span className={`font-body text-xs leading-snug
                               ${popular ? "text-ivory/75" : "text-muted"}`}>
                {f}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => onSelect && onSelect(pkg)}
          className={popular ? "btn-gold w-full !justify-center" : "btn-secondary w-full !justify-center"}
        >
          Select Package
        </button>
      </div>
    </motion.div>
  );
}