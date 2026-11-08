export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Five questions, two or three sentences each: the accordion sits in a
 * fixed panel and more than that pushes the email row off the plate.
 */
export const FAQS: QA[] = [
  {
    q: 'What do you do?',
    a: 'I provide manual QA testing for websites, mobile applications, and games. This includes functional, smoke, sanity, and regression testing, JIRA defect reporting, and verifying fixes.',
  },
  {
    q: 'How fast can you start?',
    a: 'Start timing depends on the project scope and my availability. Share your target dates and testing needs, and I can confirm whether I am available.',
  },
  {
    q: 'How much do you charge?',
    a: 'I do not have a fixed public rate. Pricing depends on the scope, test environment, and reporting needs; I can discuss an estimate after reviewing your project.',
  },
  {
    q: 'Where are you based?',
    a: 'I am open to remote Software QA opportunities. We can confirm location and time-zone overlap when discussing a role or project.',
  },
  {
    q: 'What happens after I write?',
    a: 'I’ll review the project details you share and discuss your testing needs and possible next steps. If I need more information, I’ll ask before suggesting a scope.',
  },
]
