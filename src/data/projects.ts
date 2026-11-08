export type AppStat = { value: string; label: string }

export type AppProject = {
  name: string
  tagline: string
  description: string
  /** Optional - omit for gradient placeholder cards */
  imageSrc?: string
  /** CSS object-position override. Defaults to 'top center'. */
  imagePosition?: string
  /** External brand color - not a site token. Passed via --app-color inline prop. */
  accentColor: string
  stats: AppStat[]
  badge: string
}

/** @deprecated use AppProject */
export type MobileApp = AppProject

export type QaBug = {
  id: string
  title: string
  severity: string
  priority: string
  reproductionSteps: string[]
  expected: string
  actual: string
}

export type QaCaseStudy = {
  id: string
  title: string
  subtitle: string
  category: 'Game QA' | 'Website QA' | 'Mobile App QA'
  accentColor: string
  environment: string
  approach: string[]
  objective: string
  scope: string[]
  execution: { executed: number; passed: number; failed: number }
  selectedCases: Array<{ id: string; title: string; result: string; detail: string }>
  bugs: QaBug[]
  releaseAssessment: string
  skills: string[]
  pdfUrl: string
  disclosureLabel: string
}

/**
 * Your apps. Every value is a PLACEHOLDER. Screenshots live in
 * public/placeholders/ - swap in your own (960x514 works well).
 */
const STATS: AppStat[] = [
  { value: '0', label: 'Stat one' },
  { value: '0', label: 'Stat two' },
  { value: '0', label: 'Stat three' },
]

const DESC = 'PLACEHOLDER - tell me what to put here: what the app does, who it is for, and where it is published.'

export const mobileApps: MobileApp[] = [
  {
    name: 'App Name One',
    tagline: 'PLACEHOLDER - one-line tagline.',
    description: DESC,
    imageSrc: '/placeholders/app-1.jpg',
    imagePosition: '50% 30%',
    accentColor: '#2563EB',
    stats: STATS,
    badge: 'Badge',
  },
  {
    name: 'App Name Two',
    tagline: 'PLACEHOLDER - one-line tagline.',
    description: DESC,
    imageSrc: '/placeholders/app-2.jpg',
    accentColor: '#7C3AED',
    stats: STATS,
    badge: 'Badge',
  },
  {
    name: 'App Name Three',
    tagline: 'PLACEHOLDER - one-line tagline.',
    description: DESC,
    imageSrc: '/placeholders/app-3.jpg',
    accentColor: '#16A34A',
    stats: STATS,
    badge: 'Badge',
  },
]

export const webApps: AppProject[] = [
  {
    name: 'Web App One',
    tagline: 'PLACEHOLDER - one-line tagline.',
    description: DESC,
    accentColor: '#0EA5E9',
    stats: STATS,
    badge: 'Badge',
  },
  {
    name: 'Web App Two',
    tagline: 'PLACEHOLDER - one-line tagline.',
    description: DESC,
    accentColor: '#EF4444',
    stats: STATS,
    badge: 'Badge',
  },
  {
    name: 'Web App Three',
    tagline: 'PLACEHOLDER - one-line tagline.',
    description: DESC,
    imageSrc: '/placeholders/project-3.jpg',
    accentColor: '#0891B2',
    stats: STATS,
    badge: 'Badge',
  },
  {
    name: 'Web App Four',
    tagline: 'PLACEHOLDER - one-line tagline.',
    description: DESC,
    imageSrc: '/placeholders/project-4.jpg',
    accentColor: '#F59E0B',
    stats: STATS,
    badge: 'Badge',
  },
]

export const qaCaseStudies: QaCaseStudy[] = [
  {
    id: 'game-qa',
    title: 'Game QA Testing',
    subtitle: 'Sample mobile action / casual game',
    category: 'Game QA',
    accentColor: '#7C3AED',
    environment: 'Android 14',
    approach: [
      'Manual black-box testing',
      'Functional testing',
      'Gameplay validation',
      'Exploratory testing',
      'Regression testing',
      'UI testing',
    ],
    objective: 'Validate core gameplay flow, progression persistence, UI stability, and release readiness for a mobile action game.',
    scope: [
      'Primary gameplay loop and progression events',
      'Session restart and relaunch behavior',
      'UI responsiveness after orientation changes',
      'Reward flow and state updates',
    ],
    execution: { executed: 12, passed: 10, failed: 2 },
    selectedCases: [
      { id: 'GC-01', title: 'Player progression persists after relaunch', result: 'Failed', detail: 'Reopened the app after a session to verify saved state.' },
      { id: 'GC-02', title: 'Reward animation and value update', result: 'Failed', detail: 'Validated the reward flow after a completed task.' },
      { id: 'GC-03', title: 'Orientation change does not break gameplay HUD', result: 'Passed', detail: 'Confirmed the UI remains usable after rotating the device.' },
    ],
    bugs: [
      {
        id: 'GBUG-001',
        title: 'Player progression is not restored after relaunch',
        severity: 'Critical',
        priority: 'High',
        reproductionSteps: [
          'Launch the game and complete a short run or progression milestone.',
          'Close the app completely.',
          'Relaunch the app and observe the player state.',
        ],
        expected: 'The player progression should be restored correctly after relaunch.',
        actual: 'The progression does not restore and the player loses the expected state.',
      },
      {
        id: 'GBUG-002',
        title: 'Gameplay UI overlaps after device orientation change',
        severity: 'Medium',
        priority: 'Medium',
        reproductionSteps: [
          'Open the game on a supported device.',
          'Rotate the device from portrait to landscape or vice versa.',
          'Observe the HUD and gameplay elements.',
        ],
        expected: 'The gameplay UI should reflow cleanly and maintain spacing and alignment.',
        actual: 'The UI overlaps and reduces usability after a device orientation change.',
      },
      {
        id: 'GBUG-003',
        title: 'Reward animation plays but reward value is not immediately updated',
        severity: 'Medium',
        priority: 'Medium',
        reproductionSteps: [
          'Complete a reward-triggering action in the game.',
          'Observe the reward animation and the current reward value.',
          'Check the state immediately after the animation completes.',
        ],
        expected: 'The displayed reward value should update immediately when the animation completes.',
        actual: 'The animation plays, but the reward value is not updated at the expected moment.',
      },
    ],
    releaseAssessment: 'Progression persistence is a high-risk issue requiring a fix and regression testing before release.',
    skills: ['Manual QA', 'Functional Testing', 'Gameplay Validation', 'Regression Testing', 'UI QA', 'Bug Reporting'],
    pdfUrl: '/qa-documents/Game_QA_Portfolio_Sample.pdf',
    disclosureLabel: 'Simulated Personal QA Portfolio Project — Not Client Work.',
  },
  {
    id: 'website-qa',
    title: 'Website QA Testing',
    subtitle: 'Sample e-commerce website',
    category: 'Website QA',
    accentColor: '#0EA5E9',
    environment: 'Windows 11 / Google Chrome',
    approach: [
      'Manual black-box testing',
      'Functional testing',
      'Exploratory testing',
      'Negative testing',
      'UI and usability testing',
    ],
    objective: 'Verify checkout flow, validation logic, and usability consistency for a sample e-commerce website.',
    scope: [
      'Checkout flow and required field validation',
      'Promotional discount handling',
      'Cart quantity updates and subtotal recalculation',
      'User feedback and error clarity',
    ],
    execution: { executed: 12, passed: 10, failed: 2 },
    selectedCases: [
      { id: 'WC-01', title: 'Checkout submission with missing shipping address', result: 'Failed', detail: 'Validated required shipping details during checkout submission.' },
      { id: 'WC-02', title: 'Invalid promo code rejection feedback', result: 'Failed', detail: 'Checked whether invalid discount codes were clearly rejected.' },
      { id: 'WC-03', title: 'Cart subtotal updates after quantity change', result: 'Passed', detail: 'Confirmed subtotal recalculation after modifying cart quantity.' },
    ],
    bugs: [
      {
        id: 'BUG-001',
        title: 'Checkout allows submission without required shipping address',
        severity: 'High',
        priority: 'High',
        reproductionSteps: [
          'Open the checkout page.',
          'Leave the shipping address fields empty.',
          'Submit the checkout form.',
        ],
        expected: 'The checkout form should block submission until all required shipping address details are provided.',
        actual: 'The form accepts the submission without the required shipping address, allowing invalid checkout.',
      },
      {
        id: 'BUG-002',
        title: 'Invalid promo code is accepted without clear rejection feedback',
        severity: 'Medium',
        priority: 'Medium',
        reproductionSteps: [
          'Add a product to the cart.',
          'Attempt to apply an invalid promo code.',
          'Submit the promotion field.',
        ],
        expected: 'The application should reject the invalid code and show clear feedback.',
        actual: 'The invalid code is accepted with no clear rejection feedback.',
      },
      {
        id: 'BUG-003',
        title: 'Cart subtotal does not immediately refresh after quantity change',
        severity: 'Medium',
        priority: 'Low',
        reproductionSteps: [
          'Add a product to the cart.',
          'Change the quantity value.',
          'Observe the cart total before completing any further actions.',
        ],
        expected: 'The cart subtotal should update immediately after the quantity is changed.',
        actual: 'The subtotal does not refresh immediately after the quantity change.',
      },
    ],
    releaseAssessment: 'Checkout validation should be fixed and retested before release to reduce cart and order submission risk.',
    skills: ['Manual QA', 'Functional Testing', 'Negative Testing', 'UI/Usability QA', 'Bug Reporting', 'Regression Testing'],
    pdfUrl: '/qa-documents/Website_QA_Portfolio_Sample.pdf',
    disclosureLabel: 'Simulated Personal QA Portfolio Project — Not Client Work.',
  },
  {
    id: 'mobile-app-qa',
    title: 'Mobile App QA Testing',
    subtitle: 'Sample mobile shopping app',
    category: 'Mobile App QA',
    accentColor: '#22C55E',
    environment: 'Android 14',
    approach: [
      'Manual black-box testing',
      'Functional testing',
      'Exploratory testing',
      'Negative testing',
      'UI testing',
      'Compatibility testing',
    ],
    objective: 'Validate shopping flow reliability, required field enforcement, and orientation resilience for a mobile shopping app.',
    scope: [
      'Checkout validation and required fields',
      'Product layout behavior after rotation',
      'Cart totals and update timing',
      'Compatibility across mobile device conditions',
    ],
    execution: { executed: 12, passed: 10, failed: 2 },
    selectedCases: [
      { id: 'MC-01', title: 'Checkout button remains active with missing address', result: 'Failed', detail: 'Validated whether the address requirement prevented checkout submission.' },
      { id: 'MC-02', title: 'Product layout after rotation', result: 'Failed', detail: 'Reviewed the UI as the device orientation changed during browsing.' },
      { id: 'MC-03', title: 'Cart total refresh after quantity update', result: 'Passed', detail: 'Confirmed the cart recalculates immediately when quantity changes.' },
    ],
    bugs: [
      {
        id: 'MBUG-001',
        title: 'Checkout button remains active with required address missing',
        severity: 'High',
        priority: 'High',
        reproductionSteps: [
          'Open the mobile shopping app.',
          'Begin checkout without completing the required address field.',
          'Attempt to continue to checkout.',
        ],
        expected: 'The checkout action should be blocked until required address information is provided.',
        actual: 'The checkout button remains active even when the required address is missing.',
      },
      {
        id: 'MBUG-002',
        title: 'Product layout overlaps after device rotation',
        severity: 'Medium',
        priority: 'Medium',
        reproductionSteps: [
          'Open a product listing or detail screen.',
          'Rotate the device from portrait to landscape.',
          'Observe the product layout and content placement.',
        ],
        expected: 'The product layout should remain aligned and readable after rotation.',
        actual: 'The layout overlaps and causes UI disruption after device rotation.',
      },
      {
        id: 'MBUG-003',
        title: 'Cart total does not immediately refresh after quantity change',
        severity: 'Medium',
        priority: 'Low',
        reproductionSteps: [
          'Add a product to the cart.',
          'Change the product quantity.',
          'Observe the total before proceeding.',
        ],
        expected: 'The cart total should refresh as soon as the quantity changes.',
        actual: 'The cart total does not immediately refresh after the quantity change.',
      },
    ],
    releaseAssessment: 'Checkout validation and orientation-related UI behavior require attention before release.',
    skills: ['Manual QA', 'Mobile QA', 'Negative Testing', 'Compatibility Testing', 'UI QA', 'Defect Reporting'],
    pdfUrl: '/qa-documents/Mobile_App_QA_Portfolio_Sample.pdf',
    disclosureLabel: 'Simulated Personal QA Portfolio Project — Not Client Work.',
  },
]
