import { useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X, CursorClick, GameController, Monitor, DeviceMobile } from '@/components/slab'
import { GameQAProjectPanel, WebsiteQAProjectPanel, MobileQAProjectPanel } from './ProjectPanels'
import { qaCaseStudies } from '@/data/projects'
import { useIsPhone } from '@/hooks/useMediaQuery'

/**
 * QA project cards open their full case study in a near-fullscreen dialog.
 *
 * The dialog is a portal at z 8000, under the funnel preview (9000) so the
 * barrel's own "open this page" dialog can still stack on top of it.
 */
type Project = {
  id: string
  index: string
  title: string
  desc: string
  Icon: ComponentType<{ size?: number }>
  eyebrow: string
  Section: ComponentType
  span?: 2
  /** Small orange category label above the title. */
  kicker?: string
  study: (typeof qaCaseStudies)[number]
  /** Phone filter bucket. */
  cat: Cat
}

type Cat = 'work' | 'sites' | 'apps' | 'ai'
const FILTERS: { key: Cat | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'work', label: 'Work' },
  { key: 'sites', label: 'Sites' },
  { key: 'apps', label: 'Apps' },
  { key: 'ai', label: 'AI' },
]

const BUILDS: Project[] = [
  {
    id: 'game-qa',
    cat: 'work',
    index: '01',
    kicker: 'Game QA',
    title: 'Game QA Testing',
    desc: 'Manual black-box validation for gameplay flow, persistence, UI stability, and regression risk.',
    Icon: () => <GameController size={20} weight="duotone" />,
    eyebrow: 'Case study',
    study: qaCaseStudies[0],
    Section: GameQAProjectPanel,
  },
  {
    id: 'website-qa',
    cat: 'sites',
    index: '02',
    kicker: 'Website QA',
    title: 'Website QA Testing',
    desc: 'Checkout validation, negative testing, and UI/usability checks for a sample e-commerce experience.',
    Icon: () => <Monitor size={20} weight="duotone" />,
    eyebrow: 'Case study',
    study: qaCaseStudies[1],
    Section: WebsiteQAProjectPanel,
  },
  {
    id: 'mobile-app-qa',
    cat: 'apps',
    index: '03',
    kicker: 'Mobile App QA',
    title: 'Mobile App QA Testing',
    desc: 'Compatibility and functional checks for a sample mobile shopping app across Android 14 conditions.',
    Icon: () => <DeviceMobile size={20} weight="duotone" />,
    eyebrow: 'Case study',
    study: qaCaseStudies[2],
    Section: MobileQAProjectPanel,
  },
]

/* ---------- Dialog ----------
   A backdrop, a close button in the corner, and the work. No panel, no
   header: each Section brings its own window (or, for the strip, none). */
function ProjectModal({ project, onClose, children }: { project: Project; onClose: () => void; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const pagePanel = document.querySelector<HTMLElement>('.shell__panel')
    const previousPanelOverflow = pagePanel?.style.overflow
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const dialog = closeRef.current?.closest<HTMLElement>('[role="dialog"]')
      if (!dialog) return
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
      )).filter((element) => element.getClientRects().length > 0)
      if (focusable.length === 0) {
        e.preventDefault()
        closeRef.current?.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    if (pagePanel) pagePanel.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      if (pagePanel) pagePanel.style.overflow = previousPanelOverflow ?? ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="pmodal pmodal--qa"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button ref={closeRef} type="button" className="pmodal__close" onClick={onClose} aria-label="Close dialog">
        <X size={18} weight="bold" />
      </button>
      <div className="pmodal__stage" tabIndex={-1}>{children}</div>
    </div>,
    document.body,
  )
}

/* ---------- The page ---------- */

export default function ProjectsGrid() {
  const [open, setOpen] = useState<Project | null>(null)
  const phone = useIsPhone()
  const [cat, setCat] = useState<Cat | 'all'>('all')
  const keep = (p: Project) => !phone || cat === 'all' || p.cat === cat
  const builds = BUILDS.filter(keep)
  const triggerRef = useRef<HTMLElement | null>(null)

  const show = useCallback((p: Project, el: HTMLElement) => {
    triggerRef.current = el
    setOpen(p)
  }, [])
  const close = useCallback(() => {
    setOpen(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const qaGrid = builds.length > 0 ? (
    <div className="qa-project-grid">
      {builds.map((b) => (
        <button
          key={b.id}
          type="button"
          className="qa-project-card"
          onClick={(e) => show(b, e.currentTarget)}
          aria-haspopup="dialog"
        >
          <span className="qa-project-card__icon" aria-hidden="true">
            <b.Icon size={24} />
          </span>
          <span className="qa-project-card__body">
            <span className="qa-project-card__kicker">
              {b.kicker}
            </span>
            <span className="qa-project-card__title">{b.title}</span>
            <span className="qa-project-card__description">{b.desc}</span>
            <span className="qa-project-card__detail">
              <strong>Environment</strong>
              <span>{b.study.environment}</span>
            </span>
            <span className="qa-project-card__detail">
              <strong>Testing approach</strong>
              <span>{b.study.approach.join(' · ')}</span>
            </span>
            <span className="qa-project-card__disclosure">{b.study.disclosureLabel}</span>
            <span className="qa-project-card__action">
              View Case Study
              <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
            </span>
          </span>
        </button>
      ))}
    </div>
  ) : null

  return (
    <section className="pgrid qa-projects" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Projects</span>
        <h1 className="pgrid__title" id="projects-title">
          QA portfolio project case studies
        </h1>
        <p className="pgrid__lede">Simulated personal QA portfolio projects for game, website, and mobile app testing. Open a card to view the full case study.</p>
      </header>

      {phone && (
        <div className="pfilter" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className="pfilter__btn"
              aria-pressed={cat === f.key}
              onClick={() => setCat(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="home__glass pgrid__glass qa-projects__panel">
        <span className="pgrid__hint" aria-hidden="true">
          <CursorClick size={14} weight="duotone" />
          Click a card to open it
        </span>
        <div className="qa-projects__content">
          {qaGrid}
        </div>
      </div>

      {open && (
        <ProjectModal project={open} onClose={close}>
          <open.Section />
        </ProjectModal>
      )}
    </section>
  )
}
