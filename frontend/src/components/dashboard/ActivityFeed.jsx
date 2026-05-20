import { motion } from "framer-motion";

export default function ActivityFeed({ items = [], title = "Recent Activity" }) {
  return (
    <div className="bg-white rounded-luxury border border-cream shadow-luxury p-5">
      <h3 className="font-heading text-lg font-semibold text-dark mb-5">{title}</h3>
      <div className="flex flex-col gap-1">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 + 0.2, duration: 0.4 }}
            className="flex items-start gap-3 p-3 rounded-xl
                       hover:bg-cream/60 transition-colors duration-200 group"
          >
            <div className="w-8 h-8 rounded-full bg-cream flex items-center
                            justify-center text-base shrink-0 mt-0.5">
              {item.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-body text-sm font-medium text-dark">{item.action}</p>
              <p className="font-body text-xs text-muted truncate">{item.detail}</p>
            </div>
            <span className="font-body text-[10px] text-muted/60 whitespace-nowrap shrink-0 mt-0.5">
              {item.time}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}