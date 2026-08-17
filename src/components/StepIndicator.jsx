import { ArrowRight, DoorOpen, Link2, Share2, User } from 'lucide-react';
import { motion } from 'framer-motion';

import { JOURNEY_STEPS } from '../lib/constants.js';

const STEP_ICONS = [DoorOpen, User, Link2, Share2];

/**
 * Icon breadcrumb of the link-generation journey.
 * @param {{ activeStep: number, compact?: boolean, dense?: boolean }} props
 */
export default function StepIndicator({ activeStep, compact = false, dense = false }) {
  return (
    <div
      className={[
        'mx-auto flex max-w-3xl flex-wrap items-start justify-center gap-x-1 px-4 text-center sm:gap-x-3',
        dense ? 'shrink-0 gap-y-1 py-[clamp(0.25rem,1vh,0.75rem)]' : compact ? 'shrink-0 gap-y-3 py-3' : 'gap-y-3 py-8',
      ].join(' ')}
      aria-label="Progress"
    >
      {JOURNEY_STEPS.map((label, index) => {
        const Icon = STEP_ICONS[index];
        const isActive = index === activeStep;

        return (
          <div key={label} className="flex items-start gap-1 sm:gap-3">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              aria-current={isActive ? 'step' : undefined}
              className={dense ? 'flex w-12 flex-col items-center gap-1 sm:w-16' : 'flex w-14 flex-col items-center gap-1.5 sm:w-16'}
            >
              <span
                className={[
                  'flex items-center justify-center rounded-full border-2 transition-colors',
                  dense ? 'h-[clamp(1.5rem,4vh,2.75rem)] w-[clamp(1.5rem,4vh,2.75rem)]' : 'h-9 w-9 sm:h-11 sm:w-11',
                  isActive
                    ? 'border-hdfc-navy bg-hdfc-blue-50 text-hdfc-navy'
                    : 'border-slate-200 bg-white text-slate-400',
                ].join(' ')}
              >
                <Icon aria-hidden="true" className={dense ? 'h-[clamp(0.75rem,1.8vh,1.25rem)] w-[clamp(0.75rem,1.8vh,1.25rem)]' : 'h-4 w-4 sm:h-5 sm:w-5'} />
              </span>
              <span
                className={[
                  'font-semibold leading-tight',
                  dense ? 'text-[clamp(8px,1.4vh,11px)]' : 'text-[10px] sm:text-xs',
                  isActive ? 'text-hdfc-navy' : 'text-slate-400',
                ].join(' ')}
              >
                {label}
              </span>
            </motion.div>
            {index < JOURNEY_STEPS.length - 1 && (
              <ArrowRight
                aria-hidden="true"
                className={dense ? 'mt-2 h-3 w-3 shrink-0 text-slate-300' : 'mt-4 h-4 w-4 shrink-0 text-slate-300 sm:mt-5'}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
