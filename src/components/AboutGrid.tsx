import { Link } from 'react-router-dom'
import { ArrowUpRight, Briefcase, CheckCircle, DownloadSimple, GraduationCap } from '@/components/slab'
import { isValidSocialUrl, profile } from '@/data/profile'
import ProfilePhoto from './ProfilePhoto'

const EXPERIENCE = [
  {
    title: 'Video Game QA Tester',
    summary: 'Current professional experience',
    work: [
      'Perform manual gameplay and functional test execution.',
      'Run smoke, sanity, and regression testing.',
      'Report defects in JIRA, verify fixes, and collaborate with the team.',
    ],
  },
  {
    title: 'Web & Mobile QA Internship',
    summary: 'Previous internship exposure',
    work: [
      'Carry out manual functional testing of websites and mobile applications.',
      'Identify interface and functionality issues during testing.',
      'Document defects with clear observations for review.',
    ],
  },
]

const SKILL_GROUPS = [
  { title: 'Manual QA', items: ['Functional testing', 'Smoke testing', 'Sanity testing', 'Regression testing', 'Exploratory testing', 'UI testing'] },
  { title: 'Defect Management', items: ['JIRA', 'Bug documentation', 'Reproduction steps', 'Severity and priority', 'Defect verification'] },
  { title: 'Software QA Knowledge', items: ['SDLC', 'STLC', 'Test case execution', 'Defect life cycle'] },
  { title: 'Currently Learning', items: ['REST API testing', 'SQL'] },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid qa-about" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          Hi, I’m Fernan — a QA Tester focused on building better digital experiences.
        </h1>
        <p className="pgrid__lede">I’m a BS Computer Science graduate and Video Game QA Tester with hands-on manual testing experience. I bring a careful eye to finding issues, verifying fixes, and helping teams deliver reliable experiences across games, websites, and mobile apps.</p>
      </header>

      <div className="home__glass agrid__glass qa-about__glass">
        <div className="qa-about__hero">
          <div className="qa-about__hero-copy">
            <span className="qa-about__eyebrow">Software Quality Assurance</span>
            <h2 className="qa-about__statement">Thoughtful testing. Clear findings. Better releases.</h2>
            <p>I’m growing my career in Software QA, with a particular interest in web and mobile applications, while continuing to build on my game-testing experience. I also offer freelance manual QA support.</p>
            <div className="qa-about__actions">
              <Link className="qa-about__action qa-about__action--primary" to="/projects">
                View QA Projects <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </Link>
              <Link className="qa-about__action qa-about__action--secondary" to="/contact">
                Contact Me <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </Link>
            </div>
            <ul className="qa-about__socials" aria-label="Social profiles">
              {profile.socials.map((social) => isValidSocialUrl(social.href) && (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <img src={social.iconPath} alt="" loading="lazy" decoding="async" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <figure className="qa-about__photo">
            <ProfilePhoto alt="Fernan Rembulat profile image" width={400} height={400} />
          </figure>
        </div>

        <section className="qa-about__section" aria-labelledby="qa-about-experience">
          <div className="qa-about__section-head">
            <Briefcase size={19} weight="duotone" aria-hidden="true" />
            <h2 id="qa-about-experience">Professional experience</h2>
          </div>
          <div className="qa-about__experience">
            {EXPERIENCE.map((role) => (
              <article className="qa-about__experience-card" key={role.title}>
                <span className="qa-about__card-kicker">{role.summary}</span>
                <h3>{role.title}</h3>
                <ul>
                  {role.work.map((item) => (
                    <li key={item}><CheckCircle size={15} weight="duotone" aria-hidden="true" /><span>{item}</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="qa-about__section" aria-labelledby="qa-about-skills">
          <div className="qa-about__section-head">
            <h2 id="qa-about-skills">Technical skills</h2>
          </div>
          <div className="qa-about__skills">
            {SKILL_GROUPS.map((group) => (
              <section className="qa-about__skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <div className="qa-about__bottom">
          <section className="qa-about__info" aria-labelledby="qa-about-education">
            <GraduationCap size={21} weight="duotone" aria-hidden="true" />
            <div>
              <h2 id="qa-about-education">Education</h2>
              <p>Bachelor of Science in Computer Science</p>
            </div>
          </section>
          <section className="qa-about__info qa-about__resume" aria-labelledby="qa-about-resume">
            <DownloadSimple size={21} weight="duotone" aria-hidden="true" />
            <div>
              <h2 id="qa-about-resume">Resume</h2>
              <p>Download a PDF copy of my resume.</p>
              <a
                className="qa-about__resume-download"
                href="/public/resume/Fernan_Rembulat_Resume.pdf"
                download="Fernan_Rembulat_Resume.pdf"
                aria-describedby="qa-about-resume-note"
              >
                Download Resume
                <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
              </a>
              <span id="qa-about-resume-note">PDF file · Fernan Rembulat</span>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
