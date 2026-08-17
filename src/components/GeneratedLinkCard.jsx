import { Check, CircleCheck, Copy, RotateCcw, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { SHARE_TITLE } from '../lib/constants.js';

/**
 * Success state showing the generated trackable link with copy/share actions.
 * @param {{
 *   link: string,
 *   copied: boolean,
 *   onCopy: () => void,
 *   onReset: () => void,
 * }} props
 */
export default function GeneratedLinkCard({ link, copied, onCopy, onReset }) {
  const handleShare = async () => {
    if (!link) return;

    if (navigator.share) {
      try {
        await navigator.share({ title: SHARE_TITLE, url: link });
      } catch {
        /* user dismissed the share sheet */
      }
      return;
    }

    onCopy();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="text-center"
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 18 }}
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 sm:h-16 sm:w-16"
      >
        <CircleCheck aria-hidden="true" className="h-7 w-7 sm:h-8 sm:w-8" />
      </motion.span>

      <h1 className="mt-3 text-base font-bold text-hdfc-navy sm:mt-4 sm:text-xl">
        Your Trackable Link is Ready
      </h1>
      <p className="mt-1 text-xs text-slate-500 sm:text-sm">
        Share this link with your customers to start tracking visits.
      </p>

      <div className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-left sm:mt-5">
        <input
          readOnly
          value={link}
          aria-label="Trackable link"
          onFocus={(event) => event.target.select()}
          className="w-full truncate bg-transparent text-xs text-slate-700 outline-none sm:text-sm"
        />
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy link"
          className="shrink-0 rounded-md p-1.5 text-hdfc-navy transition-colors hover:bg-hdfc-blue-100"
        >
          {copied ? (
            <Check aria-hidden="true" className="h-4 w-4 text-emerald-600" />
          ) : (
            <Copy aria-hidden="true" className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:gap-3">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCopy}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-hdfc-navy py-2.5 text-sm font-semibold text-white transition-colors hover:bg-hdfc-navy-dark"
        >
          {copied ? (
            <Check aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Copy aria-hidden="true" className="h-4 w-4" />
          )}
          {copied ? 'Copied!' : 'Copy Link'}
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-2 rounded-md border border-hdfc-navy py-2.5 text-sm font-semibold text-hdfc-navy transition-colors hover:bg-hdfc-blue-50"
        >
          <Share2 aria-hidden="true" className="h-4 w-4" />
          Share Link
        </motion.button>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-hdfc-navy sm:text-sm"
      >
        <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
        Generate another link
      </button>
    </motion.div>
  );
}
