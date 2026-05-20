import { motion } from "framer-motion";
import { useScrollAnimation, fadeUpVariants } from "../../hooks/useScrollAnimation";

/**
 * Wraps children with scroll-triggered fade-up animation.
 * Drop-in replacement for any section/div.
 */
export default function AnimatedSection({
  children,
  className   = "",
  variants    = fadeUpVariants,
  delay       = 0,
  margin      = "-80px",
  once        = true,
  as: Tag     = "div",
}) {
  const { ref, inView } = useScrollAnimation({ once, margin });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}