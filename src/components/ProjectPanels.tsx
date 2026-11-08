import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUpRight } from '@/components/slab'
import { lazy, Suspense } from 'react'
import WorkflowSamples from './WorkflowSamples'
import AIStackGrid from './AIStackGrid'
import { AppsSection } from './Projects'
import { useFunnelModal } from './FunnelModal'
import { websiteFunnel } from '@/data/funnels'
import { qaCaseStudies } from '@/data/projects'

const FunnelBarrel = lazy(() => import('./FunnelBarrel'))

/**
 * What the Projects dialogs show. Each panel is the work itself, on screen
 * the moment the dialog opens - no section chrome to read past and no second
 * dialog to click into.
 */

/** Only the strip of macOS windows, drifting on the backdrop. No window. */
export function AutomationsPanel() {
  return (
    <div className="ppanel ppanel--strip">
      <WorkflowSamples />
    </div>
  )
}

/** A plain mac window with a scrolling body, for the sections that are
 *  pages rather than frames. */
function SectionWindow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="ppanel ppanel--window">
      <div className="ppanel__bar">
        <span className="ppanel__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ppanel__url">
          <span className="ppanel__url-host">{label}</span>
        </span>
      </div>
      <div className="ppanel__scroll">{children}</div>
    </div>
  )
}

/** Only the barrel, spinning on the backdrop. Its own page preview still
 *  stacks above (z 9000). */
export function BarrelPanel() {
  const { openFull, modal } = useFunnelModal()
  return (
    <div className="ppanel ppanel--barrel">
      <Suspense fallback={<div className="funnels__barrel-skeleton" aria-hidden="true" />}>
        <FunnelBarrel funnels={websiteFunnel} onOpen={openFull} />
      </Suspense>
      {modal}
    </div>
  )
}

/** The systems as a logo-first grid, in a scrolling window. */
export function AIWindow() {
  return (
    <SectionWindow label="Your systems">
      <AIStackGrid />
    </SectionWindow>
  )
}
export function AppsWindow() {
  return (
    <SectionWindow label="Your apps">
      <AppsSection />
    </SectionWindow>
  )
}

/** The plan document, full height, straight away. */
export function PlanPanel() {
  return (
    <div className="ppanel ppanel--frame">
      <FrameBar
        host="yourdomain.com"
        path="/sample-plan"
      />
      <LiveFrame src="/placeholders/sample-plan.html" title="Sample document" />
    </div>
  )
}

/** `src` is a local page framed in the panel; `path` is what the fake
 *  address bar shows. Point these at your own pages. */
type Build = { id: string; label: string; src: string; path: string }

const BUILDS: Build[] = [
  { id: 'ticketing', label: 'Featured Project One', src: '/placeholders/sample-plan.html?doc=1', path: '/featured-one' },
  { id: 'framework', label: 'Featured Project Two', src: '/placeholders/sample-plan.html?doc=2', path: '/featured-two' },
  { id: 'workflow', label: 'Featured Project Three', src: '/placeholders/sample-plan.html?doc=3', path: '/featured-three' },
]

/** One build, framed, open on arrival. */
function BuildPanel({ build }: { build: Build }) {
  return (
    <div className="ppanel ppanel--frame">
      <FrameBar host="yourdomain.com" path={build.path} />
      <LiveFrame src={build.src} title={build.label} />
    </div>
  )
}
export const TicketingPanel = () => <BuildPanel build={BUILDS[0]} />
export const FrameworkPanel = () => <BuildPanel build={BUILDS[1]} />
export const WorkflowPanel = () => <BuildPanel build={BUILDS[2]} />

function FrameBar({ host, path }: { host: string; path: string }) {
  return (
    <div className="ppanel__bar">
      <span className="ppanel__dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="ppanel__url">
        <span className="ppanel__url-host">{host}</span>
        <span className="ppanel__url-path">{path}</span>
      </span>
    </div>
  )
}

/** Matches `pmodal-panel` (420ms). Same-site frames share the portfolio's
 *  main thread, so loading one mid-animation stalled the open by 100ms+. */
const FRAME_DELAY_MS = 440

function LiveFrame({ src, title }: { src: string; title: string }) {
  const [ready, setReady] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), FRAME_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [])
  return (
    <div className="ppanel__stage">
      {!ready && <div className="ppanel__skeleton" aria-hidden="true" />}
      {mounted && <iframe
        className="ppanel__iframe"
        src={src}
        title={title}
        loading="eager"
        onLoad={() => setReady(true)}
        data-ready={ready ? 'true' : 'false'}
      />}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="qa-modal__stat">
      <span className="qa-modal__stat-label">{label}</span>
      <strong className="qa-modal__stat-value">{value}</strong>
    </div>
  )
}

function SectionBlock({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`qa-modal__section ${className}`}>
      <h3 className="qa-modal__section-title">{title}</h3>
      <div className="qa-modal__section-content">{children}</div>
    </section>
  )
}

function CaseStudyPanel({ study }: { study: (typeof qaCaseStudies)[number] }) {
  return (
    <div className="ppanel ppanel--window qa-modal">
      <div className="ppanel__bar">
        <span className="ppanel__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ppanel__url">
          <span className="ppanel__url-host">QA Case Study</span>
        </span>
      </div>
      <header className="qa-modal__header">
        <div className="qa-modal__heading">
          <span className="qa-modal__category">{study.category}</span>
          <h2 className="qa-modal__title">{study.title}</h2>
          <p className="qa-modal__disclosure">{study.disclosureLabel}</p>
        </div>
        <a className="qa-modal__pdf" href={study.pdfUrl} target="_blank" rel="noreferrer">
          Open PDF
          <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
        </a>
      </header>

      <div className="ppanel__scroll qa-modal__scroll">
        <div className="qa-modal__content">
          <SectionBlock title="Project overview" className="qa-modal__section--full">
            <p>{study.subtitle}</p>
            <p>This case study is a portfolio simulation designed to showcase QA testing thinking and documentation structure.</p>
          </SectionBlock>

          <div className="qa-modal__metrics" aria-label="Test execution metrics">
            <StatCard label="Executed" value={`${study.execution.executed} cases`} />
            <StatCard label="Passed" value={`${study.execution.passed} cases`} />
            <StatCard label="Failed" value={`${study.execution.failed} cases`} />
          </div>

          <SectionBlock title="Testing objective and scope">
            <p>{study.objective}</p>
            <ul>
              {study.scope.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </SectionBlock>

          <SectionBlock title="Test environment and approach">
            <p><strong>Environment:</strong> {study.environment}</p>
            <ul>
              {study.approach.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </SectionBlock>

          <SectionBlock title="Selected test cases" className="qa-modal__section--full">
            <div className="qa-modal__case-list">
              {study.selectedCases.map((item) => (
                <article key={item.id} className="qa-modal__case">
                  <strong>{item.id}: {item.title}</strong>
                  <span className="qa-modal__case-result">Result: {item.result}</span>
                  <span>{item.detail}</span>
                </article>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="Documented defects" className="qa-modal__section--full">
            <div className="qa-modal__bug-list">
              {study.bugs.map((bug) => (
                <details
                  key={bug.id}
                  className="qa-modal__bug"
                  open={bug.id === study.bugs[0].id}
                >
                  <summary className="qa-modal__bug-summary">
                    <span className="qa-modal__bug-title">{bug.id}: {bug.title}</span>
                    <span className="qa-modal__bug-tags">
                      <span>{bug.severity}</span>
                      <span>{bug.priority} priority</span>
                    </span>
                  </summary>
                  <div className="qa-modal__bug-content">
                    <div><strong>Reproduction steps</strong>
                      <ol>
                        {bug.reproductionSteps.map((step) => <li key={step}>{step}</li>)}
                      </ol>
                    </div>
                    <div className="qa-modal__comparison">
                      <p><strong>Expected</strong><span>{bug.expected}</span></p>
                      <p><strong>Actual</strong><span>{bug.actual}</span></p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
            <p className="qa-modal__note">Note: The relationship between the additional bug report and the reported test execution totals has not been specified in the provided simulation data.</p>
          </SectionBlock>

          <SectionBlock title="Release assessment">
            <p>{study.releaseAssessment}</p>
          </SectionBlock>

          <SectionBlock title="Skills demonstrated">
            <div className="qa-modal__skills">
              {study.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </SectionBlock>
        </div>
      </div>
    </div>
  )
}

export const GameQAProjectPanel = () => <CaseStudyPanel study={qaCaseStudies[0]} />
export const WebsiteQAProjectPanel = () => <CaseStudyPanel study={qaCaseStudies[1]} />
export const MobileQAProjectPanel = () => <CaseStudyPanel study={qaCaseStudies[2]} />

