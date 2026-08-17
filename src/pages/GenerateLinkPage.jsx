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
    <PageShell mainClassName="px-4 py-3">
      <div className="w-full max-w-lg">
        <motion.button
          type="button"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(ROUTES.home)}
          className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-hdfc-navy hover:text-hdfc-navy-dark sm:text-sm"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Back to Portal
        </motion.button>

        <motion.div
          layout
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="overflow-hidden rounded-lg border border-slate-200 bg-white p-5 sm:p-7"
        >
          <AnimatePresence mode="wait" initial={false}>
            {link ? (
              <GeneratedLinkCard
                key="success"
                link={link}
                copied={copied}
                onCopy={handleCopy}
                onReset={handleReset}
              />
            ) : (
              <EmployeeDetailsForm
                key="form"
                values={values}
                errors={errors}
                onFieldChange={handleFieldChange}
                onSubmit={handleSubmit}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <StepIndicator
        activeStep={link ? JOURNEY_STEP_INDEX.copyOrShare : JOURNEY_STEP_INDEX.enterDetails}
        compact
      />
    </PageShell>
  );
}
