import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Bug,
  CheckCircle,
  DeviceMobile,
  DownloadSimple,
  FilePdf,
  GameController,
  Globe,
  ImageSquare,
  ListChecks,
  WarningCircle,
  X,
} from '@/components/slab'
import {
  showcaseBugReports,
  showcaseCategories,
  showcaseDocuments,
  showcaseExecution,
  showcaseTestCases,
  type ShowcaseCategory,
} from '@/data/qa-showcase'
import {
  sauceDemoBug,
  sauceDemoDocuments,
  sauceDemoScreenshots,
  sauceDemoScreenshotGroups,
  sauceDemoSummary,
  sauceDemoTestCases,
  sauceDemoTc015Detail,
  type SauceDemoScreenshot,
} from '@/data/saucedemo'

const projectIcons = {
  'Game QA': GameController,
  'Website QA': Globe,
  'Mobile App QA': DeviceMobile,
}

const executionTotals = showcaseExecution.reduce(
  (totals, study) => ({
    executed: totals.executed + study.executed,
    passed: totals.passed + study.passed,
    failed: totals.failed + study.failed,
  }),
  { executed: 0, passed: 0, failed: 0 },
)
const passRate = executionTotals.executed
  ? Math.round((executionTotals.passed / executionTotals.executed) * 100)
  : 0

function isVisible(active: ShowcaseCategory, section: Exclude<ShowcaseCategory, 'all'>) {
  return active === 'all' || active === section
}

function SectionHeading({ id, icon: Icon, eyebrow, title, description }: {
  id: string
  icon: typeof Bug
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="qashowcase__section-heading">
      <span className="qashowcase__section-icon" aria-hidden="true"><Icon size={19} weight="duotone" /></span>
      <div>
        <span className="qashowcase__section-eyebrow">{eyebrow}</span>
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

function SauceDemoOverview() {
  return (
    <section className="qashowcase__sauce-overview" id="saucedemo-details" aria-labelledby="saucedemo-overview">
      <div className="qashowcase__sauce-intro">
        <div>
          <span className="qashowcase__section-eyebrow">{sauceDemoSummary.projectType}</span>
          <h2 id="saucedemo-overview">SauceDemo Manual QA Testing</h2>
          <p>Self-directed manual testing of the public SauceDemo training application. The reported executions and screenshots are practice-project evidence, not client work.</p>
        </div>
        <a href={sauceDemoSummary.application} target="_blank" rel="noreferrer">Open SauceDemo <ArrowUpRight size={14} weight="bold" aria-hidden="true" /></a>
      </div>
      <div className="qashowcase__sauce-facts">
        <div><strong>Environment</strong><span>{sauceDemoSummary.environment}</span></div>
        <div><strong>Method</strong><span>{sauceDemoSummary.method}</span></div>
        <div><strong>Execution timing</strong><span>Not individually confirmed for every case</span></div>
      </div>
      <div className="qashowcase__scope">
        <strong>Test scope</strong>
        <ul>
          <li>Authentication and negative login validation</li>
          <li>Inventory, product details, images, and price sorting</li>
          <li>Cart add/remove state, quantities, and prices</li>
          <li>Checkout validation, order completion, and arithmetic</li>
          <li>Logout, protected-page access, and re-login</li>
        </ul>
      </div>
    </section>
  )
}

function SauceDemoTestCases() {
  return (
    <div className="qashowcase__sauce-tests" aria-label="SauceDemo test execution register">
      {sauceDemoTestCases.map((testCase) => (
        <details className="qashowcase__sauce-test" key={testCase.id} open={testCase.id === 'SD-TC-015'}>
          <summary>
            <span className="qashowcase__sauce-test-id">{testCase.id}</span>
            <span className="qashowcase__sauce-test-copy"><strong>{testCase.scenario}</strong><small>{testCase.area}</small></span>
            <span className={`qashowcase__sauce-result qashowcase__sauce-result--${testCase.result.toLowerCase()}`}>{testCase.result}</span>
          </summary>
          <div className="qashowcase__sauce-test-detail">
            <p><strong>Recorded outcome</strong>{testCase.outcome}</p>
            {testCase.id === 'SD-TC-015' && (
              <>
                <p><strong>Type</strong>{sauceDemoTc015Detail.type}</p>
                <p><strong>Objective</strong>{sauceDemoTc015Detail.objective}</p>
                <p><strong>Preconditions</strong>{sauceDemoTc015Detail.preconditions}</p>
                <div><strong>Recorded steps</strong><ol>{sauceDemoTc015Detail.steps.map((step) => <li key={step}>{step}</li>)}</ol></div>
                <p><strong>Expected</strong>{sauceDemoTc015Detail.expected}</p>
                <p><strong>Actual</strong>{sauceDemoTc015Detail.actual}</p>
              </>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}

function SauceDemoBug({ onOpenImage }: { onOpenImage: (image: SauceDemoScreenshot, trigger: HTMLButtonElement) => void }) {
  const evidence = sauceDemoScreenshots.filter((image) =>
    image.filename === 'SD-TC-006_Product_Inventory.png' || image.filename === 'SD-TC-006_Product_Details.png',
  )
  return (
    <article className="qashowcase__sauce-bug" aria-labelledby="saucedemo-bug-title">
      <div className="qashowcase__sauce-bug-head">
        <div><span>{sauceDemoBug.id} · {sauceDemoBug.linkedTestCase}</span><h3 id="saucedemo-bug-title">{sauceDemoBug.title}</h3></div>
        <span className="qashowcase__triage-status">{sauceDemoBug.status}</span>
      </div>
      <p className="qashowcase__sauce-bug-note">Screenshot-supported product image inconsistency; this is an observed issue pending triage, not a developer-confirmed bug.</p>
      <div className="qashowcase__sauce-bug-meta">
        <span><strong>Project</strong>{sauceDemoBug.project}</span>
        <span><strong>Area</strong>{sauceDemoBug.module}</span>
        <span><strong>Environment</strong>{sauceDemoBug.environment}</span>
        <span><strong>Severity</strong>{sauceDemoBug.severity}</span>
        <span><strong>Priority</strong>{sauceDemoBug.priority}</span>
      </div>
      <div className="qashowcase__sauce-bug-columns">
        <div>
          <h4>Description</h4><p>{sauceDemoBug.description}</p>
          <h4>Steps to reproduce</h4>
          <ol>{sauceDemoBug.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        </div>
        <div className="qashowcase__sauce-results">
          <p><strong>Expected</strong>{sauceDemoBug.expected}</p>
          <p><strong>Observed</strong>{sauceDemoBug.actual}</p>
          <p><strong>QA assessment</strong>{sauceDemoBug.assessment}</p>
        </div>
      </div>
      <div className="qashowcase__bug-evidence">
        <h4>Screenshot evidence</h4>
        <div>
          {evidence.map((image) => (
            <button type="button" key={image.filename} onClick={(event) => onOpenImage(image, event.currentTarget)} aria-label={`Enlarge ${image.label}`}>
              <img src={`/saucedemo/screenshots/${image.filename}`} alt={image.label} loading="lazy" />
              <span>{image.label}</span>
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

function SauceDemoGallery({ onOpenImage }: { onOpenImage: (image: SauceDemoScreenshot, trigger: HTMLButtonElement) => void }) {
  return (
    <div className="qashowcase__sauce-gallery">
      {sauceDemoScreenshotGroups.map(({ module, images }) => (
        <section className="qashowcase__gallery-module" key={module} aria-labelledby={`saucedemo-gallery-${module.toLowerCase()}`}>
          <h3 id={`saucedemo-gallery-${module.toLowerCase()}`}>{module}</h3>
          <div className="qashowcase__gallery-images">
            {images.map((image) => (
              <button type="button" key={image.filename} onClick={(event) => onOpenImage(image, event.currentTarget)} aria-label={`Enlarge ${image.testCaseId}: ${image.label}`}>
                <img src={`/saucedemo/screenshots/${image.filename}`} alt={`${image.testCaseId}: ${image.label}`} loading="lazy" />
                <span><strong>{image.testCaseId}</strong>{image.label}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default function ShowcaseGrid() {
  const [activeCategory, setActiveCategory] = useState<ShowcaseCategory>('all')
  const [previewImage, setPreviewImage] = useState<SauceDemoScreenshot | null>(null)
  const previewDialogRef = useRef<HTMLDialogElement>(null)
  const previewCloseRef = useRef<HTMLButtonElement>(null)
  const previewTriggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const dialog = previewDialogRef.current
    if (!dialog || !previewImage) return
    const previousBodyOverflow = document.body.style.overflow
    const pagePanel = document.getElementById('main-content')
    const previousPanelOverflow = pagePanel?.style.overflow
    document.body.style.overflow = 'hidden'
    if (pagePanel) pagePanel.style.overflow = 'hidden'
    dialog.showModal()
    previewCloseRef.current?.focus()
    return () => {
      if (dialog.open) dialog.close()
      document.body.style.overflow = previousBodyOverflow
      if (pagePanel) pagePanel.style.overflow = previousPanelOverflow ?? ''
    }
  }, [previewImage])

  const openImage = (image: SauceDemoScreenshot, trigger: HTMLButtonElement) => {
    previewTriggerRef.current = trigger
    setPreviewImage(image)
  }

  const closeImage = () => {
    if (previewDialogRef.current?.open) {
      previewDialogRef.current.close()
      return
    }
    setPreviewImage(null)
  }

  const onPreviewClosed = () => {
    setPreviewImage(null)
    requestAnimationFrame(() => previewTriggerRef.current?.focus())
  }

  return (
    <>
    <section className="pgrid qashowcase" aria-labelledby="showcase-title">
      <header className="pgrid__head qashowcase__hero">
        <span className="pgrid__eyebrow">QA Showcase</span>
        <h1 className="pgrid__title" id="showcase-title">Inside My QA Testing Process</h1>
        <p className="pgrid__lede">This showcase brings together my independently executed SauceDemo practice project and three clearly labeled simulated QA case studies. None are paid client engagements.</p>
        <span className="qashowcase__disclosure">Independent practice and simulated portfolio documentation — not client work.</span>
      </header>

      <article className="qashowcase__featured-sauce" aria-labelledby="saucedemo-feature-title">
        <div className="qashowcase__featured-copy">
          <span className="qashowcase__section-eyebrow">{sauceDemoSummary.projectType}</span>
          <h2 id="saucedemo-feature-title">SauceDemo Manual QA Testing</h2>
          <p>Independent manual testing of the SauceDemo training application. Browse the test register, screenshot-supported investigation, and practice-project documentation.</p>
          <a
            href="#saucedemo-details"
            onClick={(event) => {
              if (activeCategory === 'all') return
              event.preventDefault()
              setActiveCategory('all')
              requestAnimationFrame(() => {
                document.getElementById('saucedemo-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              })
            }}
          >
            Explore case study <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
          </a>
        </div>
        <div className="qashowcase__featured-metrics" aria-label="SauceDemo execution summary">
          <div><span>Executed</span><strong>{sauceDemoSummary.executed}</strong></div>
          <div><span>Passed</span><strong>{sauceDemoSummary.passed}</strong></div>
          <div><span>Failed</span><strong>{sauceDemoSummary.failed}</strong></div>
          <div><span>Pass rate</span><strong>{sauceDemoSummary.passRate}%</strong></div>
          <div><span>Execution coverage</span><strong>{sauceDemoSummary.executionCoverage}%</strong></div>
        </div>
      </article>

      <div className="home__glass qashowcase__sheet">
        <div className="qashowcase__filters" role="group" aria-label="Filter QA showcase evidence">
          {showcaseCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              className="qashowcase__filter"
              aria-pressed={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {activeCategory === 'all' && <SauceDemoOverview />}

        {isVisible(activeCategory, 'test-cases') && (
          <section className="qashowcase__section" aria-labelledby="showcase-test-cases-heading">
            <SectionHeading
              id="showcase-test-cases-heading"
              icon={ListChecks}
              eyebrow="Test design"
              title="Test case showcase"
              description="Selected cases from the simulated case studies. Expanded setup details are illustrative examples, not additional source-recorded outcomes."
            />
            <div className="qashowcase__test-grid" id="showcase-test-cases">
              {showcaseTestCases.map(({ study, testCase, bug, testingType, preconditions }) => {
                const ProjectIcon = projectIcons[study.category]
                return (
                  <details className="qashowcase__card qashowcase__test-card" key={testCase.id}>
                    <summary className="qashowcase__summary">
                      <span className="qashowcase__card-top">
                        <span className="qashowcase__project-icon" aria-hidden="true"><ProjectIcon size={20} weight="duotone" /></span>
                        <span className="qashowcase__case-id">{testCase.id}</span>
                      </span>
                      <span className="qashowcase__category">{study.category}</span>
                      <span className="qashowcase__card-title">{testCase.title}</span>
                      <span className="qashowcase__result" data-result={testCase.result.toLowerCase()}>{testCase.result} · documented</span>
                      <span className="qashowcase__expand">View test details <ArrowUpRight size={14} weight="bold" aria-hidden="true" /></span>
                    </summary>
                    <div className="qashowcase__details">
                      <p><strong>Test scenario</strong>{testCase.title}</p>
                      <p><strong>Testing type</strong>{testingType}</p>
                      <p><strong>Environment</strong>{study.environment}</p>
                      <p className="qashowcase__simulated-note">Simulated Example: The following precondition and steps illustrate how this case could be prepared and exercised.</p>
                      <p><strong>Preconditions</strong>{preconditions}</p>
                      <div><strong>Test steps</strong><ol>{bug.reproductionSteps.map((step) => <li key={step}>{step}</li>)}</ol></div>
                      <p><strong>Expected result</strong>{bug.expected}</p>
                      <p><strong>Actual result</strong>{bug.actual}</p>
                      <p><strong>Recorded case note</strong>{testCase.detail}</p>
                    </div>
                  </details>
                )
              })}
            </div>
            <div className="qashowcase__sauce-register">
              <div>
                <h3>SauceDemo execution register</h3>
                <p>All 15 recorded cases and tester-reported outcomes from the independent practice report.</p>
              </div>
              <SauceDemoTestCases />
            </div>
          </section>
        )}

        {isVisible(activeCategory, 'bug-reports') && (
          <section className="qashowcase__section" aria-labelledby="showcase-bugs-heading">
            <SectionHeading
              id="showcase-bugs-heading"
              icon={Bug}
              eyebrow="Defect documentation"
              title="Bug report showcase"
              description="Selected simulated defect reports, adapted from the documented case-study issues. These are portfolio examples, not employer JIRA tickets."
            />
            <div className="qashowcase__bug-grid" id="showcase-bugs">
              {showcaseBugReports.map(({ study, bug }) => {
                const ProjectIcon = projectIcons[study.category]
                return (
                  <details className="qashowcase__card qashowcase__bug-card" key={bug.id}>
                    <summary className="qashowcase__summary">
                      <span className="qashowcase__card-top">
                        <span className="qashowcase__project-icon" aria-hidden="true"><ProjectIcon size={20} weight="duotone" /></span>
                        <span className="qashowcase__case-id">{bug.id}</span>
                      </span>
                      <span className="qashowcase__category">{study.category} · {study.environment}</span>
                      <span className="qashowcase__card-title">{bug.title}</span>
                      <span className="qashowcase__bug-meta">
                        <span data-severity={bug.severity.toLowerCase()}>{bug.severity}</span>
                        <span>{bug.priority} priority</span>
                        <span>Status not documented</span>
                      </span>
                      <span className="qashowcase__expand">View defect details <ArrowUpRight size={14} weight="bold" aria-hidden="true" /></span>
                    </summary>
                    <div className="qashowcase__details">
                      <p><strong>Description</strong>{bug.actual}</p>
                      <div><strong>Steps to reproduce</strong><ol>{bug.reproductionSteps.map((step) => <li key={step}>{step}</li>)}</ol></div>
                      <p><strong>Expected result</strong>{bug.expected}</p>
                      <p><strong>Actual result</strong>{bug.actual}</p>
                      <p><strong>Screenshot evidence</strong>No defect screenshot is available for this simulated report.</p>
                    </div>
                  </details>
                )
              })}
            </div>
            <div className="qashowcase__sauce-bug-wrap">
              <div>
                <h3>SauceDemo defect investigation</h3>
                <p>Independent practice finding. Proposed severity and priority remain unconfirmed pending triage.</p>
              </div>
              <SauceDemoBug onOpenImage={openImage} />
            </div>
          </section>
        )}

        {isVisible(activeCategory, 'test-execution') && (
          <section className="qashowcase__section" aria-labelledby="showcase-execution-heading">
            <SectionHeading
              id="showcase-execution-heading"
              icon={CheckCircle}
              eyebrow="Execution summary"
              title="Test execution dashboard"
              description="Aggregated only from the three existing simulated case studies. These are not professional project metrics."
            />
            <div className="qashowcase__execution" id="showcase-execution">
              <div className="qashowcase__metric-grid">
                <div className="qashowcase__metric"><span>Total executed</span><strong>{executionTotals.executed}</strong><small>across 3 simulated studies</small></div>
                <div className="qashowcase__metric" data-kind="passed"><span>Passed</span><strong>{executionTotals.passed}</strong><small>documented passes</small></div>
                <div className="qashowcase__metric" data-kind="failed"><span>Failed</span><strong>{executionTotals.failed}</strong><small>documented failures</small></div>
                <div className="qashowcase__metric"><span>Pass rate</span><strong>{passRate}%</strong><small>passed / executed</small></div>
              </div>
              <div className="qashowcase__project-execution">
                {showcaseExecution.map((study) => {
                  const percentPassed = study.executed ? (study.passed / study.executed) * 100 : 0
                  const percentFailed = study.executed ? (study.failed / study.executed) * 100 : 0
                  return (
                    <article className="qashowcase__execution-row" key={study.id}>
                      <div className="qashowcase__execution-label"><strong>{study.title}</strong><span>{study.executed} executed · {study.passed} passed · {study.failed} failed</span></div>
                      <div className="qashowcase__bar" role="img" aria-label={`${study.passed} passed and ${study.failed} failed out of ${study.executed} executed`}>
                        <span className="qashowcase__bar-passed" style={{ width: `${percentPassed}%` }} />
                        <span className="qashowcase__bar-failed" style={{ width: `${percentFailed}%` }} />
                      </div>
                    </article>
                  )
                })}
              </div>
              <p className="qashowcase__not-documented"><WarningCircle size={15} weight="duotone" aria-hidden="true" /> Blocked and not-run totals are not documented in these case studies.</p>
            </div>
            <div className="qashowcase__sauce-dashboard">
              <div className="qashowcase__sauce-dashboard-head">
                <div><span className="qashowcase__section-eyebrow">Independent Practice Project</span><h3>SauceDemo execution record</h3></div>
                <p>Separate from the three simulated portfolio case studies above.</p>
              </div>
              <div className="qashowcase__metric-grid">
                <div className="qashowcase__metric"><span>Executed</span><strong>{sauceDemoSummary.executed}</strong><small>of {sauceDemoSummary.planned} planned</small></div>
                <div className="qashowcase__metric" data-kind="passed"><span>Passed</span><strong>{sauceDemoSummary.passed}</strong><small>tester-reported</small></div>
                <div className="qashowcase__metric" data-kind="failed"><span>Failed</span><strong>{sauceDemoSummary.failed}</strong><small>tester-reported</small></div>
                <div className="qashowcase__metric"><span>Reported pass rate</span><strong>{sauceDemoSummary.passRate}%</strong><small>{sauceDemoSummary.executionCoverage}% execution coverage</small></div>
              </div>
              <div className="qashowcase__sauce-progress" role="img" aria-label={`${sauceDemoSummary.passed} passed and ${sauceDemoSummary.failed} failed of ${sauceDemoSummary.executed} executed; ${sauceDemoSummary.executionCoverage}% execution coverage`}>
                <span style={{ width: `${(sauceDemoSummary.passed / sauceDemoSummary.executed) * 100}%` }} />
                <span style={{ width: `${(sauceDemoSummary.failed / sauceDemoSummary.executed) * 100}%` }} />
              </div>
              <p className="qashowcase__sauce-coverage">Execution coverage: {sauceDemoSummary.executed}/{sauceDemoSummary.planned} planned cases ({sauceDemoSummary.executionCoverage}%). Reported pass rate: {sauceDemoSummary.passRate}%.</p>
            </div>
          </section>
        )}

        {isVisible(activeCategory, 'testing-evidence') && (
          <section className="qashowcase__section" aria-labelledby="showcase-evidence-heading">
            <SectionHeading
              id="showcase-evidence-heading"
              icon={ImageSquare}
              eyebrow="Evidence gallery"
              title="Testing evidence"
              description="Only QA evidence assets are shown here; existing portfolio screenshots depict the website template, not the test sessions."
            />
            <SauceDemoGallery onOpenImage={openImage} />
          </section>
        )}

        {(activeCategory === 'all' || activeCategory === 'testing-evidence') && (
          <section className="qashowcase__section" aria-labelledby="showcase-documents-heading">
            <SectionHeading
              id="showcase-documents-heading"
              icon={FilePdf}
              eyebrow="Portfolio files"
              title="Explore My QA Documentation"
              description="Open or download the supporting PDFs for each simulated personal case study."
            />
            <div className="qashowcase__document-grid" id="showcase-documents">
              {showcaseDocuments.map(({ study, title, description }) => (
                <article className="qashowcase__document" key={study.id}>
                  <FilePdf size={24} weight="duotone" aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div>
                    <a href={study.pdfUrl} target="_blank" rel="noreferrer">View PDF <ArrowUpRight size={14} weight="bold" aria-hidden="true" /></a>
                    <a href={study.pdfUrl} download>Download PDF <DownloadSimple size={14} weight="bold" aria-hidden="true" /></a>
                  </div>
                </article>
              ))}
            </div>
            <div className="qashowcase__sauce-documents" aria-labelledby="saucedemo-documents-heading">
              <div>
                <span className="qashowcase__section-eyebrow">Independent Practice Project</span>
                <h3 id="saucedemo-documents-heading">SauceDemo documentation</h3>
              </div>
              <div className="qashowcase__sauce-document-grid">
                {sauceDemoDocuments.map((document) => (
                  <article className="qashowcase__document" key={document.href}>
                    <FilePdf size={24} weight="duotone" aria-hidden="true" />
                    <h4>{document.title}</h4>
                    <p>{document.description}</p>
                    <div className="qashowcase__sauce-document-actions">
                      <a href={document.href} target="_blank" rel="noreferrer">View PDF <ArrowUpRight size={14} weight="bold" aria-hidden="true" /></a>
                      <a href={document.href} download={document.filename}>Download PDF <DownloadSimple size={14} weight="bold" aria-hidden="true" /></a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="qashowcase__cta" aria-labelledby="showcase-cta">
          <div>
            <span className="qashowcase__section-eyebrow">Let’s work together</span>
            <h2 id="showcase-cta">Need a detail-oriented QA Tester?</h2>
            <p>I can help test your website, mobile application, or game, document issues clearly, and verify fixes before release.</p>
          </div>
          <div>
            <Link to="/contact">Contact Me <ArrowUpRight size={15} weight="bold" aria-hidden="true" /></Link>
            <Link to="/projects">View My Projects <ArrowUpRight size={15} weight="bold" aria-hidden="true" /></Link>
          </div>
        </section>
      </div>
    </section>
    {createPortal(
      <dialog
        ref={previewDialogRef}
        className="qashowcase__image-dialog"
        aria-modal="true"
        aria-labelledby="qashowcase-preview-title"
        onClose={onPreviewClosed}
        onCancel={(event) => {
          event.preventDefault()
          closeImage()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeImage()
        }}
      >
        {previewImage && (
          <div className="qashowcase__image-panel">
            <div className="qashowcase__image-dialog-head">
              <p id="qashowcase-preview-title"><strong>{previewImage.testCaseId}</strong>{previewImage.label}</p>
              <button ref={previewCloseRef} type="button" onClick={closeImage} aria-label="Close screenshot preview"><X size={19} weight="bold" aria-hidden="true" /></button>
            </div>
            <img src={`/saucedemo/screenshots/${previewImage.filename}`} alt={`${previewImage.testCaseId}: ${previewImage.label}`} />
          </div>
        )}
      </dialog>,
      document.body,
    )}
    </>
  )
}
