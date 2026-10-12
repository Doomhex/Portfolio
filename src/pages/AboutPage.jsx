import React from 'react'
import {
  Shield,
  Award,
  Zap,
  Code,
  Flame,
  Droplets,
  Layers,
  Cpu,
  Compass,
  CheckCircle2
} from 'lucide-react'
import { soundEngine } from '../audio'

export default function AboutPage({ onSlash }) {
  const skillsList = [
    { name: 'React 19 & Next.js Ecosystem', level: '98%', rank: 'Мастер формы', icon: <Code size={18} /> },
    { name: 'TypeScript & Чистая Архитектура', level: '95%', rank: 'Абсолютный контроль', icon: <Cpu size={18} /> },
    { name: 'Неоновый UI/UX & Микро-анимации', level: '97%', rank: 'Визуальный транс', icon: <Layers size={18} /> },
    { name: 'State Management & Performance', level: '94%', rank: 'Мгновенный отклик', icon: <Zap size={18} /> },
    { name: 'Node.js, Express & REST APIs', level: '91%', rank: 'Глубинная связь', icon: <Compass size={18} /> },
    { name: 'CI/CD & Деплой (Vercel, Git)', level: '99%', rank: 'Непрерывный поток', icon: <Award size={18} /> }
  ]

  const handleInspectBlade = () => {
    soundEngine.playSlash()
    if (onSlash) {
      onSlash('НИТИРИН DOOMHEX: СТАЛЬ ТАМАХАГАНЭ')
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
              alt="DoomHex Slayer Avatar"
              className="doomhex-avatar-img"
            />
            <div className="avatar-kanji-badge">柱</div>
          </div>
          <button onClick={handleInspectBlade} className="blade-inspect-btn">
            <span>Осмотреть Клинок</span>
            <span className="spark-dot" />
          </button>
        </div>

        <div className="about-bio-col">
          <div className="rank-watermark">鬼殺隊</div>
          <div className="badge-row">
            <span className="slayer-corp-tag">КОРПУС ИСТРЕБИТЕЛЕЙ (DEMON SLAYER CORPS)</span>
            <span className="hashira-title-tag">СТОЛП ЦИФРОВОГО ДЫХАНИЯ</span>
          </div>

          <h1 className="about-name">
            DoomHex <span className="japanese-kanji-name">・ドゥームヘックス</span>
          </h1>

          <p className="about-lead">
            Веб-разработчик и создатель цифровых миров, вдохновленных эстетикой клинков и кибернетического неона. 
            Каждая строчка кода выверяется с той же точностью, с которой куется легендарная катана Нитирин в деревне кузнецов.
          </p>

          <div className="slayer-specs-grid">
            <div className="spec-item">
              <span className="spec-label">Клинок Нитирин:</span>
              <span className="spec-val">Пурпурно-черный (Электричество & Огонь)</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Основной стиль:</span>
              <span className="spec-val">Дыхание Чистой Архитектуры</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Стаж в Корпусе:</span>
              <span className="spec-val">Более 4 лет упорных тренировок</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Кредо:</span>
              <span className="spec-val">«Ни единой ошибки в продакшене»</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills & Mastery Matrix */}
      <section className="about-skills-section">
        <div className="section-title-wrap">
          <div className="section-kanji-tag">技量</div>
          <h2 className="neon-section-heading">Мастерство Техник & Стек</h2>
          <p className="section-description">
            Уровень владения языками программирования, фреймворками и инструментами разработки
          </p>
        </div>

        <div className="skills-meter-grid">
          {skillsList.map((skill, index) => (
            <div key={index} className="skill-meter-card glass-panel">
              <div className="skill-meter-header">
                <div className="skill-icon-name">
                  <div className="skill-icon-round">{skill.icon}</div>
                  <span className="skill-title">{skill.name}</span>
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
                  <span>Проверено в боях</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hashira Oath / Rules */}
      <section className="hashira-oath-card glass-panel">
        <div className="oath-left">
          <div className="oath-kanji-large">不撓不屈</div>
        </div>
        <div className="oath-right">
          <h3 className="oath-heading">Клятва Столпа DoomHex</h3>
          <p className="oath-text">
            «Никогда не сдаваться перед трудностями архитектуры. Защищать пользователей от медленных загрузок, 
            нестабильных скриптов и визуального хаоса. Стремиться к абсолютной красоте интерфейса».
          </p>
        </div>
      </section>
    </div>
  )
}
