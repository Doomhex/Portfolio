import React from 'react'
import {
  Swords,
  Sparkles,
  ArrowRight,
  Flame,
  Shield,
  Zap,
  Terminal,
  ExternalLink
} from 'lucide-react'
import GithubIcon from '../components/GithubIcon'
import { soundEngine } from '../audio'

export default function HomePage({
  setActivePage,
  breathing,
  onSlash,
  projects
}) {
  const handleUnsheatheKatana = () => {
    soundEngine.playSlash()
    if (onSlash) {
      onSlash('НИТИРИН ОБНАЖЕН! 全集中!')
    }
  }

  const getBreathingTitle = () => {
    switch (breathing) {
      case 'water': return 'Дыхание Воды (水の呼吸)'
      case 'thunder': return 'Дыхание Грома (雷の呼吸)'
      case 'moon': return 'Дыхание Луны (月の呼吸)'
      case 'sun':
      default: return 'Дыхание Солнца (日の呼吸)'
    }
  }

  return (
    <div className="page-container home-page">
      {/* Hero Banner with Anime Art */}
      <div className="hero-banner-frame">
        <div 
          className="hero-art-bg"
          style={{ backgroundImage: `url(/images/hero.jpg)` }}
        />
        <div className="hero-art-overlay" />

        <div className="hero-content-inner">
          {/* Breathing Rank Tag */}
          <div className="hashira-badge-row">
            <span className="hashira-badge">
              <span className="flame-icon">🔥</span>
              <span>РАНГ: СТОЛП КОДА (HASHIRA)</span>
            </span>
            <span className="breathing-live-tag">
              <span className="pulse-dot" />
              <span>{getBreathingTitle()}</span>
            </span>
          </div>

          <h1 className="hero-main-title">
            <span className="kanji-subtitle-sub">全集中・電脳の呼吸</span>
            <br />
            DOOMHEX
          </h1>

          <p className="hero-epic-quote">
            «Даже если твой дух на пределе — бей сильнее. 
            Создаю бескомпромиссные цифровые веб-приложения, отточенные словно клинок Нитирин».
          </p>

          {/* Interactive Hero Actions */}
          <div className="hero-btn-row">
            <button
              onClick={handleUnsheatheKatana}
              className="btn-demon-katana"
            >
              <Swords size={20} />
              <span>Обнажить Клинок</span>
              <span className="kanji-btn-mark">斬</span>
            </button>

            <button
              onClick={() => {
                setActivePage('projects')
                soundEngine.playClick()
              }}
              className="btn-neon-ghost"
            >
              <Sparkles size={18} />
              <span>Смотреть Квесты ({projects.length})</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Slayer Combat Stats */}
      <section className="slayer-stats-section">
        <div className="stats-neon-grid">
          <div className="stat-card glass-panel">
            <div className="stat-header">
              <div className="stat-icon-wrap red-glow">
                <Flame size={22} />
              </div>
              <span className="stat-kanji">滅</span>
            </div>
            <div className="stat-number">2,400+</div>
            <div className="stat-label">Поверженных Багов (Demons Slain)</div>
            <div className="stat-sub">100% покрытие тестами и чистый код</div>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-header">
              <div className="stat-icon-wrap cyan-glow">
                <Shield size={22} />
              </div>
              <span className="stat-kanji">守</span>
            </div>
            <div className="stat-number">99.99%</div>
            <div className="stat-label">Безупречная Защита Uptime</div>
            <div className="stat-sub">Отказоустойчивые веб-системы</div>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-header">
              <div className="stat-icon-wrap yellow-glow">
                <Zap size={22} />
              </div>
              <span className="stat-kanji">迅</span>
            </div>
            <div className="stat-number">&lt; 150ms</div>
            <div className="stat-label">Скорость Атаки (TTFB)</div>
            <div className="stat-sub">Молниеносный рендеринг Vite & React</div>
          </div>
        </div>
      </section>

      {/* Featured Quests Showcase */}
      <section className="home-featured-section">
        <div className="section-title-wrap">
          <div className="section-kanji-tag">任務</div>
          <h2 className="neon-section-heading">Избранные Миссии Столпа</h2>
          <p className="section-description">
            Ключевые цифровые миссии и архитектурные решения DoomHex
          </p>
        </div>

        <div className="featured-cards-grid">
          {projects.slice(0, 3).map((proj) => (
            <div key={proj.id} className="quest-card glass-panel">
              <div className="quest-top-bar">
                <span className="quest-rank-pill">{proj.rank}</span>
                <span className="quest-kanji-hint">{proj.japaneseTitle}</span>
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
                  <span>Открыть</span>
                </a>
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="quest-link-btn"
                  onClick={() => soundEngine.playClick()}
                >
                  <GithubIcon size={15} />
                  <span>Репозиторий</span>
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
            <span>Все миссии и проекты</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  )
}
