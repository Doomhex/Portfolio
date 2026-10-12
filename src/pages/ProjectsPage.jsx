import React, { useState } from 'react'
import {
  Search,
  ExternalLink,
  Sparkles,
  Plus,
  Layers
} from 'lucide-react'
import GithubIcon from '../components/GithubIcon'
import { soundEngine } from '../audio'

export default function ProjectsPage({ projects, setActivePage }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === 'all' ||
      (p.category && p.category.toLowerCase().includes(selectedCategory.toLowerCase())) ||
      (p.breathing && p.breathing === selectedCategory)

    return matchesSearch && matchesCategory
  })

  return (
    <div className="page-container projects-page">
      <div className="section-title-wrap">
        <div className="section-kanji-tag">ПОРТФОЛИО</div>
        <h1 className="neon-section-heading">Проекты & Разработки</h1>
        <p className="section-description">
          Коллекция созданных веб-приложений, архитектурных решений и UI-компонентов.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="projects-controls-bar glass-panel">
        <div className="search-input-group">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Поиск по названию или технологиям (React, Next.js, Node, API)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-breathing-pills">
          {[
            { id: 'all', label: 'Все проекты' },
            { id: 'Frontend', label: 'Frontend' },
            { id: 'Fullstack', label: 'Fullstack' },
            { id: 'UI', label: 'UI/UX' },
            { id: 'Backend', label: 'Backend' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedCategory(item.id)
                soundEngine.playClick()
              }}
              className={`filter-btn ${selectedCategory === item.id ? 'active' : ''}`}
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
          <span>Добавить проект</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="projects-quest-grid">
        {filteredProjects.length === 0 ? (
          <div className="no-projects-box glass-panel">
            <Sparkles size={32} />
            <h3>Проекты не найдены</h3>
            <p>Попробуйте изменить поисковый запрос или сбросить фильтр категорий.</p>
          </div>
        ) : (
          filteredProjects.map((p) => (
            <div key={p.id} className="quest-full-card glass-panel">
              <div className="quest-header-meta">
                <span className="breathing-chip">
                  <Layers size={13} />
                  <span>{p.category || 'Web Application'}</span>
                </span>
                <span className="rank-tag-gold">{p.stats?.status || 'Active'}</span>
              </div>

              <h2 className="quest-card-title">{p.title}</h2>
              <p className="quest-card-desc">{p.description}</p>

              {p.stats && (
                <div className="quest-stats-row">
                  <div className="stat-pill">
                    <span className="lbl">Стек:</span>
                    <span className="val">{p.stats.techStack || 'React'}</span>
                  </div>
                  <div className="stat-pill">
                    <span className="lbl">Отклик:</span>
                    <span className="val">{p.stats.speed || 'Fast'}</span>
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
                  <span>Демо</span>
                </a>
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="quest-btn-git"
                  onClick={() => soundEngine.playClick()}
                >
                  <GithubIcon size={15} />
                  <span>Исходный код</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
