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
      <form onSubmit={onSubmit} noValidate className="space-y-4 sm:space-y-5">
        {EMPLOYEE_FIELDS.map(({ name, label, placeholder }) => {
          const error = errors[name];

          return (
            <div key={name}>
              <label
                htmlFor={name}
                className="mb-1.5 block text-sm font-bold text-slate-800 sm:text-base"
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
                  'w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 sm:py-3.5 sm:text-base',
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
          className="w-full rounded-md bg-hdfc-navy py-3.5 text-sm font-semibold text-white transition-colors hover:bg-hdfc-navy-dark active:scale-[0.99] sm:py-4 sm:text-base"
        >
          Generate My Link
        </button>
      </form>
    </motion.div>
  );
}
