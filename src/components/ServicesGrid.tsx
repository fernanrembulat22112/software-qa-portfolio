import { Link } from 'react-router-dom'
import { ArrowClockwise, ArrowUpRight, Bug, CheckCircle, ClipboardText, DeviceMobile, GameController, Globe, ListChecks, MagnifyingGlass, Play } from '@/components/slab'
import type { Icon } from '@/components/slab'

type Stage = {
  index: string
  label: string
  body: string
  Icon: Icon
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Understand requirements',
    body: 'Review goals, user journeys, supported devices, and release scope.',
    Icon: MagnifyingGlass,
  },
  {
    index: '02',
    label: 'Prepare test scenarios',
    body: 'Turn requirements into focused manual test cases and exploratory checks.',
    Icon: ListChecks,
  },
  {
    index: '03',
    label: 'Execute manual tests',
    body: 'Run agreed functional, smoke, sanity, and regression checks.',
    Icon: Play,
  },
  {
    index: '04',
    label: 'Document defects',
    body: 'Record clear reproduction steps and expected versus actual results.',
    Icon: Bug,
  },
  {
    index: '05',
    label: 'Retest and summarize',
    body: 'Verify fixes, check impacted areas, and share a concise QA summary.',
    Icon: ArrowClockwise,
  },
]

type Service = {
  index: string
  title: string
  description: string
  Icon: Icon
  activities: string[]
  deliverable: string
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Website QA Testing',
    description: 'Catch issues across important website journeys before they frustrate customers or block a task.',
    Icon: Globe,
    activities: ['Functionality and navigation', 'Forms and validation', 'Checkout workflows', 'UI consistency'],
    deliverable: 'Test case results and a prioritized defect report',
  },
  {
    index: '02',
    title: 'Mobile Application QA Testing',
    description: 'Check core app features and mobile experiences for functional issues and usability friction.',
    Icon: DeviceMobile,
    activities: ['Feature and functional checks', 'Mobile UI validation', 'Usability observations', 'Device-focused exploratory checks'],
    deliverable: 'Execution notes with reproducible mobile defects',
  },
  {
    index: '03',
    title: 'Game QA Testing',
    description: 'Exercise gameplay flows and progression to help surface issues that interrupt a player’s session.',
    Icon: GameController,
    activities: ['Gameplay and progression checks', 'UI defect checks', 'Smoke testing', 'Regression testing'],
    deliverable: 'Gameplay test results and clear bug reports',
  },
  {
    index: '04',
    title: 'Regression Testing & Bug Retesting',
    description: 'Confirm reported fixes and check related features after a change or update.',
    Icon: ArrowClockwise,
    activities: ['Retest resolved defects', 'Check affected user journeys', 'Run agreed regression scenarios', 'Record pass or fail results'],
    deliverable: 'Retest outcomes and regression summary',
  },
  {
    index: '05',
    title: 'Bug Reporting & QA Documentation',
    description: 'Give your team structured findings that are easier to understand, reproduce, and act on.',
    Icon: ClipboardText,
    activities: ['Step-by-step reproduction', 'Expected versus actual results', 'Severity and priority context', 'Screenshots when available'],
    deliverable: 'JIRA-ready structured defect reports and a QA summary',
  },
]

export default function ServicesGrid() {
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">
          Practical QA for better software.
        </h1>
        <p className="pgrid__lede">
          I'm a BS Computer Science graduate and Video Game QA Tester expanding into Software QA, with experience in manual functional, smoke, sanity, and regression testing, JIRA bug reporting, and defect verification.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">QA workflow</span>
            <h2 className="sgrid__method-title" id="method-title">
              Clear steps.
              <br />
              <span>Useful findings.</span>
            </h2>
            <p className="sgrid__method-sub">
              A straightforward manual QA process, agreed around your product and priorities.
            </p>
          </div>

          <ol className="sgrid__stages" role="list">
            {STAGES.map((s) => {
              const StageIcon = s.Icon
              return (
                <li key={s.index} className="sgrid__stage">
                  <span className="sgrid__stage-ghost" aria-hidden="true">{s.index}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{s.label}</h3>
                  <p className="sgrid__stage-body">{s.body}</p>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Five cards, each carrying the marks of what it is built with. */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">QA services</h2>
            <p className="sgrid__offers-sub">Choose focused support for the work in front of you.</p>
          </div>
          <ul className="sgrid__services" role="list">
            {SERVICES.map((s) => (
              <li key={s.title} className="sgrid__service">
                <div className="sgrid__service-top">
                  <span className="sgrid__service-icon" aria-hidden="true">
                    <s.Icon size={23} weight="duotone" />
                  </span>
                  <span className="sgrid__service-index" aria-hidden="true">{s.index} / 05</span>
                </div>
                <h3 className="sgrid__service-title">{s.title}</h3>
                <p className="sgrid__service-desc">{s.description}</p>
                <div className="sgrid__service-group">
                  <h4>Key activities</h4>
                  <ul className="sgrid__bullets" role="list">
                    {s.activities.map((activity) => (
                      <li key={activity} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sgrid__service-group sgrid__deliverable">
                  <h4>Example deliverable</h4>
                  <p>{s.deliverable}</p>
                </div>
                <Link className="sgrid__contact" to="/contact" aria-label={`Contact me about ${s.title}`}>
                  Contact Me
                  <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
