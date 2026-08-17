import { motion } from 'framer-motion';

/** Horizontal slide/fade applied to each routed screen. */
export const pageTransitionVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.35, ease: 'easeInOut' },
};

export default function PageTransition({ children }) {
  return <motion.div {...pageTransitionVariants}>{children}</motion.div>;
}
