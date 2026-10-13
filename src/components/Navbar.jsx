import React from 'react'
import confetti from 'canvas-confetti'
import {
  Flame,
  Droplets,
  Zap,
  Moon,
  Layers,
  User,
  Home,
  Send,
  Sparkles,
  Menu,
  X
} from 'lucide-react'

export default function Navbar({
  activePage,
  setActivePage,
  breathing,
  setBreathing,
  onSlash,
  avatar
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const breathingModes = [
    { id: 'sun', label: 'Солнце', icon: <Flame size={14} />, color: '#ef4444' },
    { id: 'water', label: 'Вода', icon: <Droplets size={14} />, color: '#38bdf8' },
    { id: 'thunder', label: 'Гром', icon: <Zap size={14} />, color: '#facc15' },
    { id: 'moon', label: 'Луна', icon: <Moon size={14} />, color: '#c084fc' }
  ]

  const navItems = [
    { id: 'home', label: 'Главная', icon: <Home size={16} /> },
    { id: 'about', label: 'Обо мне', icon: <User size={16} /> },
    { id: 'projects', label: 'Проекты', icon: <Layers size={16} /> },
    { id: 'breathing', label: 'Эффекты & FX', icon: <Sparkles size={16} /> },
    { id: 'contact', label: 'Контакты', icon: <Send size={16} /> }
  ]

  const handleBreathingChange = (styleId) => {
    setBreathing(styleId)

    // Fullscreen blade slash animation + callout
    if (onSlash) {
      const themeLabels = {
        sun: 'ДЫХАНИЕ СОЛНЦА (HINOKAMI KAGURA)',
        water: 'ДЫХАНИЕ ВОДЫ (WATER BREATHING)',
        thunder: 'ДЫХАНИЕ ГРОМА (THUNDER BREATHING)',
        moon: 'ДЫХАНИЕ ЛУНЫ (MOON BREATHING)'
      }
      onSlash(themeLabels[styleId] || `ТЕМА: ${styleId.toUpperCase()}`)
    }

    // Elemental theme confetti sparks
    const themeColors = {
      sun: ['#ef4444', '#f97316', '#facc15', '#ffffff'],
      water: ['#38bdf8', '#0284c7', '#67e8f9', '#ffffff'],
      thunder: ['#facc15', '#eab308', '#fef08a', '#ffffff'],
      moon: ['#c084fc', '#a855f7', '#e9d5ff', '#ffffff']
    }
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.15 },
        colors: themeColors[styleId] || ['#ef4444', '#38bdf8', '#facc15', '#c084fc']
      })
    } catch (e) {}
  }

  const handleNavClick = (pageId) => {
    setActivePage(pageId)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="neon-navbar-wrapper">
      <nav className="neon-navbar">
        {/* Brand */}
        <div 
          className="navbar-brand-group" 
          onClick={() => handleNavClick('home')}
        >
          <div className="navbar-brand-avatar-crest">
            <img 
              src={avatar || '/images/avatar.jpg'} 
              alt="DoomHex" 
              className="navbar-brand-avatar-img"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const fallback = e.currentTarget.parentElement?.querySelector('.kanji-crest.fallback')
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            <div className="kanji-crest fallback" style={{ display: 'none' }}>DH</div>
          </div>
          <div className="brand-text-block">
            <span className="brand-name">DoomHex</span>
            <span className="brand-sub">FRONTEND & FULLSTACK DEVELOPER</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="navbar-links-desktop">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-pill-btn ${activePage === item.id ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
              {activePage === item.id && <span className="active-dot" />}
            </button>
          ))}
        </div>

        {/* Right Controls: Breathing Selector & Audio */}
        <div className="navbar-actions-group">
          {/* Breathing Theme Switcher */}
          <div className="breathing-selector-pill" title="Сменить неоновую тему (Demon Slayer Style)">
            {breathingModes.map((b) => (
              <button
                key={b.id}
                onClick={() => handleBreathingChange(b.id)}
                className={`breathing-icon-btn ${breathing === b.id ? 'active' : ''}`}
                title={`Сменить тему: ${b.label}`}
                style={{
                  '--accent': b.color
                }}
              >
                {b.icon}
              </button>
            ))}
          </div>

          {/* PC-only Admin Quick Button (round button with User icon) */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`admin-round-btn ${activePage === 'admin' ? 'active' : ''}`}
            title="Панель администратора"
            aria-label="Панель администратора"
          >
            <User size={16} />
          </button>

          {/* Mobile hamburger */}
          <button 
            className="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer glass-panel">
          <div className="mobile-nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`mobile-nav-link ${activePage === item.id ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
