import React from 'react'
import {
  Sparkles,
  ArrowRight,
  Code,
  ShieldCheck,
  Zap,
  ExternalLink,
  Swords,
  Layers
} from 'lucide-react'
import GithubIcon from '../components/GithubIcon'
import { soundEngine } from '../audio'

export default function HomePage({
  setActivePage,
  breathing,
  onSlash,
  projects,
  content = {},
  images = {}
}) {
  const handleTestSlash = () => {
    soundEngine.playSlash()
    if (onSlash) {
      onSlash('НИТИРИН СЛЭШ ⚔️')
    }
  }

  const heroBg = images.heroBg || content.heroBg || '/images/hero.jpg'

  // Conditional flags: Check if fields exist and are not empty
  const hasBadge = Boolean(content.badgeText?.trim())
  const hasTag = Boolean(content.tagText?.trim())
  const hasBadgeRow = hasBadge || hasTag

  const hasPreTitle = Boolean(content.preTitle?.trim())
  const hasMainTitle = Boolean(content.mainTitle?.trim())
  const hasDesc = Boolean(content.description?.trim())

  const hasProjectsBtn = Boolean(content.projectsBtnText?.trim())
  const hasContactBtn = Boolean(content.contactBtnText?.trim())
  const hasBladeBtn = Boolean(content.bladeBtnText?.trim())
  const hasBtnRow = hasProjectsBtn || hasContactBtn || hasBladeBtn

  const hasStat1 = Boolean(content.stat1Value?.trim() || content.stat1Title?.trim() || content.stat1Desc?.trim())
  const hasStat2 = Boolean(content.stat2Value?.trim() || content.stat2Title?.trim() || content.stat2Desc?.trim())
  const hasStat3 = Boolean(content.stat3Value?.trim() || content.stat3Title?.trim() || content.stat3Desc?.trim())
  const hasStatsSection = hasStat1 || hasStat2 || hasStat3

  const hasFeaturedHeading = Boolean(content.featuredHeading?.trim())
  const hasFeaturedSub = Boolean(content.featuredSub?.trim())

  return (
    <div className="page-container home-page">
      {/* Hero Banner with Anime Art & Dynamic Copy */}
      <div className="hero-banner-frame">
        <div 
          className="hero-art-bg"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="hero-art-overlay" />

        <div className="hero-content-inner">
          {/* Status Badge Row */}
          {hasBadgeRow && (
            <div className="hashira-badge-row">
              {hasBadge && (
                <span className="hashira-badge">
                  <span className="pulse-dot green" />
                  <span>{content.badgeText}</span>
                </span>
              )}
              {hasTag && (
                <span className="breathing-live-tag">
                  <Sparkles size={14} />
                  <span>{content.tagText}</span>
                </span>
              )}
            </div>
          )}

          {(hasPreTitle || hasMainTitle) && (
            <h1 className="hero-main-title">
              {hasPreTitle && (
                <>
                  <span className="kanji-subtitle-sub">{content.preTitle}</span>
                  <br />
                </>
              )}
              {hasMainTitle && content.mainTitle}
            </h1>
          )}

          {hasDesc && (
            <p className="hero-epic-quote">
              {content.description}
            </p>
          )}

          {/* Action Buttons */}
          {hasBtnRow && (
            <div className="hero-btn-row">
              {hasProjectsBtn && (
                <button
                  onClick={() => {
                    setActivePage('projects')
                    soundEngine.playClick()
                  }}
                  className="btn-demon-katana"
                >
                  <Layers size={18} />
                  <span>{content.projectsBtnText} ({projects.length})</span>
                </button>
              )}

              {hasContactBtn && (
                <button
                  onClick={() => {
                    setActivePage('contact')
                    soundEngine.playClick()
                  }}
                  className="btn-neon-ghost"
                >
                  <span>{content.contactBtnText}</span>
                  <ArrowRight size={16} />
                </button>
              )}

              {hasBladeBtn && (
                <button
                  onClick={handleTestSlash}
                  className="btn-neon-ghost"
                  title="Запустить анимацию удара клинка"
                >
                  <Swords size={17} />
                  <span>{content.bladeBtnText}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Developer Stats Section - Only rendered if at least one stat has text */}
      {hasStatsSection && (
        <section className="slayer-stats-section">
          <div className="stats-neon-grid">
            {hasStat1 && (
              <div className="stat-card glass-panel">
                <div className="stat-header">
                  <div className="stat-icon-wrap red-glow">
                    <Code size={22} />
                  </div>
                  <span className="stat-kanji">01</span>
                </div>
                {content.stat1Value && <div className="stat-number">{content.stat1Value}</div>}
                {content.stat1Title && <div className="stat-label">{content.stat1Title}</div>}
                {content.stat1Desc && <div className="stat-sub">{content.stat1Desc}</div>}
              </div>
            )}

            {hasStat2 && (
              <div className="stat-card glass-panel">
                <div className="stat-header">
                  <div className="stat-icon-wrap cyan-glow">
                    <ShieldCheck size={22} />
                  </div>
                  <span className="stat-kanji">02</span>
                </div>
                {content.stat2Value && <div className="stat-number">{content.stat2Value}</div>}
                {content.stat2Title && <div className="stat-label">{content.stat2Title}</div>}
                {content.stat2Desc && <div className="stat-sub">{content.stat2Desc}</div>}
              </div>
            )}

            {hasStat3 && (
              <div className="stat-card glass-panel">
                <div className="stat-header">
                  <div className="stat-icon-wrap yellow-glow">
                    <Zap size={22} />
                  </div>
                  <span className="stat-kanji">03</span>
                </div>
                {content.stat3Value && <div className="stat-number">{content.stat3Value}</div>}
                {content.stat3Title && <div className="stat-label">{content.stat3Title}</div>}
                {content.stat3Desc && <div className="stat-sub">{content.stat3Desc}</div>}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Featured Projects Showcase */}
      {projects && projects.length > 0 && (
        <section className="home-featured-section">
          {(hasFeaturedHeading || hasFeaturedSub) && (
            <div className="section-title-wrap">
              <div className="section-kanji-tag">ПОРТФОЛИО</div>
              {hasFeaturedHeading && <h2 className="neon-section-heading">{content.featuredHeading}</h2>}
              {hasFeaturedSub && <p className="section-description">{content.featuredSub}</p>}
            </div>
          )}

          <div className="featured-cards-grid">
            {projects.slice(0, 3).map((proj) => (
              <div key={proj.id} className="quest-card glass-panel">
                <div className="quest-top-bar">
                  <span className="quest-rank-pill">{proj.category || 'Web App'}</span>
                  {proj.stats?.status && <span className="quest-kanji-hint">{proj.stats.status}</span>}
                </div>

                <h3 className="quest-title">{proj.title}</h3>
                {proj.description && <p className="quest-desc">{proj.description}</p>}

                {proj.tags && proj.tags.length > 0 && (
                  <div className="quest-tags-wrap">
                    {proj.tags.map((t, idx) => (
                      <span key={idx} className="quest-tag-item">#{t}</span>
                    ))}
                  </div>
                )}

                <div className="quest-actions-row">
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="quest-link-btn primary"
                      onClick={() => soundEngine.playClick()}
                    >
                      <ExternalLink size={15} />
                      <span>Демо</span>
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="quest-link-btn"
                      onClick={() => soundEngine.playClick()}
                    >
                      <GithubIcon size={15} />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="center-more-cta">
            <button
              onClick={() => {
                setActivePage('projects')
                soundEngine.playClick()
              }}
              className="btn-demon-katana outline"
            >
              <span>Все проекты портфолио</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
