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

export default function AboutPage({ onSlash }) {
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

  return (
    <div className="page-container about-page">
      {/* Profile Header Card */}
      <div className="about-hero-card glass-panel">
        <div className="about-avatar-col">
          <div className="avatar-frame-glow">
            <img
              src="/images/avatar.jpg"
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
          <div className="badge-row">
            <span className="slayer-corp-tag">FULLSTACK DEVELOPER</span>
            <span className="hashira-title-tag">REACT & TYPESCRIPT</span>
          </div>

          <h1 className="about-name">
            DoomHex
          </h1>

          <p className="about-lead">
            Привет! Я разработчик интерфейсов и веб-приложений. Создаю быстрые, отзывчивые 
            и визуально выразительные цифровые продукты с акцентом на надежность, чистую компонентную архитектуру и отличный пользовательский опыт.
          </p>

          <div className="slayer-specs-grid">
            <div className="spec-item">
              <span className="spec-label">Специализация:</span>
              <span className="spec-val">Frontend & Fullstack Web Development</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Основной стек:</span>
              <span className="spec-val">React 19, TypeScript, Vite, Node.js</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Подход:</span>
              <span className="spec-val">Clean Architecture, Component-Driven</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Деплой & Хостинг:</span>
              <span className="spec-val">GitHub, Vercel, Cloud Services</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Matrix */}
      <section className="about-skills-section">
        <div className="section-title-wrap">
          <div className="section-kanji-tag">СТЕК И НАВЫКИ</div>
          <h2 className="neon-section-heading">Технологии & Компетенции</h2>
          <p className="section-description">
            Инструменты и технологии, которые я использую для реализации клиентских и серверных задач
          </p>
        </div>

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

      {/* Principles Card */}
      <section className="hashira-oath-card glass-panel">
        <div className="oath-left">
          <ShieldCheck size={48} style={{ color: 'var(--neon-primary)' }} />
        </div>
        <div className="oath-right">
          <h3 className="oath-heading">Принципы разработки DoomHex</h3>
          <p className="oath-text">
            Писать поддерживаемый и понятный код, тестировать интерфейсы на реальных устройствах, 
            не допускать замедления страниц и всегда доводить проект до идеального состояния перед релизом.
          </p>
        </div>
      </section>
    </div>
  )
}
