import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { JOURNEY_STEPS } from '../lib/constants.js';

/**
 * Horizontal breadcrumb of the link-generation journey.
 * @param {{ activeStep: number, compact?: boolean }} props
 */
export default function StepIndicator({ activeStep, compact = false }) {
  return (
    <div
      className={[
        'mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-2 px-4 text-center sm:gap-x-3',
        compact ? 'shrink-0 py-2' : 'py-8',
      ].join(' ')}
      aria-label="Progress"
    >
      {JOURNEY_STEPS.map((label, index) => (
        <div key={label} className="flex items-center gap-2 sm:gap-3">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            aria-current={index === activeStep ? 'step' : undefined}
            className={[
              'text-xs font-semibold sm:text-sm',
              index <= activeStep ? 'text-hdfc-navy' : 'text-slate-400',
            ].join(' ')}
          >
            {label}
          </motion.span>
          {index < JOURNEY_STEPS.length - 1 && (
            <ArrowRight
              aria-hidden="true"
              className={[
                'h-4 w-4 shrink-0',
                index < activeStep ? 'text-hdfc-red' : 'text-slate-300',
              ].join(' ')}
            />
          )}
        </div>
      ))}
    </div>
  );
}
