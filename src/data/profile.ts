/**
 * YOUR IDENTITY - start here.
 *
 * Everything that says who you are lives in this file: name, handle, photo,
 * socials, email and the Home headline. Every value below is a PLACEHOLDER.
 * Replace the text, or hand this file to your AI assistant and tell it what
 * to put in each field.
 *
 * Page-specific copy (projects, services, testimonials, FAQs) lives in the
 * other files in src/data/ and at the top of each view component.
 */

import { Briefcase, SealCheck, Clock, type Icon } from '@/components/slab'

export const PROFILE_IMAGE_SRC = '/images/profile.png'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

export const SOCIAL_URLS = {
  linkedin: 'https://www.linkedin.com/in/fernan-rembulat-741625247',
  facebook: '', // Add the full HTTPS profile URL to enable the Facebook link.
  discord: '', // Add a profile URL; a Discord username can be added as a copy action later.
} as const

export function isValidSocialUrl(href: string): boolean {
  try {
    return new URL(href).protocol === 'https:'
  } catch {
    return false
  }
}

/** A proof fact on the phone's Home: a glyph, a short value, a caption. */
export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  /** First name, used in "Hi, I'm ___." on About. */
  firstName: string
  handle: string
  /** Short role line under the handle on phones. */
  role: string
  /** Square image. An SVG, WebP or PNG with a transparent background looks best. */
  avatarSrc: string
  /** Tooltip / screen-reader label on the verified tick next to your name. */
  verifiedLabel: string
  email: string
  location: string
  /** Three short proof facts shown on phones under the Home lede. */
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Fernan Rembulat',
  firstName: 'Fernan',
  handle: '@fernanr',
  role: 'Video Game QA Tester',
  avatarSrc: '/avatar.svg',
  verifiedLabel: 'Computer Science graduate',
  email: 'you@example.com',
  location: 'Remote / Open to opportunities',
  // Pick any icon from https://phosphoricons.com and import it above.
  stats: [
    { value: 'Manual', label: 'Functional testing', Icon: Briefcase },
    { value: 'JIRA', label: 'Defect tracking', Icon: SealCheck },
    { value: 'SQL', label: 'Learning', Icon: Clock },
  ],
  // The intro types this line, then flies it into the Home headline.
  // Keep it short: two halves, 5-8 words total.
  displayName: { line1: 'Software QA Tester |', line2: 'Game, Web & Mobile' },
  hero: {
    body: "I'm a Computer Science graduate and QA Tester with hands-on experience in manual testing, defect reporting, and quality assurance. I help identify software issues, verify functionality, and improve digital experiences.",
    portraitSrc: '/avatar.svg',
    portraitAlt: 'Fernan Rembulat portrait',
  },
  socials: [
    { label: 'Facebook profile', href: SOCIAL_URLS.facebook, iconPath: '/icons/facebook.svg' },
    { label: 'LinkedIn profile', href: SOCIAL_URLS.linkedin, iconPath: '/icons/linkedin.svg' },
    { label: 'Discord profile', href: SOCIAL_URLS.discord, iconPath: '/icons/discord.svg' },
  ],
}
