import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import {
  Code,
  Sparkles,
  Layers,
  Terminal,
  ExternalLink,
  Mail,
  Copy,
  Check,
  Send,
  Globe,
  Cpu,
  ArrowRight,
  Star
} from 'lucide-react'
import './App.css'

const GithubIcon = ({ size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

export default function App() {
  const [copied, setCopied] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formSent, setFormSent] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#38bdf8', '#a855f7', '#10b981', '#f59e0b']
    })
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@imax.dev')
    setCopied(true)
    setShowToast(true)
    setTimeout(() => {
      setCopied(false)
      setShowToast(false)
    }, 2800)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!formData.email || !formData.message) return
    setFormSent(true)
    handleConfetti()
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setFormSent(false)
    }, 4000)
  }

  const skillsData = [
    {
      category: 'frontend',
      title: 'Frontend разработка',
      icon: <Code size={24} />,
      desc: 'Создание современных, быстрых и адаптивных веб-интерфейсов на React, TypeScript и Next.js с вниманием к мельчайшим деталям.',
      tags: ['React', 'JavaScript (ES6+)', 'TypeScript', 'Vite', 'HTML5 & CSS3', 'Tailwind / Vanilla CSS']
    },
    {
      category: 'ui',
      title: 'UI/UX & Анимации',
      icon: <Layers size={24} />,
      desc: 'Проектирование стильных дизайн-систем, микровзаимодействий, адаптивности под мобильные экраны и темного режима.',
      tags: ['Figma', 'Glassmorphism', 'Micro-interactions', 'Responsive Design', 'A11y', 'Framer Motion']
    },
    {
      category: 'tools',
      title: 'Инфраструктура & Деплой',
      icon: <Cpu size={24} />,
      desc: 'Автоматизация сборки, контроль версий через Git/GitHub, непрерывная интеграция и мгновенный деплой в Vercel и Cloud.',
      tags: ['Git & GitHub', 'Vercel CI/CD', 'Node.js & npm', 'REST APIs', 'Performance Optimization', 'SEO']
    }
  ]

  const projectsData = [
    {
      id: 1,
      type: 'Веб-приложение',
      title: 'NextGen Analytics Dashboard',
      desc: 'Интерактивная панель мониторинга метрик с живыми графиками, фильтрацией в реальном времени и темной темой.',
      tech: ['React', 'Chart.js', 'Vite', 'CSS Grid'],
      liveUrl: 'https://vercel.com',
      githubUrl: 'https://github.com'
    },
    {
      id: 2,
      type: 'E-Commerce',
      title: 'Aura Minimalist Store',
      desc: 'Минималистичный интернет-магазин с корзиной, плавными микро-анимациями перехода и мгновенной загрузкой.',
      tech: ['React', 'Context API', 'CSS Modules'],
      liveUrl: 'https://vercel.com',
      githubUrl: 'https://github.com'
    },
    {
      id: 3,
      type: 'Портфолио & UI',
      title: 'Creative Portfolio Platform',
      desc: 'Современный представительский сайт-визитка с поддержкой развертывания через GitHub на Vercel в один клик.',
      tech: ['React 19', 'Vite', 'Design System'],
      liveUrl: 'https://vercel.com',
      githubUrl: 'https://github.com'
    }
  ]

  const filteredSkills = activeFilter === 'all' 
    ? skillsData 
    : skillsData.filter(s => s.category === activeFilter)

  return (
    <div className="app-container">
      {/* Toast Notice */}
      {showToast && (
        <div className="toast-notice">
          <Check size={18} />
          <span>Email успешно скопирован в буфер!</span>
        </div>
      )}

      {/* Navbar */}
      <nav className="navbar">
        <a href="#home" className="nav-brand">
          <div className="brand-symbol">⚡</div>
          <span>iMax Portfolio</span>
        </a>

        <ul className="nav-links">
          <li><a href="#home" className="nav-link">Главная</a></li>
          <li><a href="#skills" className="nav-link">Навыки</a></li>
          <li><a href="#projects" className="nav-link">Проекты</a></li>
          <li><a href="#contact" className="nav-link">Контакты</a></li>
        </ul>

        <div className="nav-actions">
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={handleConfetti}
            title="Запустить конфетти"
          >
            <Sparkles size={16} />
            <span>Привет!</span>
          </button>
          <a href="#contact" className="btn-primary">
            <span>Связаться</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero-section">
        <div className="hero-pill">
          <div className="status-badge">
            <span className="pulse-dot"></span>
            <span>Готов к новым проектам и сотрудничеству</span>
          </div>
        </div>

        <h1 className="hero-title">
          Создаю современные <br />
          <span className="gradient-text">быстрые & эстетичные</span> веб-сайты
        </h1>

        <p className="hero-description">
          Привет! Это стартовый мини-сайт на React + Vite, полностью настроенный для моментального развертывания через GitHub на Vercel. 
          Продуманный стек, стильный темный интерфейс и плавная анимация.
        </p>

        <div className="hero-cta-group">
          <a href="#projects" className="btn-primary">
            <Globe size={18} />
            <span>Посмотреть проекты</span>
          </a>
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={handleCopyEmail}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span>{copied ? 'Скопировано!' : 'Скопировать Email'}</span>
          </button>
        </div>

        {/* Metric Cards */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">100%</div>
            <div className="metric-label">Чистый и отзывчивый код</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">&lt; 1с</div>
            <div className="metric-label">Скорость загрузки Vite</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">Vercel</div>
            <div className="metric-label">Авто-деплой из GitHub</div>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="section-header">
          <span className="section-label">Стек технологий</span>
          <h2 className="section-title">Что я использую в работе</h2>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Все направления' },
            { id: 'frontend', label: 'Frontend' },
            { id: 'ui', label: 'UI/UX' },
            { id: 'tools', label: 'Инструменты' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '0.88rem',
                fontWeight: 600,
                border: activeFilter === f.id ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.08)',
                background: activeFilter === f.id ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)',
                color: activeFilter === f.id ? '#fff' : '#94a3b8',
                transition: 'all 0.2s'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="glass-panel skill-card">
              <div className="skill-icon-wrapper">
                {skill.icon}
              </div>
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
              <div className="skill-tags">
                {skill.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tag-item">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="section-header">
          <span className="section-label">Избранные кейсы</span>
          <h2 className="section-title">Примеры проектов</h2>
        </div>

        <div className="projects-grid">
          {projectsData.map(proj => (
            <div key={proj.id} className="glass-panel project-card">
              <div>
                <div className="project-header">
                  <span className="project-type">{proj.type}</span>
                  <div className="project-links">
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="icon-btn" title="GitHub Code">
                      <GithubIcon size={16} />
                    </a>
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="icon-btn" title="Live Preview">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">{proj.desc}</p>
              </div>

              <div className="project-tech">
                {proj.tech.map((t, idx) => (
                  <span key={idx} className="code-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Contact / Say Hi Section */}
      <section id="contact" className="contact-section">
        <div className="glass-panel contact-card">
          <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', marginBottom: '16px', color: '#818cf8' }}>
            <Mail size={32} />
          </div>
          <h2 className="contact-title">Давайте создадим что-то крутое</h2>
          <p className="contact-subtitle">
            Есть идея для проекта или хотите обсудить сотрудничество? Напишите сообщение прямо сейчас!
          </p>

          {formSent ? (
            <div style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '14px', maxWidth: '480px', margin: '0 auto', color: '#34d399' }}>
              <Check size={32} style={{ margin: '0 auto 10px auto' }} />
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Спасибо за сообщение!</div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '6px' }}>Я свяжусь с вами в ближайшее время.</div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
              <input
                type="email"
                required
                placeholder="Ваш Email (например: user@example.com)"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
              <textarea
                required
                rows={3}
                placeholder="Кратко о вашем проекте или задаче..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                style={{
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'none'
                }}
              />
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '14px' }}>
                <Send size={18} />
                <span>Отправить заявку</span>
              </button>
            </form>
          )}

          <div style={{ marginTop: '36px', display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={handleCopyEmail} className="btn-secondary" style={{ fontSize: '0.88rem' }}>
              <Mail size={16} />
              <span>contact@imax.dev</span>
            </button>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-secondary" style={{ fontSize: '0.88rem' }}>
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>
          © {new Date().getFullYear()} iMax. Все права защищены. Разработано на React & Vite.
        </div>
        <div className="footer-vercel-badge">
          <span className="pulse-dot"></span>
          <span>Ready for Vercel Deployment</span>
        </div>
      </footer>
    </div>
  )
}
