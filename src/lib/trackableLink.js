import { CAMPAIGN_BASE_URL, CAMPAIGN_UTM_PARAMS, EMPLOYEE_FIELDS } from './constants.js';

/**
 * Builds the personalised, trackable campaign link for an employee.
 *
 * Produces:
 * https://goldeneraai.click2fingage.com/xpressway.html?utm_source=AI-Campaign
 *   &utm_medium=Assisted&utm_campaign=GoldenEra-AICampaign
 *   &LGCode=<employeeCode>&BCode=<branchCode>&BRCode=<branchCode>&LCCode=<employeeCode>
 *
 * Every visit and CTA click on this URL gets credited to the employee code.
 */
export function buildTrackableLink({ employeeCode, branchCode }) {
  const url = new URL(CAMPAIGN_BASE_URL);

  Object.entries(CAMPAIGN_UTM_PARAMS).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const trimmedEmployeeCode = employeeCode.trim();
  const trimmedBranchCode = branchCode.trim();

  // Order matches spec: LGCode, BCode, BRCode, LCCode
  url.searchParams.set('LGCode', trimmedEmployeeCode); // Employee Code
  url.searchParams.set('BCode', trimmedBranchCode);    // Branch Code
  url.searchParams.set('BRCode', trimmedBranchCode);   // Branch Code
  url.searchParams.set('LCCode', trimmedEmployeeCode); // Employee Code

  return url.toString();
}

/**
 * Validates the employee form.
 * @returns {Record<string, string>} map of field name -> error message (empty when valid)
 */
export function validateEmployeeForm(values) {
  return EMPLOYEE_FIELDS.reduce((errors, field) => {
    if (!values[field.name]?.trim()) {
      errors[field.name] = field.requiredMessage;
    }
    return errors;
  }, {});
}