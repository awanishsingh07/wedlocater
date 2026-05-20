import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader({ isLoading = true, minDuration = 800 }) {
  const [visible, setVisible] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[200] bg-ivory flex flex-col
                     items-center justify-center gap-8"
        >
          {/* Decorative background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full
                            bg-gold/5 blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full
                            bg-maroon/5 blur-[80px]" />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center gap-2"
          >
            <span className="font-heading text-5xl font-semibold text-maroon">
              Wed<span className="text-gold">Locater</span>
            </span>
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted">
              Luxury Wedding Planning
            </span>
          </motion.div>

          {/* Animated loader */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="relative z-10"
          >
            {/* Outer rotating ring */}
            <div className="relative w-16 h-16">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-gold/20"
                style={{ borderTopColor: "#C9A84C" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute rounded-full border-2 border-transparent"
                style={{ inset: 10, borderBottomColor: "#6B0F1A" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gold" />
              </div>
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 w-48 h-0.5 bg-cream rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gold-gradient rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: minDuration / 1000, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 font-body text-xs text-muted tracking-widest uppercase"
          >
            Preparing your experience…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}