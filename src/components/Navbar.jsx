import React from 'react'
import {
  Flame,
  Droplets,
  Zap,
  Moon,
  Volume2,
  VolumeX,
  Lock,
  Swords,
  Scroll,
  Send,
  Sparkles,
  Menu,
  X
} from 'lucide-react'
import { soundEngine } from '../audio'

export default function Navbar({
  activePage,
  setActivePage,
  breathing,
  setBreathing,
  isMuted,
  setIsMuted,
  onSlash
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const breathingModes = [
    { id: 'sun', label: 'Солнце', icon: <Flame size={14} />, color: '#ef4444' },
    { id: 'water', label: 'Вода', icon: <Droplets size={14} />, color: '#38bdf8' },
    { id: 'thunder', label: 'Гром', icon: <Zap size={14} />, color: '#facc15' },
    { id: 'moon', label: 'Луна', icon: <Moon size={14} />, color: '#c084fc' }
  ]

  const navItems = [
    { id: 'home', label: 'Святилище', icon: <Swords size={16} /> },
    { id: 'about', label: 'О Столпе', icon: <Scroll size={16} /> },
    { id: 'projects', label: 'Квесты & Код', icon: <Sparkles size={16} /> },
    { id: 'breathing', label: 'Зал Техник', icon: <Flame size={16} /> },
    { id: 'contact', label: 'Ворон Уз', icon: <Send size={16} /> },
    { id: 'admin', label: 'Врата Админа', icon: <Lock size={16} /> }
  ]

  const handleBreathingChange = (styleId) => {
    setBreathing(styleId)
    if (styleId === 'water') soundEngine.playWater()
    else if (styleId === 'thunder') soundEngine.playThunder()
    else if (styleId === 'sun') soundEngine.playFire()
    else soundEngine.playSlash()

    if (onSlash) {
      onSlash(`Стиль: ${styleId.toUpperCase()}`)
    }
  }

  const handleNavClick = (pageId) => {
    setActivePage(pageId)
    soundEngine.playClick()
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAudioToggle = () => {
    const muted = soundEngine.toggleMute()
    setIsMuted(muted)
  }

  return (
    <header className="neon-navbar-wrapper">
      <nav className="neon-navbar">
        {/* Brand */}
        <div 
          className="navbar-brand-group" 
          onClick={() => handleNavClick('home')}
        >
          <div className="kanji-crest">滅</div>
          <div className="brand-text-block">
            <span className="brand-name">DoomHex</span>
            <span className="brand-sub">КИБЕР-СТОЛП ПОЛНОГО ДЫХАНИЯ</span>
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
          {/* Breathing Pills */}
          <div className="breathing-selector-pill">
            {breathingModes.map((b) => (
              <button
                key={b.id}
                onClick={() => handleBreathingChange(b.id)}
                className={`breathing-icon-btn ${breathing === b.id ? 'active' : ''}`}
                title={`Сменить дыхание: ${b.label}`}
                style={{
                  '--accent': b.color
                }}
              >
                {b.icon}
              </button>
            ))}
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`sound-toggle-btn ${isMuted ? 'muted' : ''}`}
            title={isMuted ? 'Включить звук катаны' : 'Выключить звук'}
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
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
