import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Returns a ref and boolean isInView for scroll-triggered animations.
 * @param {Object} opts - framer-motion useInView options
 */
export function useScrollAnimation(opts = { once: true, margin: "-80px" }) {
  const ref    = useRef(null);
  const inView = useInView(ref, opts);
  return { ref, inView };
}

/** Standard animation variants for reuse */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5 } },
};

export const staggerContainerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export const slideLeftVariants = {
  hidden: { opacity: 0, x: -24 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const slideRightVariants = {
  hidden: { opacity: 0, x: 24 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};