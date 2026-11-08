import { profile } from '@/data/profile'

/**
 * Contact submission.
 *
 * If no endpoint is configured, submitLead() opens a mail draft addressed to
 * VITE_CONTACT_EMAIL or a real profile.email value.
 *
 * To wire a real backend (Formspree, a serverless function, a webhook...):
 *   1. Set VITE_CONTACT_ENDPOINT in .env.production to the URL that accepts
 *      a JSON POST of the Lead type below.
 *   2. Have it answer 2xx on success, or a non-2xx with { "error": "..." }
 *      and that sentence is shown to the visitor as-is.
 * Never put API secrets in VITE_* variables; they are public in client bundles.
 */

export const ENDPOINT: string = import.meta.env.VITE_CONTACT_ENDPOINT ?? ''
export const RECIPIENT = (import.meta.env.VITE_CONTACT_EMAIL ?? profile.email).trim()

export const MAX_NAME = 80
export const MAX_EMAIL = 254
export const MAX_MESSAGE = 5000

// Built from \u escapes so the source stays pure ASCII.
// Control chars U+0000-U+001F and U+007F; when newlines are allowed, tab,
// LF and CR survive. Zero-width and bidi marks always go.
const CTRL_NO_NL = new RegExp('[\\u0000-\\u001F\\u007F]', 'g')
const CTRL_KEEP_NL = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]', 'g')
const ZERO_WIDTH = new RegExp('[\\u200B-\\u200F\\u202A-\\u202E\\u2060\\uFEFF]', 'g')

export function sanitize(input: string, allowNewlines = false): string {
  const controls = allowNewlines ? CTRL_KEEP_NL : CTRL_NO_NL
  return input.replace(controls, '').replace(ZERO_WIDTH, '')
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const CONTACT_RECIPIENT_CONFIGURED = RECIPIENT !== 'you@example.com' && EMAIL_RE.test(RECIPIENT)
export const CONTACT_CONFIGURED = Boolean(ENDPOINT.trim() || CONTACT_RECIPIENT_CONFIGURED)

export type Lead = {
  firstName: string
  lastName: string
  email: string
  message: string
  /** Honeypot. Empty for a person; your backend should drop anything else. */
  website: string
}

export type SubmitResult = { via: 'webhook' } | { via: 'mailto' }

/** Read, trim, cap and sanitise the four fields. Returns null if a required
 *  field is missing or the email does not look like one. */
export function readLead(data: FormData): Lead | null {
  const firstName = sanitize(String(data.get('firstName') ?? '').trim()).slice(0, MAX_NAME)
  const lastName = sanitize(String(data.get('lastName') ?? '').trim()).slice(0, MAX_NAME)
  const email = sanitize(String(data.get('email') ?? '').trim()).slice(0, MAX_EMAIL)
  const message = sanitize(String(data.get('message') ?? '').trim(), true).slice(0, MAX_MESSAGE)
  if (!firstName || !lastName || !email || !message || !EMAIL_RE.test(email)) return null
  const website = String(data.get('website') ?? '')
  return { firstName, lastName, email, message, website }
}

export class SubmitError extends Error {}

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  const endpoint = ENDPOINT.trim()
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => null)
      throw new SubmitError(body?.error || `The server answered ${res.status}.`)
    }
    return { via: 'webhook' }
  }

  if (!CONTACT_RECIPIENT_CONFIGURED) {
    throw new SubmitError('The contact form is not configured. Add a real email address or configure VITE_CONTACT_ENDPOINT.')
  }

  const subject = `Project inquiry from ${lead.firstName} ${lead.lastName}`
  const projectSummary = lead.message.trim().split(/\s+/).slice(0, 8).join(' ')
  const subjectWithProject = projectSummary ? `${subject} - ${projectSummary}` : subject
  const body = [
    `Name: ${lead.firstName} ${lead.lastName}`,
    `Email: ${lead.email}`,
    '',
    'Project details:',
    lead.message,
  ].join('\n')
  // encodeURIComponent on every value blocks header injection (CR/LF) and
  // parameter smuggling via & or ?.
  window.location.href = `mailto:${encodeURIComponent(RECIPIENT)}?subject=${encodeURIComponent(subjectWithProject)}&body=${encodeURIComponent(body)}`
  return { via: 'mailto' }
}
