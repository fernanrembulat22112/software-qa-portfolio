import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Medal,
  Stack,
  DeviceMobile,
  GameController,
  Globe,
  ArrowClockwise,
  ClipboardText,
  MagnifyingGlass,
  CheckCircle,
  SealCheck,
} from '@/components/slab'
import { PROFILE_IMAGE_SRC } from '@/data/profile'

/**
 * Home's showcase: one card per rail view, each an index of what that view
 * holds, each built from content the portfolio already ships. Every card is
 * a link. Its content summarizes the existing QA, services, and About views.
 *
 * Motion is transform-only on a clipped inner track, so a card never adds
 * height and Home stays a single viewport.
 */

const QA_PROJECTS = ['Game QA Testing', 'Website QA Testing', 'Mobile App QA Testing']

const OFFERS = [
  { Icon: Globe, title: 'Website QA Testing', note: 'Functionality, forms, and checkout' },
  { Icon: DeviceMobile, title: 'Mobile Application QA Testing', note: 'Feature, UI, and usability checks' },
  { Icon: GameController, title: 'Game QA Testing', note: 'Gameplay, progression, and regression' },
  { Icon: ArrowClockwise, title: 'Regression Testing & Bug Retesting', note: 'Fix verification and impact checks' },
  { Icon: ClipboardText, title: 'Bug Reporting & QA Documentation', note: 'Reproduction steps and clear reports' },
] as const

const PHOTOS = [PROFILE_IMAGE_SRC]
const QA_FOCUS = ['Manual functional testing', 'JIRA defect reporting', 'Regression testing', 'Bug retesting']

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="bento__title">{title}</h3>
      </span>
      <p className="bento__desc">{desc}</p>
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  return (
    <nav className="bento" aria-label="Explore the portfolio">
      {/* QA case study titles, without using unrelated portfolio screenshots. */}
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead Icon={FolderOpen} title="Projects" desc="Explore my manual QA case studies covering game, website, and mobile application testing." />
        <div className="bento__media bento__qa-projects" aria-hidden="true">
          {QA_PROJECTS.map((project, index) => (
            <span className="bento__qa-project" key={project}>
              <span className="bento__qa-project-index">0{index + 1}</span>
              <strong>{project}</strong>
              <ArrowUpRight size={13} weight="bold" />
            </span>
          ))}
        </div>
      </Link>

      {/* About: a fanned stack of photos. */}
      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" desc="Computer Science graduate focused on QA testing for games, web, and mobile apps." />
        <div className="bento__media bento__fan" aria-hidden="true">
          {PHOTOS.map((src) => (
            <span key={src} className="bento__photo" style={{ ['--i' as string]: 1 }}>
              <img src={src} alt="" loading="lazy" decoding="async" />
            </span>
          ))}
        </div>
      </Link>

      {/* QA skills drawn from the existing About and Services content. */}
      <Link to="/services" className="bento__card bento__card--ai">
        <CardHead Icon={CheckCircle} title="Testing Focus" desc="Manual QA practices used across game, website, and mobile testing." />
        <div className="bento__media bento__qa-focus" aria-hidden="true">
          {QA_FOCUS.map((skill) => (
            <span className="bento__chip" key={skill}>{skill}</span>
          ))}
        </div>
      </Link>

      {/* Skills & expertise: the badge that matters, on its plate. */}
      <Link to="/about" className="bento__card bento__card--creds">
        <CardHead Icon={Medal} title="Skills & Expertise" desc="Manual testing, functional validation, smoke testing, sanity checks, regression testing, and defect reporting." />
        <div className="bento__media bento__badge" aria-hidden="true">
          <span className="bento__badge-ring">
            <MagnifyingGlass size={52} weight="duotone" aria-hidden="true" />
          </span>
          <span className="bento__badge-tag">
            <SealCheck size={14} weight="fill" />
            Manual QA
          </span>
        </div>
      </Link>

      {/* Services: the five offers as a compact index. */}
      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="Services" desc="Manual functional testing, regression testing, bug reporting, and test documentation." />
        <ul className="bento__media bento__offers" role="list">
          {OFFERS.map(({ Icon, title, note }, i) => (
            <li key={title} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile">
                <Icon size={15} weight="duotone" aria-hidden="true" />
              </span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{title}</span>
                <span className="bento__offer-note">{note}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </Link>

    </nav>
  )
}
