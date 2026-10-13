import React, { useState } from 'react'
import {
  Search,
  ExternalLink,
  Sparkles,
  Layers,
  Code,
  Bot,
  Gamepad2,
  Glasses,
  Camera,
  Cpu,
  Smartphone
} from 'lucide-react'
import GithubIcon from '../components/GithubIcon'
import { PROJECT_CATEGORIES } from '../data/defaultProjects'

export default function ProjectsPage({ projects, setActivePage }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'web': return <Code size={14} />
      case 'telegram': return <Bot size={14} />
      case 'gamedev': return <Gamepad2 size={14} />
      case 'vr': return <Glasses size={14} />
      case 'tours360': return <Camera size={14} />
      case 'arduino': return <Cpu size={14} />
      case 'apps': return <Smartphone size={14} />
      default: return <Layers size={14} />
    }
  }

  const filteredProjects = projects.filter((p) => {
    const q = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !q ||
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))

    let matchesCategory = true
    if (selectedCategory !== 'all') {
      const selectedObj = PROJECT_CATEGORIES.find((c) => c.id === selectedCategory)
      const catLabel = selectedObj?.label?.toLowerCase() || selectedCategory.toLowerCase()
      const projectCat = (p.category || '').toLowerCase()

      // Robust matching between category names and tags
      matchesCategory =
        projectCat === catLabel ||
        projectCat.includes(catLabel) ||
        catLabel.includes(projectCat) ||
        (selectedCategory === 'web' && (projectCat.includes('веб') || projectCat.includes('web'))) ||
        (selectedCategory === 'telegram' && (projectCat.includes('telegram') || projectCat.includes('бот'))) ||
        (selectedCategory === 'gamedev' && (projectCat.includes('игр') || projectCat.includes('unreal') || projectCat.includes('unity'))) ||
        (selectedCategory === 'vr' && (projectCat.includes('vr') || projectCat.includes('вр'))) ||
        (selectedCategory === 'tours360' && (projectCat.includes('тур') || projectCat.includes('360'))) ||
        (selectedCategory === 'arduino' && (projectCat.includes('arduino') || projectCat.includes('микроконтроллер') || projectCat.includes('ордуинно'))) ||
        (selectedCategory === 'apps' && (projectCat.includes('приложен') || projectCat.includes('сервис') || projectCat.includes('saas')))
    }

    return matchesSearch && matchesCategory
  })

  // Count projects per category
  const getCategoryCount = (catId) => {
    if (catId === 'all') return projects.length
    return projects.filter((p) => {
      const selectedObj = PROJECT_CATEGORIES.find((c) => c.id === catId)
      const catLabel = selectedObj?.label?.toLowerCase() || catId.toLowerCase()
      const projectCat = (p.category || '').toLowerCase()
      return (
        projectCat === catLabel ||
        projectCat.includes(catLabel) ||
        catLabel.includes(projectCat) ||
        (catId === 'web' && (projectCat.includes('веб') || projectCat.includes('web'))) ||
        (catId === 'telegram' && (projectCat.includes('telegram') || projectCat.includes('бот'))) ||
        (catId === 'gamedev' && (projectCat.includes('игр') || projectCat.includes('unreal') || projectCat.includes('unity'))) ||
        (catId === 'vr' && (projectCat.includes('vr') || projectCat.includes('вр'))) ||
        (catId === 'tours360' && (projectCat.includes('тур') || projectCat.includes('360'))) ||
        (catId === 'arduino' && (projectCat.includes('arduino') || projectCat.includes('микроконтроллер') || projectCat.includes('ордуинно'))) ||
        (catId === 'apps' && (projectCat.includes('приложен') || projectCat.includes('сервис') || projectCat.includes('saas')))
      )
    }).length
  }

  return (
    <div className="page-container projects-page">
      <div className="section-title-wrap">
        <div className="section-kanji-tag">ПОРТФОЛИО</div>
        <h1 className="neon-section-heading">Проекты & Разработки</h1>
        <p className="section-description">
          Проекты разного типа: от веб-разработки и Telegram-ботов до игр в Unreal & Unity, VR, виртуальных туров 360, микроконтроллеров Arduino и сервисов на любой вкус.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="projects-controls-bar glass-panel">
        <div className="search-input-group">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Поиск по проектам (Web, Telegram, Unreal, Unity, VR, 360, Arduino, Apps)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-breathing-pills">
          {PROJECT_CATEGORIES.map((item) => {
            const count = getCategoryCount(item.id)
            return (
              <button
                key={item.id}
                onClick={() => setSelectedCategory(item.id)}
                className={`filter-btn ${selectedCategory === item.id ? 'active' : ''}`}
                title={`Показать категорию: ${item.label}`}
              >
                {getCategoryIcon(item.id)}
                <span>{item.label}</span>
                <span className="filter-count-badge">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-quest-grid">
        {filteredProjects.length === 0 ? (
          <div className="no-projects-box glass-panel">
            <Sparkles size={32} />
            <h3>Проекты не найдены</h3>
            <p>Попробуйте изменить поисковый запрос или выбрать другую категорию.</p>
          </div>
        ) : (
          filteredProjects.map((p) => (
            <div key={p.id} className="quest-full-card glass-panel">
              <div className="quest-header-meta">
                <span className="breathing-chip">
                  <Layers size={13} />
                  <span>{p.category || 'Проект'}</span>
                </span>
                <span className="rank-tag-gold">{p.stats?.status || 'Active'}</span>
              </div>

              <h2 className="quest-card-title">{p.title}</h2>
              <p className="quest-card-desc">{p.description}</p>

              {p.stats && (
                <div className="quest-stats-row">
                  <div className="stat-pill">
                    <span className="lbl">Стек:</span>
                    <span className="val">{p.stats.techStack || 'Custom'}</span>
                  </div>
                  <div className="stat-pill">
                    <span className="lbl">Отклик / FPS:</span>
                    <span className="val">{p.stats.speed || 'Fast'}</span>
                  </div>
                </div>
              )}

              <div className="quest-tags-flow">
                {p.tags?.map((tag, tIdx) => (
                  <span key={tIdx} className="quest-tag-bubble">#{tag}</span>
                ))}
              </div>

              <div className="quest-card-footer">
                {p.demoUrl && (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="quest-btn-launch"
                  >
                    <ExternalLink size={15} />
                    <span>Демо / Ссылка</span>
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="quest-btn-git"
                  >
                    <GithubIcon size={15} />
                    <span>Исходный код</span>
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
