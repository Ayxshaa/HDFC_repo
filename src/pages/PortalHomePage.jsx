import { ArrowRight, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import PageShell from '../components/PageShell.jsx';
import StepIndicator from '../components/StepIndicator.jsx';
import { JOURNEY_STEP_INDEX, ROUTES } from '../lib/constants.js';

export default function PortalHomePage() {
  const navigate = useNavigate();

  return (
    <PageShell
      scroll={false}
      mainClassName="gap-[clamp(0.375rem,1.6vh,1.25rem)] px-4 py-[clamp(0.375rem,1.6vh,1rem)] min-h-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="min-h-0 w-full max-w-xl shrink text-center"
      >
        <img
          src="/assets/golden-era-banner-home.webp"
          alt="My Golden Era — Senior Citizen Memory Experience. Help your customers bring a special memory from their past back to life."
          width={1078}
          height={438}
          fetchPriority="high"
          decoding="async"
          className="mx-auto h-auto max-h-[clamp(72px,22vh,220px)] w-auto max-w-full rounded-2xl shadow-sm"
        />
      </motion.div>

      <div className="min-h-0 shrink-0 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-[clamp(1.1rem,3.2vh,2.25rem)] font-bold leading-tight text-hdfc-navy"
        >
          My Golden Era AI Campaign
        </motion.h1>
        <div className="mx-auto mt-[clamp(0.25rem,0.8vh,0.75rem)] h-1 w-16 bg-hdfc-red" />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mx-auto mt-[clamp(0.25rem,1vh,1rem)] max-w-xl text-[clamp(0.7rem,1.7vh,1rem)] text-slate-600"
        >
          Create your personalised link and share it with your customers.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
        whileHover={{ y: -4 }}
        className="flex w-full max-w-xs shrink flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-[clamp(0.75rem,2.4vh,2rem)] text-center transition-shadow hover:shadow-lg sm:max-w-sm"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 220, damping: 16 }}
          className="relative flex h-[clamp(2.25rem,6.4vh,5rem)] w-[clamp(2.25rem,6.4vh,5rem)] items-center justify-center rounded-lg border border-hdfc-blue-100 bg-hdfc-blue-50"
        >
          <span className="absolute inset-0 rounded-lg bg-hdfc-blue-50 animate-pulse-ring" />
          <Link2
            aria-hidden="true"
            strokeWidth={2}
            className="relative h-[45%] w-[45%] text-hdfc-navy animate-float"
          />
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-[clamp(0.375rem,1.4vh,1.5rem)] text-[clamp(0.95rem,2.4vh,1.5rem)] font-bold text-hdfc-navy"
        >
          Employee Custom URL Portal
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.4 }}
          className="mt-[clamp(0.125rem,0.6vh,0.5rem)] text-[clamp(0.7rem,1.5vh,1rem)] text-slate-500"
        >
          Create links for HDFC Bank campaigns.
        </motion.p>

        <motion.button
          type="button"
          onClick={() => navigate(ROUTES.generate)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.56, duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group mt-[clamp(0.5rem,1.8vh,2rem)] inline-flex items-center justify-center gap-2 rounded-md bg-hdfc-navy px-[clamp(1rem,3vw,2rem)] py-[clamp(0.5rem,1.3vh,1rem)] text-[clamp(0.78rem,1.7vh,1rem)] font-semibold text-white transition-colors hover:bg-hdfc-navy-dark"
        >
          Generate My Custom Link
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
          />
        </motion.button>
      </motion.div>

      <StepIndicator activeStep={JOURNEY_STEP_INDEX.openPortal} dense />
    </PageShell>
  );
}
