import { Link2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { EMPLOYEE_FIELDS } from '../lib/constants.js';

/**
 * Employee detail capture step.
 * @param {{
 *   values: Record<string, string>,
 *   errors: Record<string, string>,
 *   onFieldChange: (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => void,
 *   onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
 * }} props
 */
export default function EmployeeDetailsForm({ values, errors, onFieldChange, onSubmit }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4 sm:mb-5 sm:pb-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-hdfc-blue-100 bg-hdfc-blue-50 sm:h-12 sm:w-12">
          <Link2 aria-hidden="true" className="h-5 w-5 text-hdfc-navy" />
        </span>
        <div>
          <h1 className="text-base font-bold text-hdfc-navy sm:text-xl">Create Trackable Link</h1>
          <p className="text-xs text-slate-500 sm:text-sm">
            Fill in your details to generate a personalised campaign link.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-3 sm:space-y-4">
        {EMPLOYEE_FIELDS.map(({ name, label, placeholder }) => {
          const error = errors[name];

          return (
            <div key={name}>
              <label
                htmlFor={name}
                className="mb-1 block text-xs font-semibold text-slate-700 sm:text-sm"
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type="text"
                value={values[name]}
                onChange={onFieldChange(name)}
                placeholder={placeholder}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? `${name}-error` : undefined}
                className={[
                  'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 sm:py-3',
                  'focus:ring-2 focus:ring-hdfc-navy/20',
                  error
                    ? 'border-hdfc-red focus:border-hdfc-red'
                    : 'border-slate-200 focus:border-hdfc-navy',
                ].join(' ')}
              />
              {error && (
                <p id={`${name}-error`} className="mt-1 text-xs font-medium text-hdfc-red">
                  {error}
                </p>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          className="w-full rounded-md bg-hdfc-navy py-3 text-sm font-semibold text-white transition-colors hover:bg-hdfc-navy-dark active:scale-[0.99] sm:py-3.5 sm:text-base"
        >
          Generate Link
        </button>
      </form>
    </motion.div>
  );
}
