import React, { useState } from 'react'
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  Shield,
  Sparkles,
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

  // Form state for creating / editing
  const [editingId, setEditingId] = useState(null)
  const [title, setTitle] = useState('')
  const [japaneseTitle, setJapaneseTitle] = useState('')
  const [rank, setRank] = useState('Hashira Rank')
  const [breathing, setBreathing] = useState('sun')
  const [description, setDescription] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [demoUrl, setDemoUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')

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
      if (onSlash) onSlash('ВРАТА СТОЛПА РАСПАХНУТЫ!')
    } else {
      soundEngine.playClick()
      setErrorMsg('Неверный логин или тайный код Столпа. Проверьте подсказку!')
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
      // Update
      const updated = projects.map((p) =>
        p.id === editingId
          ? {
              ...p,
              title,
              japaneseTitle: japaneseTitle || '任務の型',
              rank,
              breathing,
              description,
              tags: parsedTags.length > 0 ? parsedTags : ['React', 'Anime'],
              demoUrl: demoUrl || 'https://vercel.com',
              githubUrl: githubUrl || 'https://github.com/Doomhex'
            }
          : p
      )
      setProjects(updated)
      setSuccessToast('Миссия успешно обновлена!')
      setEditingId(null)
    } else {
      // Add new
      const newProj = {
        id: `proj-${Date.now()}`,
        title,
        japaneseTitle: japaneseTitle || '新たな任務 (New Quest)',
        rank,
        breathing,
        description,
        tags: parsedTags.length > 0 ? parsedTags : ['React', 'Vite'],
        demoUrl: demoUrl || 'https://vercel.com',
        githubUrl: githubUrl || 'https://github.com/Doomhex',
        stats: { complexity: '95%', demonsSlain: 'Новая задача', speed: 'Vite fast' },
        date: new Date().toISOString().slice(0, 7)
      }
      setProjects([newProj, ...projects])
      setSuccessToast('Новая миссия успешно добавлена в свиток!')
    }

    soundEngine.playFire()
    resetForm()
    setTimeout(() => setSuccessToast(''), 3500)
  }

  const handleEditClick = (p) => {
    setEditingId(p.id)
    setTitle(p.title)
    setJapaneseTitle(p.japaneseTitle || '')
    setRank(p.rank || 'Hashira Rank')
    setBreathing(p.breathing || 'sun')
    setDescription(p.description)
    setTagsInput(p.tags ? p.tags.join(', ') : '')
    setDemoUrl(p.demoUrl || '')
    setGithubUrl(p.githubUrl || '')
    soundEngine.playClick()
    window.scrollTo({ top: 350, behavior: 'smooth' })
  }

  const handleDeleteClick = (id) => {
    if (window.confirm('Точно удалить эту миссию из свитка?')) {
      const updated = projects.filter((p) => p.id !== id)
      setProjects(updated)
      soundEngine.playSlash()
      setSuccessToast('Миссия удалена.')
      setTimeout(() => setSuccessToast(''), 3000)
    }
  }

  const handleResetDefaults = () => {
    if (window.confirm('Восстановить исходные миссии Столпа?')) {
      setProjects(INITIAL_PROJECTS)
      soundEngine.playWater()
      setSuccessToast('Исходные миссии восстановлены!')
      setTimeout(() => setSuccessToast(''), 3000)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setTitle('')
    setJapaneseTitle('')
    setRank('Hashira Rank')
    setBreathing('sun')
    setDescription('')
    setTagsInput('')
    setDemoUrl('')
    setGithubUrl('')
  }

  return (
    <div className="page-container admin-page">
      <div className="section-title-wrap">
        <div className="section-kanji-tag">柱の門・管理</div>
        <h1 className="neon-section-heading">Врата Столпа: Панель Управления</h1>
        <p className="section-description">
          Защищенный командный пункт DoomHex для добавления, изменения и управления миссиями портфолио.
        </p>
      </div>

      {successToast && (
        <div className="admin-toast-banner">
          <Check size={18} />
          <span>{successToast}</span>
        </div>
      )}

      {!isAuthenticated ? (
        /* Login / Passcode Gate */
        <div className="admin-login-card glass-panel">
          <div className="gate-lock-icon-wrap">
            <Lock size={36} />
          </div>
          <div className="gate-kanji-seal">禁</div>
          <h2 className="gate-title">Вход для Столпа DoomHex</h2>
          <p className="gate-sub">Введите позывной и секретный код доступа к арсеналу</p>

          <form onSubmit={handleLogin} className="gate-login-form">
            <div className="form-field">
              <label>Позывной Столпа (Логин)</label>
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
              <label>Секретный Код Клинка (Пароль)</label>
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
              <span>Распахнуть Врата</span>
              <span className="kanji-btn-mark">開</span>
            </button>
          </form>

          {/* Quick Access Helper */}
          <div className="gate-hint-card">
            <div className="hint-title">🔑 Данные доступа по умолчанию:</div>
            <div className="hint-body">
              Логин: <code>doomhex</code> | Код: <code>1337</code>
            </div>
          </div>
        </div>
      ) : (
        /* Authenticated Dashboard */
        <div className="admin-dashboard-layout">
          {/* Admin Header Bar */}
          <div className="admin-header-strip glass-panel">
            <div className="admin-status-left">
              <span className="pulse-dot green" />
              <span className="admin-welcom-text">
                Вход подтвержден: <strong>DoomHex (Cyber Hashira)</strong>
              </span>
            </div>
            <div className="admin-actions-right">
              <button onClick={handleResetDefaults} className="btn-reset-ghost">
                <RotateCcw size={15} />
                <span>Сброс к базовым</span>
              </button>
              <button
                onClick={() => {
                  setIsAuthenticated(false)
                  soundEngine.playClick()
                }}
                className="btn-logout-ghost"
              >
                <Lock size={15} />
                <span>Запереть Врата</span>
              </button>
            </div>
          </div>

          {/* Form: Add / Edit Quest */}
          <div className="admin-form-panel glass-panel">
            <div className="panel-title-row">
              <Plus size={20} className="plus-icon" />
              <h3>{editingId ? 'Редактировать Миссию' : 'Создать Новую Миссию (Проект)'}</h3>
            </div>

            <form onSubmit={handleSaveProject} className="quest-admin-form">
              <div className="form-grid-2">
                <div className="form-field">
                  <label>Название Проекта *</label>
                  <input
                    type="text"
                    required
                    placeholder="Например: Cyber Demon Analytics"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="crow-input"
                  />
                </div>

                <div className="form-field">
                  <label>Японское Название / Кандзи</label>
                  <input
                    type="text"
                    placeholder="Например: 電脳の呼吸 分析盤"
                    value={japaneseTitle}
                    onChange={(e) => setJapaneseTitle(e.target.value)}
                    className="crow-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label>Ранг Миссии</label>
                  <select
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    className="crow-input select-dark"
                  >
                    <option value="Hashira Rank">Hashira Rank (Высший)</option>
                    <option value="S-Rank">S-Rank</option>
                    <option value="A-Rank">A-Rank</option>
                    <option value="Special Quest">Special Quest</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Стиль Дыхания</label>
                  <select
                    value={breathing}
                    onChange={(e) => setBreathing(e.target.value)}
                    className="crow-input select-dark"
                  >
                    <option value="sun">Солнце 🔥 (Hinokami)</option>
                    <option value="water">Вода 🌊 (Water Breathing)</option>
                    <option value="thunder">Гром ⚡ (Thunderclap)</option>
                    <option value="moon">Луна 🌙 (Moon Breathing)</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Описание Проекта & Задачи *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Опишите архитектуру, функционал, стек и преимущества..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="crow-textarea"
                />
              </div>

              <div className="form-field">
                <label>Технологии (через запятую)</label>
                <input
                  type="text"
                  placeholder="React 19, TypeScript, Vite, Tailwind, PostgreSQL"
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
                    placeholder="https://my-app.vercel.app"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    className="crow-input"
                  />
                </div>

                <div className="form-field">
                  <label>Ссылка на GitHub репозиторий</label>
                  <input
                    type="url"
                    placeholder="https://github.com/Doomhex/my-repo"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="crow-input"
                  />
                </div>
              </div>

              <div className="form-btn-actions">
                <button type="submit" className="btn-demon-katana">
                  <Save size={18} />
                  <span>{editingId ? 'Обновить миссию' : 'Опубликовать миссию'}</span>
                  <span className="kanji-btn-mark">銘</span>
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
            <h3 className="list-title">Список опубликованных миссий ({projects.length})</h3>

            <div className="admin-cards-table">
              {projects.map((p) => (
                <div key={p.id} className="admin-project-row">
                  <div className="row-info-col">
                    <span className="row-rank-badge">{p.rank}</span>
                    <strong className="row-title">{p.title}</strong>
                    <span className="row-kanji">{p.japaneseTitle}</span>
                  </div>

                  <div className="row-actions-col">
                    <button
                      onClick={() => handleEditClick(p)}
                      className="action-icon-btn edit"
                      title="Редактировать"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(p.id)}
                      className="action-icon-btn delete"
                      title="Удалить"
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
