import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import ParticlesBackground from './components/ParticlesBackground'
import SlashOverlay from './components/SlashOverlay'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import BreathingPage from './pages/BreathingPage'
import ContactPage from './pages/ContactPage'
import AdminPage from './pages/AdminPage'
import { INITIAL_PROJECTS } from './data/defaultProjects'
import { DEFAULT_SITE_CONTENT } from './data/defaultContent'
import { soundEngine } from './audio'
import './App.css'

export default function App() {
  const [activePage, setActivePage] = useState('home')
  const [breathing, setBreathing] = useState('sun')
  const [isMuted, setIsMuted] = useState(false)

  // Persistent projects in localStorage
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('doomhex_quests_db')
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS
    } catch (e) {
      return INITIAL_PROJECTS
    }
  })

  // Persistent site editable content in localStorage
  const [siteContent, setSiteContent] = useState(() => {
    try {
      const saved = localStorage.getItem('doomhex_site_content')
      return saved ? JSON.parse(saved) : DEFAULT_SITE_CONTENT
    } catch (e) {
      return DEFAULT_SITE_CONTENT
    }
  })

  // Fullscreen Katana Slash state
  const [slashActive, setSlashActive] = useState(false)
  const [slashTechnique, setSlashTechnique] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('doomhex_quests_db', JSON.stringify(projects))
    } catch (e) {}
  }, [projects])

  useEffect(() => {
    try {
      localStorage.setItem('doomhex_site_content', JSON.stringify(siteContent))
    } catch (e) {}
  }, [siteContent])

  // Update theme data-breathing on root
  useEffect(() => {
    document.documentElement.setAttribute('data-breathing', breathing)
  }, [breathing])

  const triggerSlash = (techName) => {
    setSlashActive(true)
    setSlashTechnique(techName || '斬 (SLAY)')
    setTimeout(() => {
      setSlashActive(false)
      setSlashTechnique('')
    }, 1600)
  }

  // Handle URL Hash navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (['home', 'about', 'projects', 'breathing', 'contact', 'admin'].includes(hash)) {
        setActivePage(hash)
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'about':
        return <AboutPage onSlash={triggerSlash} content={siteContent.about} images={siteContent.images || {}} />
      case 'projects':
        return <ProjectsPage projects={projects} setActivePage={setActivePage} />
      case 'breathing':
        return <BreathingPage onSlash={triggerSlash} setBreathing={setBreathing} />
      case 'contact':
        return <ContactPage content={siteContent.contact} />
      case 'admin':
        return (
          <AdminPage
            projects={projects}
            setProjects={setProjects}
            siteContent={siteContent}
            setSiteContent={setSiteContent}
            onSlash={triggerSlash}
          />
        )
      case 'home':
      default:
        return (
          <HomePage
            setActivePage={setActivePage}
            breathing={breathing}
            onSlash={triggerSlash}
            projects={projects}
            content={siteContent.home}
            images={siteContent.images || {}}
          />
        )
    }
  }

  return (
    <div className="app-root">
      {/* Background Anime Particles */}
      <ParticlesBackground breathing={breathing} />

      {/* Fullscreen Blade Slash FX */}
      <SlashOverlay
        active={slashActive}
        techniqueName={slashTechnique}
        breathing={breathing}
      />

      {/* Main Navigation Header */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        breathing={breathing}
        setBreathing={setBreathing}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onSlash={triggerSlash}
        avatar={siteContent.images?.avatar || '/images/avatar.jpg'}
      />

      {/* Active Page View */}
      <main>
        {renderCurrentPage()}
      </main>

      {/* Sanctum Footer */}
      <footer className="sanctum-footer">
        <div className="footer-content-wrap">
          <div className="footer-left">
            <div className="footer-kanji-seal">DH</div>
            <div>
              <div className="footer-credits">
                <strong>{siteContent.footer?.brandText || 'DoomHex | Frontend & Fullstack Developer'}</strong>
              </div>
              <div className="footer-sub-note">
                {siteContent.footer?.subText || 'Все права защищены. Разработано на React 19 + Vite.'}
              </div>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-badge">
              <span className="pulse-dot green" />
              <span>Vercel CI/CD Active</span>
            </div>
            <button
              onClick={() => {
                setActivePage('admin')
                soundEngine.playClick()
              }}
              className="btn-reset-ghost"
              title="Открыть панель администратора"
            >
              Панель управления
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
