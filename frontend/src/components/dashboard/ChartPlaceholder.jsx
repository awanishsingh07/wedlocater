import { motion } from "framer-motion";

/*
  Props: title, subtitle, type ("bar"|"line"|"donut"), height, data [{label, value, color}]
*/
export default function ChartPlaceholder({
  title    = "Revenue Overview",
  subtitle = "Last 6 months",
  type     = "bar",
  height   = 180,
  data     = [],
}) {
  const max = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="bg-white rounded-luxury border border-cream shadow-luxury p-5">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <h3 className="font-heading text-lg font-semibold text-dark">{title}</h3>
          <p className="font-body text-xs text-muted">{subtitle}</p>
        </div>
        <div className="flex gap-1.5">
          {["W", "M", "Y"].map(t => (
            <button key={t}
              className="w-7 h-7 rounded-lg text-[10px] font-body font-semibold
                         bg-cream text-muted hover:bg-gold hover:text-white
                         transition-all duration-200 first:bg-gold first:text-white">
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Bar chart */}
      {type === "bar" && data.length > 0 && (
        <div className="flex items-end justify-between gap-2" style={{ height }}>
          {data.map((d, i) => (
            <div key={d.label} className="flex flex-col items-center gap-1.5 flex-1">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.07 + 0.3, duration: 0.5, ease: "easeOut" }}
                style={{
                  height: `${(d.value / max) * (height - 28)}px`,
                  background: d.color || "linear-gradient(135deg,#C9A84C,#E2C97E)",
                  transformOrigin: "bottom",
                }}
                className="w-full rounded-t-lg min-h-[4px]"
              />
              <span className="text-[9px] font-body text-muted">{d.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Line chart (SVG path) */}
      {type === "line" && data.length > 0 && (
        <div style={{ height }} className="relative w-full">
          <svg className="w-full h-full" viewBox={`0 0 ${data.length * 60} ${height}`}
               preserveAspectRatio="none">
            {/* Grid lines */}
            {[0.25, 0.5, 0.75, 1].map(f => (
              <line key={f}
                x1="0" y1={height * f} x2={data.length * 60} y2={height * f}
                stroke="#F5EFE4" strokeWidth="1" />
            ))}
            {/* Fill area */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              d={[
                `M 0 ${height}`,
                ...data.map((d, i) => `L ${i * 60 + 30} ${height - (d.value / max) * (height - 20)}`),
                `L ${(data.length - 1) * 60 + 30} ${height}`,
                "Z",
              ].join(" ")}
              fill="url(#goldFill)"
              opacity="0.2"
            />
            {/* Line */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              d={data.map((d, i) =>
                `${i === 0 ? "M" : "L"} ${i * 60 + 30} ${height - (d.value / max) * (height - 20)}`
              ).join(" ")}
              fill="none"
              stroke="#C9A84C"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dots */}
            {data.map((d, i) => (
              <circle key={i}
                cx={i * 60 + 30}
                cy={height - (d.value / max) * (height - 20)}
                r="4" fill="#C9A84C" stroke="white" strokeWidth="2"
              />
            ))}
            <defs>
              <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#C9A84C" stopOpacity="0"   />
              </linearGradient>
            </defs>
          </svg>
          {/* X axis labels */}
          <div className="flex justify-between mt-1">
            {data.map(d => (
              <span key={d.label} className="text-[9px] font-body text-muted flex-1 text-center">
                {d.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Donut chart */}
      {type === "donut" && data.length > 0 && (
        <div className="flex items-center gap-6" style={{ minHeight: height }}>
          <div className="relative shrink-0" style={{ width: height * 0.8, height: height * 0.8 }}>
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              {(() => {
                const total = data.reduce((s, d) => s + d.value, 0);
                let offset = 0;
                return data.map((d, i) => {
                  const pct = (d.value / total) * 100;
                  const el = (
                    <circle key={i} cx="18" cy="18" r="15.9"
                      fill="none"
                      stroke={d.color || "#C9A84C"}
                      strokeWidth="3.2"
                      strokeDasharray={`${pct} ${100 - pct}`}
                      strokeDashoffset={-offset}
                      strokeLinecap="round"
                    />
                  );
                  offset += pct;
                  return el;
                });
              })()}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-heading text-lg font-semibold text-dark leading-none">
                {data.reduce((s, d) => s + d.value, 0).toLocaleString("en-IN")}
              </span>
              <span className="font-body text-[9px] text-muted">Total</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            {data.map(d => (
              <div key={d.label} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: d.color }} />
                  <span className="text-xs font-body text-muted truncate">{d.label}</span>
                </div>
                <span className="text-xs font-body font-semibold text-dark shrink-0">
                  {d.value.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}