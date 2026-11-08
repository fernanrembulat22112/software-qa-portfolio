import { qaCaseStudies, type QaCaseStudy } from './projects'

export type ShowcaseCategory = 'all' | 'test-cases' | 'bug-reports' | 'test-execution' | 'testing-evidence'

export const showcaseCategories: { id: ShowcaseCategory; label: string }[] = [
  { id: 'all', label: 'All Evidence' },
  { id: 'test-cases', label: 'Test Cases' },
  { id: 'bug-reports', label: 'Bug Reports' },
  { id: 'test-execution', label: 'Test Execution' },
  { id: 'testing-evidence', label: 'Testing Evidence' },
]

function getStudy(id: QaCaseStudy['id']) {
  const study = qaCaseStudies.find((item) => item.id === id)
  if (!study) throw new Error(`QA case study not found: ${id}`)
  return study
}

const websiteStudy = getStudy('website-qa')
const mobileStudy = getStudy('mobile-app-qa')
const gameStudy = getStudy('game-qa')

export const showcaseTestCases = [
  {
    study: websiteStudy,
    testCase: websiteStudy.selectedCases[0],
    bug: websiteStudy.bugs[0],
    testingType: 'Manual functional testing',
    preconditions: 'Illustrative setup: a product is in the sample cart and the required shipping address fields are blank.',
  },
  {
    study: mobileStudy,
    testCase: mobileStudy.selectedCases[0],
    bug: mobileStudy.bugs[0],
    testingType: 'Manual functional and negative testing',
    preconditions: 'Illustrative setup: the sample shopping app is open at checkout with its required address field incomplete.',
  },
  {
    study: gameStudy,
    testCase: gameStudy.selectedCases[0],
    bug: gameStudy.bugs[0],
    testingType: 'Manual functional and regression testing',
    preconditions: 'Illustrative setup: a sample game session has reached a progression milestone and can be relaunched.',
  },
]

export const showcaseBugReports = [
  { study: gameStudy, bug: gameStudy.bugs[0] },
  { study: websiteStudy, bug: websiteStudy.bugs[0] },
  { study: mobileStudy, bug: mobileStudy.bugs[0] },
]

export const showcaseExecution = qaCaseStudies.map((study) => ({
  id: study.id,
  title: study.title,
  executed: study.execution.executed,
  passed: study.execution.passed,
  failed: study.execution.failed,
}))

export const showcaseDocuments = [
  { study: gameStudy, title: 'Game QA Portfolio', description: 'Simulated game-testing case study and supporting QA documentation.' },
  { study: websiteStudy, title: 'Website QA Portfolio', description: 'Simulated website-testing case study and supporting QA documentation.' },
  { study: mobileStudy, title: 'Mobile App QA Portfolio', description: 'Simulated mobile-app testing case study and supporting QA documentation.' },
]