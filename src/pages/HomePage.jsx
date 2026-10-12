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
  projects
}) {
  const handleTestSlash = () => {
    soundEngine.playSlash()
    if (onSlash) {
      onSlash('НИТИРИН СЛЭШ ⚔️')
    }
  }

  return (
    <div className="page-container home-page">
      {/* Hero Banner with Anime Art & Modern Copy */}
      <div className="hero-banner-frame">
        <div 
          className="hero-art-bg"
          style={{ backgroundImage: `url(/images/hero.jpg)` }}
        />
        <div className="hero-art-overlay" />

        <div className="hero-content-inner">
          {/* Status Badge Row */}
          <div className="hashira-badge-row">
            <span className="hashira-badge">
              <span className="pulse-dot green" />
              <span>ОТКРЫТ К НОВЫМ ПРОЕКТАМ</span>
            </span>
            <span className="breathing-live-tag">
              <Sparkles size={14} />
              <span>НЕОНОВЫЙ АНИМЕ СТИЛЬ</span>
            </span>
          </div>

          <h1 className="hero-main-title">
            <span className="kanji-subtitle-sub">FRONTEND & FULLSTACK</span>
            <br />
            DOOMHEX
          </h1>

          <p className="hero-epic-quote">
            Создаю современные, быстрые и масштабируемые веб-приложения с продуманным интерфейсом, 
            чистой архитектурой и вниманием к мельчайшим деталям.
          </p>

          {/* Action Buttons */}
          <div className="hero-btn-row">
            <button
              onClick={() => {
                setActivePage('projects')
                soundEngine.playClick()
              }}
              className="btn-demon-katana"
            >
              <Layers size={18} />
              <span>Смотреть проекты ({projects.length})</span>
            </button>

            <button
              onClick={() => {
                setActivePage('contact')
                soundEngine.playClick()
              }}
              className="btn-neon-ghost"
            >
              <span>Связаться со мной</span>
              <ArrowRight size={16} />
            </button>

            {/* Interactive Blade Slash Easter Egg */}
            <button
              onClick={handleTestSlash}
              className="btn-neon-ghost"
              title="Запустить анимацию удара клинка"
            >
              <Swords size={17} />
              <span>Эффект клинка</span>
            </button>
          </div>
        </div>
      </div>

      {/* Developer Stats Section */}
      <section className="slayer-stats-section">
        <div className="stats-neon-grid">
          <div className="stat-card glass-panel">
            <div className="stat-header">
              <div className="stat-icon-wrap red-glow">
                <Code size={22} />
              </div>
              <span className="stat-kanji">4+</span>
            </div>
            <div className="stat-number">4+ Года</div>
            <div className="stat-label">Практического Опыта</div>
            <div className="stat-sub">React, TypeScript, экосистема современных веб-сервисов</div>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-header">
              <div className="stat-icon-wrap cyan-glow">
                <ShieldCheck size={22} />
              </div>
              <span className="stat-kanji">100%</span>
            </div>
            <div className="stat-number">99.9% Uptime</div>
            <div className="stat-label">Чистая Архитектура</div>
            <div className="stat-sub">Отказоустойчивость, чистый код и покрытие тестами</div>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-header">
              <div className="stat-icon-wrap yellow-glow">
                <Zap size={22} />
              </div>
              <span className="stat-kanji">&lt;</span>
            </div>
            <div className="stat-number">&lt; 100ms</div>
            <div className="stat-label">Оптимизация Скорости</div>
            <div className="stat-sub">Мгновенный отклик интерфейса и быстрая загрузка</div>
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="home-featured-section">
        <div className="section-title-wrap">
          <div className="section-kanji-tag">ПОРТФОЛИО</div>
          <h2 className="neon-section-heading">Избранные Проекты</h2>
          <p className="section-description">
            Ключевые веб-приложения и программные решения разработчика DoomHex
          </p>
        </div>

        <div className="featured-cards-grid">
          {projects.slice(0, 3).map((proj) => (
            <div key={proj.id} className="quest-card glass-panel">
              <div className="quest-top-bar">
                <span className="quest-rank-pill">{proj.category || 'Web App'}</span>
                <span className="quest-kanji-hint">{proj.stats?.status || 'Active'}</span>
              </div>

              <h3 className="quest-title">{proj.title}</h3>
              <p className="quest-desc">{proj.description}</p>

              <div className="quest-tags-wrap">
                {proj.tags.map((t, idx) => (
                  <span key={idx} className="quest-tag-item">#{t}</span>
                ))}
              </div>

              <div className="quest-actions-row">
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
    </div>
  )
}
