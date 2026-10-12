import React from 'react'
import {
  ShieldCheck,
  Award,
  Zap,
  Code,
  Layers,
  Cpu,
  Compass,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { soundEngine } from '../audio'

export default function AboutPage({ onSlash, content = {}, images = {} }) {
  const avatarImg = images.avatar || content.avatar || '/images/avatar.jpg'

  const skillsList = [
    { name: 'React 19 & Next.js', level: '98%', rank: 'Продвинутый уровень', desc: 'Хуки, управление состоянием, SSR/SSG, оптимизация', icon: <Code size={18} /> },
    { name: 'TypeScript & JavaScript', level: '95%', rank: 'Строгая типизация', desc: 'Чистый код, интерфейсы, масштабируемые типы данных', icon: <Cpu size={18} /> },
    { name: 'Современный UI/UX & CSS', level: '97%', rank: 'Pixel Perfect', desc: 'Адаптивная верстка, микро-анимации, дизайн-системы', icon: <Layers size={18} /> },
    { name: 'Производительность & Web Vitals', level: '94%', rank: 'Высокая скорость', desc: 'Оптимизация рендеринга, Lazy loading, бандлинг Vite', icon: <Zap size={18} /> },
    { name: 'Node.js, Express & REST APIs', level: '91%', rank: 'Fullstack интеграции', desc: 'Асинхронные сервисы, работа с БД, интеграция API', icon: <Compass size={18} /> },
    { name: 'Git, GitHub & Vercel CI/CD', level: '99%', rank: 'Автоматизация', desc: 'Контроль версий, командная работа, непрерывный деплой', icon: <Award size={18} /> }
  ]

  const handleSoundTest = () => {
    soundEngine.playSlash()
    if (onSlash) {
      onSlash('DOOMHEX DEV PROFILE ⚡')
    }
  }

  const hasBadge1 = Boolean(content.badge1?.trim())
  const hasBadge2 = Boolean(content.badge2?.trim())
  const hasBadgeRow = hasBadge1 || hasBadge2

  const hasName = Boolean(content.name?.trim())
  const hasBio = Boolean(content.bio?.trim())

  const hasSpec1 = Boolean(content.spec1Label?.trim() || content.spec1Val?.trim())
  const hasSpec2 = Boolean(content.spec2Label?.trim() || content.spec2Val?.trim())
  const hasSpec3 = Boolean(content.spec3Label?.trim() || content.spec3Val?.trim())
  const hasSpec4 = Boolean(content.spec4Label?.trim() || content.spec4Val?.trim())
  const hasSpecsGrid = hasSpec1 || hasSpec2 || hasSpec3 || hasSpec4

  const hasSkillsHeading = Boolean(content.skillsHeading?.trim())
  const hasSkillsSub = Boolean(content.skillsSub?.trim())

  const hasPrinciples = Boolean(content.principlesHeading?.trim() || content.principlesText?.trim())

  return (
    <div className="page-container about-page">
      {/* Profile Header Card */}
      <div className="about-hero-card glass-panel">
        <div className="about-avatar-col">
          <div className="avatar-frame-glow">
            <img
              src={avatarImg}
              alt="DoomHex Avatar"
              className="doomhex-avatar-img"
            />
            <div className="avatar-kanji-badge">DEV</div>
          </div>
          <button onClick={handleSoundTest} className="blade-inspect-btn">
            <Sparkles size={15} />
            <span>Интерактивный тест</span>
          </button>
        </div>

        <div className="about-bio-col">
          {hasBadgeRow && (
            <div className="badge-row">
              {hasBadge1 && <span className="slayer-corp-tag">{content.badge1}</span>}
              {hasBadge2 && <span className="hashira-title-tag">{content.badge2}</span>}
            </div>
          )}

          {hasName && (
            <h1 className="about-name">
              {content.name}
            </h1>
          )}

          {hasBio && (
            <p className="about-lead">
              {content.bio}
            </p>
          )}

          {hasSpecsGrid && (
            <div className="slayer-specs-grid">
              {hasSpec1 && (
                <div className="spec-item">
                  {content.spec1Label && <span className="spec-label">{content.spec1Label}</span>}
                  {content.spec1Val && <span className="spec-val">{content.spec1Val}</span>}
                </div>
              )}
              {hasSpec2 && (
                <div className="spec-item">
                  {content.spec2Label && <span className="spec-label">{content.spec2Label}</span>}
                  {content.spec2Val && <span className="spec-val">{content.spec2Val}</span>}
                </div>
              )}
              {hasSpec3 && (
                <div className="spec-item">
                  {content.spec3Label && <span className="spec-label">{content.spec3Label}</span>}
                  {content.spec3Val && <span className="spec-val">{content.spec3Val}</span>}
                </div>
              )}
              {hasSpec4 && (
                <div className="spec-item">
                  {content.spec4Label && <span className="spec-label">{content.spec4Label}</span>}
                  {content.spec4Val && <span className="spec-val">{content.spec4Val}</span>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Skills Matrix */}
      <section className="about-skills-section">
        {(hasSkillsHeading || hasSkillsSub) && (
          <div className="section-title-wrap">
            <div className="section-kanji-tag">СТЕК И НАВЫКИ</div>
            {hasSkillsHeading && <h2 className="neon-section-heading">{content.skillsHeading}</h2>}
            {hasSkillsSub && <p className="section-description">{content.skillsSub}</p>}
          </div>
        )}

        <div className="skills-meter-grid">
          {skillsList.map((skill, index) => (
            <div key={index} className="skill-meter-card glass-panel">
              <div className="skill-meter-header">
                <div className="skill-icon-name">
                  <div className="skill-icon-round">{skill.icon}</div>
                  <div>
                    <span className="skill-title">{skill.name}</span>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{skill.desc}</div>
                  </div>
                </div>
                <span className="skill-pct-badge">{skill.level}</span>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill-neon"
                  style={{ width: skill.level }}
                />
              </div>

              <div className="skill-footer-sub">
                <span className="skill-rank-title">{skill.rank}</span>
                <span className="skill-verified">
                  <CheckCircle2 size={13} />
                  <span>Проверено на проектах</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Principles Card - Completely hidden if heading and text are deleted */}
      {hasPrinciples && (
        <section className="hashira-oath-card glass-panel">
          <div className="oath-left">
            <ShieldCheck size={48} style={{ color: 'var(--neon-primary)' }} />
          </div>
          <div className="oath-right">
            {content.principlesHeading && <h3 className="oath-heading">{content.principlesHeading}</h3>}
            {content.principlesText && <p className="oath-text">{content.principlesText}</p>}
          </div>
        </section>
      )}
    </div>
  )
}
