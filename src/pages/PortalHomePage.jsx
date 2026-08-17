import { ArrowRight, Image as ImageIcon, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import PageShell from '../components/PageShell.jsx';
import StepIndicator from '../components/StepIndicator.jsx';
import { JOURNEY_STEP_INDEX, ROUTES } from '../lib/constants.js';

export default function PortalHomePage() {
  const navigate = useNavigate();

  return (
    <PageShell mainClassName="gap-5 px-4 py-4">
      {/* Campaign banner placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex w-full max-w-xl shrink-0 items-center gap-3 rounded-lg border-2 border-dashed border-hdfc-blue-100 bg-hdfc-blue-50/50 px-4 py-3 sm:gap-4 sm:px-5 sm:py-4"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/80 sm:h-12 sm:w-12">
          <ImageIcon
            aria-hidden="true"
            strokeWidth={1.75}
            className="h-5 w-5 text-hdfc-navy/60 sm:h-6 sm:w-6"
          />
        </span>
        <div className="text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-hdfc-navy/70 sm:text-base">
            Banner
          </p>
        </div>
      </motion.div>

      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-2xl font-bold leading-tight text-hdfc-navy sm:text-4xl"
        >
          Employee Link Generation Portal
        </motion.h1>
        <div className="mx-auto mt-3 h-1 w-16 bg-hdfc-red" />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto mt-4 max-w-xl text-sm text-slate-600 sm:text-base"
        >
          Generate your personalised, trackable campaign link and share it with customers — every
          visit and CTA click gets credited to you.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
        whileHover={{ y: -4 }}
        className="flex aspect-square w-full max-w-xs shrink-0 flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-6 text-center transition-shadow hover:shadow-lg sm:max-w-sm sm:p-8"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 220, damping: 16 }}
          className="relative flex h-16 w-16 items-center justify-center rounded-lg border border-hdfc-blue-100 bg-hdfc-blue-50 sm:h-20 sm:w-20"
        >
          <span className="absolute inset-0 rounded-lg bg-hdfc-blue-50 animate-pulse-ring" />
          <Link2
            aria-hidden="true"
            strokeWidth={2}
            className="relative h-7 w-7 text-hdfc-navy animate-float sm:h-9 sm:w-9"
          />
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-4 text-lg font-bold text-hdfc-navy sm:mt-6 sm:text-2xl"
        >
          Employee Link Portal
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.4 }}
          className="mt-1.5 text-sm text-slate-500 sm:mt-2 sm:text-base"
        >
          Create trackable links for HDFC Bank campaigns.
        </motion.p>

        <motion.button
          type="button"
          onClick={() => navigate(ROUTES.generate)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.56, duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-hdfc-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-hdfc-navy-dark sm:mt-8 sm:px-8 sm:py-4 sm:text-base"
        >
          Generate My Link
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5"
          />
        </motion.button>
      </motion.div>

      <StepIndicator activeStep={JOURNEY_STEP_INDEX.openPortal} compact />
    </PageShell>
  );
}
