import React, { useState } from 'react'
import {
  Lock,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  KeyRound,
  Check,
  AlertCircle
} from 'lucide-react'
import { soundEngine } from '../audio'
import { INITIAL_PROJECTS } from '../data/defaultProjects'

export default function AdminPage({ projects, setProjects, onSlash }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [passcode, setPasscode] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successToast, setSuccessToast] = useState('')

  // Form state
  const [editingId, setEditingId] = useState(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Frontend & Web App')
  const [breathing, setBreathing] = useState('sun')
  const [description, setDescription] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [demoUrl, setDemoUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [status, setStatus] = useState('Production')

  const handleLogin = (e) => {
    e.preventDefault()
    const cleanUser = username.trim().toLowerCase()
    const cleanPass = passcode.trim().toLowerCase()

    if (
      (cleanUser === 'doomhex' || cleanUser === 'admin') &&
      (cleanPass === '1337' || cleanPass === 'slayer' || cleanPass === 'demon')
    ) {
      soundEngine.playSlash()
      setIsAuthenticated(true)
      setErrorMsg('')
      if (onSlash) onSlash('ДОСТУП РАЗРЕШЕН 🔓')
    } else {
      soundEngine.playClick()
      setErrorMsg('Неверный логин или код доступа. Проверьте подсказку ниже.')
    }
  }

  const handleSaveProject = (e) => {
    e.preventDefault()
    if (!title || !description) return

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    if (editingId) {
      // Update existing
      const updated = projects.map((p) =>
        p.id === editingId
          ? {
              ...p,
              title,
              category,
              breathing,
              description,
              tags: parsedTags.length > 0 ? parsedTags : ['React', 'TypeScript'],
              demoUrl: demoUrl || 'https://vercel.com',
              githubUrl: githubUrl || 'https://github.com/Doomhex',
              stats: { ...p.stats, status }
            }
          : p
      )
      setProjects(updated)
      setSuccessToast('Проект успешно обновлен!')
      setEditingId(null)
    } else {
      // Add new
      const newProj = {
        id: `proj-${Date.now()}`,
        title,
        category,
        breathing,
        description,
        tags: parsedTags.length > 0 ? parsedTags : ['React', 'Vite'],
        demoUrl: demoUrl || 'https://vercel.com',
        githubUrl: githubUrl || 'https://github.com/Doomhex',
        stats: { status: status || 'Production', techStack: parsedTags[0] || 'React', speed: '< 100ms' },
        date: new Date().toISOString().slice(0, 7)
      }
      setProjects([newProj, ...projects])
      setSuccessToast('Новый проект успешно добавлен в портфолио!')
    }

    soundEngine.playFire()
    resetForm()
    setTimeout(() => setSuccessToast(''), 3500)
  }

  const handleEditClick = (p) => {
    setEditingId(p.id)
    setTitle(p.title)
    setCategory(p.category || 'Frontend')
    setBreathing(p.breathing || 'sun')
    setDescription(p.description)
    setTagsInput(p.tags ? p.tags.join(', ') : '')
    setDemoUrl(p.demoUrl || '')
    setGithubUrl(p.githubUrl || '')
    setStatus(p.stats?.status || 'Production')
    soundEngine.playClick()
    window.scrollTo({ top: 350, behavior: 'smooth' })
  }

  const handleDeleteClick = (id) => {
    if (window.confirm('Удалить этот проект из портфолио?')) {
      const updated = projects.filter((p) => p.id !== id)
      setProjects(updated)
      soundEngine.playSlash()
      setSuccessToast('Проект удален.')
      setTimeout(() => setSuccessToast(''), 3000)
    }
  }

  const handleResetDefaults = () => {
    if (window.confirm('Сбросить список проектов к исходным?')) {
      setProjects(INITIAL_PROJECTS)
      soundEngine.playWater()
      setSuccessToast('Исходные проекты восстановлены!')
      setTimeout(() => setSuccessToast(''), 3000)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setTitle('')
    setCategory('Frontend & Web App')
    setBreathing('sun')
    setDescription('')
    setTagsInput('')
    setDemoUrl('')
    setGithubUrl('')
    setStatus('Production')
  }

  return (
    <div className="page-container admin-page">
      <div className="section-title-wrap">
        <div className="section-kanji-tag">ПАНЕЛЬ УПРАВЛЕНИЯ</div>
        <h1 className="neon-section-heading">Управление Портфолио</h1>
        <p className="section-description">
          Добавление, редактирование и удаление проектов. Все изменения мгновенно отображаются на сайте.
        </p>
      </div>

      {successToast && (
        <div className="admin-toast-banner">
          <Check size={18} />
          <span>{successToast}</span>
        </div>
      )}

      {!isAuthenticated ? (
        /* Login Form */
        <div className="admin-login-card glass-panel">
          <div className="gate-lock-icon-wrap">
            <Lock size={36} />
          </div>
          <h2 className="gate-title">Вход для Администратора</h2>
          <p className="gate-sub">Введите логин и секретный код для управления проектами</p>

          <form onSubmit={handleLogin} className="gate-login-form">
            <div className="form-field">
              <label>Логин администратора</label>
              <input
                type="text"
                required
                placeholder="doomhex"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="crow-input"
              />
            </div>

            <div className="form-field">
              <label>Код доступа (пароль)</label>
              <input
                type="password"
                required
                placeholder="••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="crow-input"
              />
            </div>

            {errorMsg && (
              <div className="gate-error-box">
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <button type="submit" className="btn-demon-katana full-width">
              <KeyRound size={18} />
              <span>Войти в панель</span>
            </button>
          </form>

          {/* Helper hint */}
          <div className="gate-hint-card">
            <div className="hint-title">🔑 Данные для входа:</div>
            <div className="hint-body">
              Логин: <code>doomhex</code> | Код: <code>1337</code>
            </div>
          </div>
        </div>
      ) : (
        /* Authenticated Admin Dashboard */
        <div className="admin-dashboard-layout">
          {/* Header Bar */}
          <div className="admin-header-strip glass-panel">
            <div className="admin-status-left">
              <span className="pulse-dot green" />
              <span className="admin-welcom-text">
                Авторизован: <strong>DoomHex (Admin)</strong>
              </span>
            </div>
            <div className="admin-actions-right">
              <button onClick={handleResetDefaults} className="btn-reset-ghost">
                <RotateCcw size={15} />
                <span>Сброс к исходным</span>
              </button>
              <button
                onClick={() => {
                  setIsAuthenticated(false)
                  soundEngine.playClick()
                }}
                className="btn-logout-ghost"
              >
                <Lock size={15} />
                <span>Выйти</span>
              </button>
            </div>
          </div>

          {/* Form: Add / Edit Project */}
          <div className="admin-form-panel glass-panel">
            <div className="panel-title-row">
              <Plus size={20} className="plus-icon" />
              <h3>{editingId ? 'Редактировать проект' : 'Добавить новый проект'}</h3>
            </div>

            <form onSubmit={handleSaveProject} className="quest-admin-form">
              <div className="form-grid-2">
                <div className="form-field">
                  <label>Название проекта *</label>
                  <input
                    type="text"
                    required
                    placeholder="Например: AI SaaS Platform"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="crow-input"
                  />
                </div>

                <div className="form-field">
                  <label>Категория проекта</label>
                  <input
                    type="text"
                    placeholder="Например: Fullstack Web App, UI Library, Mobile Web"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="crow-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label>Статус проекта</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="crow-input select-dark"
                  >
                    <option value="Production">Production</option>
                    <option value="Live Demo">Live Demo</option>
                    <option value="Open Source">Open Source</option>
                    <option value="In Development">In Development</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Цветовой стиль карточки (Тема)</label>
                  <select
                    value={breathing}
                    onChange={(e) => setBreathing(e.target.value)}
                    className="crow-input select-dark"
                  >
                    <option value="sun">Огненный неон 🔥 (Sun)</option>
                    <option value="water">Лазурный неон 🌊 (Water)</option>
                    <option value="thunder">Электрический неон ⚡ (Thunder)</option>
                    <option value="moon">Фиолетовый неон 🌙 (Moon)</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Описание проекта и функционала *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Опишите стек, назначение, архитектурные особенности..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="crow-textarea"
                />
              </div>

              <div className="form-field">
                <label>Используемые технологии (через запятую)</label>
                <input
                  type="text"
                  placeholder="React 19, TypeScript, Vite, Tailwind CSS, REST API"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="crow-input"
                />
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label>Ссылка на Демо (Vercel / Сайт)</label>
                  <input
                    type="url"
                    placeholder="https://my-project.vercel.app"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    className="crow-input"
                  />
                </div>

                <div className="form-field">
                  <label>Ссылка на GitHub репозиторий</label>
                  <input
                    type="url"
                    placeholder="https://github.com/Doomhex/project"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="crow-input"
                  />
                </div>
              </div>

              <div className="form-btn-actions">
                <button type="submit" className="btn-demon-katana">
                  <Save size={18} />
                  <span>{editingId ? 'Сохранить изменения' : 'Добавить проект'}</span>
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} className="btn-neon-ghost">
                    Отмена
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Current Projects List */}
          <div className="admin-projects-list glass-panel">
            <h3 className="list-title">Опубликованные проекты ({projects.length})</h3>

            <div className="admin-cards-table">
              {projects.map((p) => (
                <div key={p.id} className="admin-project-row">
                  <div className="row-info-col">
                    <span className="row-rank-badge">{p.category || 'App'}</span>
                    <strong className="row-title">{p.title}</strong>
                    <span className="row-kanji">{p.stats?.status || 'Active'}</span>
                  </div>

                  <div className="row-actions-col">
                    <button
                      onClick={() => handleEditClick(p)}
                      className="action-icon-btn edit"
                      title="Редактировать проект"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(p.id)}
                      className="action-icon-btn delete"
                      title="Удалить проект"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
