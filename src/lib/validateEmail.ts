export type EmailValidationError = {
  code: string;
  message: string;
  detail?: string;
};

export type EmailValidationResult = {
  valid: boolean;
  normalized?: string | null; // null when input empty/treated-as-null
  errors: EmailValidationError[];
};

/**
 * Validate an email address with practical RFC-informed rules.
 * - overall length <= 254
 * - local-part <= 64
 * - domain total <= 255
 * - each domain label <= 63 and matches permitted characters
 * - local-part follows dot-atom (no quoted local-parts supported)
 *
 * Returns a structured result with error codes and messages and a normalized value
 * (lowercased and trimmed) when valid.
 */
export function validateEmail(
  input: string | null | undefined,
  options?: { allowInternational?: boolean }
): EmailValidationResult {
  const errors: EmailValidationError[] = [];
  const allowIntl = options?.allowInternational === true;

  if (input === null || input === undefined) {
    errors.push({ code: 'empty', message: 'Email is empty' });
    return { valid: false, normalized: null, errors };
  }

  let email = String(input).trim();
  if (email.length === 0) {
    errors.push({ code: 'empty', message: 'Email is empty' });
    return { valid: false, normalized: null, errors };
  }

  // Overall length
  if (email.length > 254) {
    errors.push({ code: 'too_long', message: 'Email exceeds maximum length of 254 characters' });
    return { valid: false, normalized: null, errors };
  }

  // Disallow non-ASCII unless allowInternational
  if (!allowIntl && /[^\x00-\x7F]/.test(email)) {
    errors.push({ code: 'non_ascii', message: 'Email contains non-ASCII characters' });
    return { valid: false, normalized: null, errors };
  }

  const parts = email.split('@');
  if (parts.length !== 2) {
    errors.push({ code: 'at_missing_or_multiple', message: 'Email must contain a single @ character' });
    return { valid: false, normalized: null, errors };
  }

  const [local, domain] = parts;

  if (local.length === 0) {
    errors.push({ code: 'local_empty', message: 'Local part is empty' });
  }
  if (domain.length === 0) {
    errors.push({ code: 'domain_empty', message: 'Domain part is empty' });
  }

  // Length checks
  if (local.length > 64) {
    errors.push({ code: 'local_too_long', message: 'Local part exceeds 64 characters' });
  }
  if (domain.length > 255) {
    errors.push({ code: 'domain_too_long', message: 'Domain part exceeds 255 characters' });
  }

  // Validate local part using dot-atom (no quoted local-part support)
  // atom = one or more of A-Z a-z 0-9 and !#$%&'*+/=?^_`{|}~-
  const atomRe = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+$/;
  const localAtoms = local.split('.');
  for (let i = 0; i < localAtoms.length; i++) {
    const atom = localAtoms[i];
    if (atom.length === 0) {
      errors.push({ code: 'local_dot_error', message: 'Local part has empty dot-separated atom (consecutive or trailing dot)' });
      break;
    }
    if (!atomRe.test(atom)) {
      errors.push({ code: 'invalid_local', message: 'Local part contains invalid characters', detail: atom });
      break;
    }
  }

  // Validate domain labels
  const labelRe = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/;
  const domainLabels = domain.split('.');
  for (let i = 0; i < domainLabels.length; i++) {
    const label = domainLabels[i];
    if (label.length === 0) {
      errors.push({ code: 'domain_dot_error', message: 'Domain has empty label (consecutive or leading/trailing dot)' });
      break;
    }
    if (label.length > 63) {
      errors.push({ code: 'label_too_long', message: 'A domain label exceeds 63 characters', detail: label });
      break;
    }
    if (!allowIntl && /[^\x00-\x7F]/.test(label)) {
      errors.push({ code: 'domain_non_ascii', message: 'Domain label contains non-ASCII characters', detail: label });
      break;
    }
    if (!labelRe.test(label)) {
      errors.push({ code: 'invalid_domain_label', message: 'Domain label contains invalid characters or structure', detail: label });
      break;
    }
  }

  if (errors.length > 0) {
    return { valid: false, normalized: null, errors };
  }

  // Normalization: lowercase domain (and local for simplicity), trim was already applied
  const normalized = `${local.toLowerCase()}@${domain.toLowerCase()}`;

  return { valid: true, normalized, errors: [] };
}

export default validateEmail;
