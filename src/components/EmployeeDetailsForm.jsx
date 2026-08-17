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
      <form onSubmit={onSubmit} noValidate className="space-y-[clamp(0.5rem,1.6vh,1.25rem)]">
        {EMPLOYEE_FIELDS.map(({ name, label, placeholder }) => {
          const error = errors[name];

          return (
            <div key={name}>
              <label
                htmlFor={name}
                className="mb-[clamp(0.125rem,0.5vh,0.375rem)] block text-[clamp(0.75rem,1.6vh,1rem)] font-bold text-slate-800"
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
                  'w-full rounded-lg border bg-white px-4 py-[clamp(0.5rem,1.3vh,0.875rem)] text-[clamp(0.75rem,1.6vh,1rem)] text-slate-800 outline-none transition-all placeholder:text-slate-400',
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
          className="w-full rounded-md bg-hdfc-navy py-[clamp(0.6rem,1.6vh,1rem)] text-[clamp(0.78rem,1.7vh,1rem)] font-semibold text-white transition-colors hover:bg-hdfc-navy-dark active:scale-[0.99]"
        >
          Generate My Link
        </button>
      </form>
    </motion.div>
  );
}
