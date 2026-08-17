import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import EmployeeDetailsForm from '../components/EmployeeDetailsForm.jsx';
import GeneratedLinkCard from '../components/GeneratedLinkCard.jsx';
import PageShell from '../components/PageShell.jsx';
import StepIndicator from '../components/StepIndicator.jsx';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard.js';
import { EMPTY_EMPLOYEE_FORM, JOURNEY_STEP_INDEX, ROUTES } from '../lib/constants.js';
import { buildTrackableLink, validateEmployeeForm } from '../lib/trackableLink.js';

export default function GenerateLinkPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY_EMPLOYEE_FORM);
  const [errors, setErrors] = useState({});
  const [link, setLink] = useState(null);
  const { copied, copy, reset: resetCopied } = useCopyToClipboard();

  const handleFieldChange = useCallback(
    (name) => (event) => {
      const { value } = event.target;
      setValues((previous) => ({ ...previous, [name]: value }));
      setErrors((previous) => ({ ...previous, [name]: undefined }));
    },
    [],
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateEmployeeForm(values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const fullLink = buildTrackableLink(values);
    setLink(fullLink);
    resetCopied();
  };

  const handleCopy = () => copy(link);

  const handleReset = () => {
    setLink(null);
    resetCopied();
  };

  return (
    <PageShell
      scroll={false}
      mainClassName="gap-0 px-4 py-[clamp(0.375rem,1.4vh,1rem)] min-h-0"
    >
      <div className="flex min-h-0 w-full max-w-lg shrink flex-col">
        <motion.button
          type="button"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(ROUTES.home)}
          className="mb-[clamp(0.375rem,1vh,1rem)] inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-hdfc-navy hover:text-hdfc-navy-dark sm:text-sm"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Back to Portal
        </motion.button>

        <AnimatePresence mode="wait" initial={false}>
          {link ? (
            <motion.div
              key="success"
              layout
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="min-h-0 overflow-hidden rounded-lg border border-slate-200 bg-white p-[clamp(0.75rem,2.2vh,1.75rem)]"
            >
              <GeneratedLinkCard
                link={link}
                copied={copied}
                onCopy={handleCopy}
                onReset={handleReset}
              />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex min-h-0 flex-col gap-[clamp(0.375rem,1.2vh,1.25rem)]"
            >
              <div className="shrink-0">
                <h1 className="text-[clamp(1.1rem,3vh,2.25rem)] font-bold leading-tight text-hdfc-navy">
                  Create Your Link
                </h1>
                <p className="mt-[clamp(0.125rem,0.6vh,0.375rem)] text-[clamp(0.7rem,1.6vh,1rem)] text-slate-500">
                  Enter your details below to create your customer link.
                </p>
              </div>

              <div className="min-h-0 shrink text-center">
                <img
                  src="/assets/golden-era-banner-generate.png"
                  alt="My Golden Era — Senior Citizen Memory Experience. Honouring their stories. Celebrating their journey."
                  className="mx-auto h-auto max-h-[clamp(50px,14vh,140px)] w-auto max-w-full rounded-2xl shadow-sm"
                />
              </div>

              <div className="shrink-0 rounded-lg border border-slate-200 bg-white p-[clamp(0.75rem,2vh,1.75rem)]">
                <EmployeeDetailsForm
                  values={values}
                  errors={errors}
                  onFieldChange={handleFieldChange}
                  onSubmit={handleSubmit}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <StepIndicator
        activeStep={link ? JOURNEY_STEP_INDEX.copyOrShare : JOURNEY_STEP_INDEX.enterDetails}
        dense
      />
    </PageShell>
  );
}
