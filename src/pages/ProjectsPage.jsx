import React, { useState } from 'react'
import {
  Search,
  ExternalLink,
  Sparkles,
  Flame,
  Droplets,
  Zap,
  Moon,
  Plus
} from 'lucide-react'
import GithubIcon from '../components/GithubIcon'
import { soundEngine } from '../audio'

export default function ProjectsPage({ projects, setActivePage }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBreathing, setSelectedBreathing] = useState('all')

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesBreathing =
      selectedBreathing === 'all' || p.breathing === selectedBreathing

    return matchesSearch && matchesBreathing
  })

  const getBreathingIcon = (style) => {
    switch (style) {
      case 'water': return <Droplets size={14} />
      case 'thunder': return <Zap size={14} />
      case 'moon': return <Moon size={14} />
      case 'sun':
      default: return <Flame size={14} />
    }
  }

  return (
    <div className="page-container projects-page">
      <div className="section-title-wrap">
        <div className="section-kanji-tag">鍛錬と任務</div>
        <h1 className="neon-section-heading">Свиток Миссий & Проектов</h1>
        <p className="section-description">
          Полный архив цифровых миссий Столпа DoomHex. Выберите категорию или найдите нужную технологию.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="projects-controls-bar glass-panel">
        <div className="search-input-group">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Поиск по названию, технологии (React, Vite, API)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-breathing-pills">
          {[
            { id: 'all', label: 'Все стили' },
            { id: 'sun', label: 'Солнце 🔥' },
            { id: 'water', label: 'Вода 🌊' },
            { id: 'thunder', label: 'Гром ⚡' },
            { id: 'moon', label: 'Луна 🌙' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedBreathing(item.id)
                soundEngine.playClick()
              }}
              className={`filter-btn ${selectedBreathing === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            setActivePage('admin')
            soundEngine.playClick()
          }}
          className="add-new-quest-shortcut-btn"
          title="Добавить новый проект через панель управления"
        >
          <Plus size={16} />
          <span>Добавить миссию</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="projects-quest-grid">
        {filteredProjects.length === 0 ? (
          <div className="no-projects-box glass-panel">
            <Sparkles size={32} />
            <h3>Миссии не найдены</h3>
            <p>Попробуйте изменить поисковый запрос или сбросить фильтр стилей.</p>
          </div>
        ) : (
          filteredProjects.map((p) => (
            <div key={p.id} className="quest-full-card glass-panel">
              <div className="quest-header-meta">
                <div className="breathing-chip">
                  {getBreathingIcon(p.breathing)}
                  <span>{p.breathing ? p.breathing.toUpperCase() : 'HASHIRA'}</span>
                </div>
                <span className="rank-tag-gold">{p.rank || 'S-Rank'}</span>
              </div>

              <div className="japanese-kanji-subhead">{p.japaneseTitle}</div>
              <h2 className="quest-card-title">{p.title}</h2>
              <p className="quest-card-desc">{p.description}</p>

              {p.stats && (
                <div className="quest-stats-row">
                  <div className="stat-pill">
                    <span className="lbl">Сложность:</span>
                    <span className="val">{p.stats.complexity}</span>
                  </div>
                  <div className="stat-pill">
                    <span className="lbl">Скорость:</span>
                    <span className="val">{p.stats.speed}</span>
                  </div>
                </div>
              )}

              <div className="quest-tags-flow">
                {p.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="quest-tag-bubble">#{tag}</span>
                ))}
              </div>

              <div className="quest-card-footer">
                <a
                  href={p.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="quest-btn-launch"
                  onClick={() => soundEngine.playClick()}
                >
                  <ExternalLink size={15} />
                  <span>Открыть проект</span>
                </a>
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="quest-btn-git"
                  onClick={() => soundEngine.playClick()}
                >
                  <GithubIcon size={15} />
                  <span>Код</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
