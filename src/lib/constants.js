/** Route paths used across the portal. */
export const ROUTES = {
  home: '/',
  generate: '/generate',
};

/** Root domain of the customer-facing campaign experience (used when embedding). */
export const CAMPAIGN_EMBED_URL = 'https://goldeneraai.click2fingage.com/';

/** Full page path used when building the trackable link (GoldenEra AI Campaign). */
export const CAMPAIGN_BASE_URL = 'https://goldeneraai.click2fingage.com/xpressway.html';

/** Static UTM parameters applied to every generated trackable link. */
export const CAMPAIGN_UTM_PARAMS = {
  utm_source: 'AI-Campaign',
  utm_medium: 'Assisted',
  utm_campaign: 'GoldenEra-AICampaign',
};

/** Journey steps shown in the step indicator, in order. */
export const JOURNEY_STEPS = [
  'Open Portal',
  'Enter Employee Details',
  'Generate Trackable Link',
  'Copy or Share',
];

/** Step index for each screen/state of the journey. */
export const JOURNEY_STEP_INDEX = {
  openPortal: 0,
  enterDetails: 1,
  generateLink: 2,
  copyOrShare: 3,
};

/** Fields captured before a trackable link can be generated. */
export const EMPLOYEE_FIELDS = [
  {
    name: 'employeeName',
    label: 'Employee Name',
    placeholder: 'Enter employee name',
    requiredMessage: 'Employee name is required',
  },
  {
    name: 'employeeCode',
    label: 'Employee Code',
    placeholder: 'Enter employee code',
    requiredMessage: 'Employee code is required',
  },
  {
    name: 'branchCode',
    label: 'Branch Code',
    placeholder: 'Enter branch code',
    requiredMessage: 'Branch code is required',
  },
];

/** Empty form state derived from the field definitions. */
export const EMPTY_EMPLOYEE_FORM = EMPLOYEE_FIELDS.reduce(
  (acc, field) => ({ ...acc, [field.name]: '' }),
  {},
);

/** Copy used on the share sheet when the Web Share API is available. */
export const SHARE_TITLE = 'My HDFC Bank campaign link';

/** Base URL of the link-shortener API (Express server in /server). */
export const SHORTENER_API_URL = import.meta.env.VITE_SHORTENER_API_URL || 'http://localhost:3001';

/** How long the "Copied!" confirmation stays visible (ms). */
export const COPY_FEEDBACK_DURATION = 2000;