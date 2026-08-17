import { motion } from 'framer-motion';

/** Sticky HDFC Bank masthead with a slide-down entrance. */
export default function BrandHeader() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-30 bg-hdfc-navy shadow-md"
    >
      <div className="mx-auto flex max-w-5xl items-center px-4 py-3 sm:px-6">
        <img
          src="/assets/Normal_Logo.webp"
          alt="HDFC Bank"
          className="h-7 w-auto sm:h-8"
        />
      </div>
    </motion.header>
  );
}