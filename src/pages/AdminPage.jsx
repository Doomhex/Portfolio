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
  AlertCircle,
  FileText,
  Layers,
  Image as ImageIcon,
  Upload,
  RefreshCw
} from 'lucide-react'
import { soundEngine } from '../audio'
import { INITIAL_PROJECTS } from '../data/defaultProjects'
import { DEFAULT_SITE_CONTENT } from '../data/defaultContent'

export default function AdminPage({
  projects,
  setProjects,
  siteContent,
  setSiteContent,
  onSlash
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [passcode, setPasscode] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successToast, setSuccessToast] = useState('')

  // Admin Active Tab: 'content' (Text CMS) or 'projects' (Projects Manager)
  const [adminTab, setAdminTab] = useState('content')
  const [contentSection, setContentSection] = useState('images')

  // Local copy of editable content for the form
  const [editableContent, setEditableContent] = useState(siteContent || DEFAULT_SITE_CONTENT)

  // Form state for Projects
  const [editingId, setEditingId] = useState(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Frontend & Web App')
  const [breathing, setBreathing] = useState('sun')
  const [description, setDescription] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [demoUrl, setDemoUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [status, setStatus] = useState('Production')

  // Keep local editableContent synced if props change
  React.useEffect(() => {
    if (siteContent) {
      setEditableContent(siteContent)
    }
  }, [siteContent])

  const handleLogin = (e) => {
    e.preventDefault()
    const cleanUser = username.trim()
    const cleanPass = passcode.trim()

    // Required exact credentials requested by user:
    // Login: doomhexadmin
    // Password: muhammadali1
    if (cleanUser === 'doomhexadmin' && cleanPass === 'muhammadali1') {
      soundEngine.playSlash()
      setIsAuthenticated(true)
      setErrorMsg('')
      if (onSlash) onSlash('ВХОД ВЫПОЛНЕН: DOOMHEX ADMIN 🔓')
    } else {
      soundEngine.playClick()
      setErrorMsg('Неверный логин или пароль администратора.')
    }
  }

  // Handle nested text CMS change
  const handleContentFieldChange = (section, field, value) => {
    setEditableContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  // Handle image upload from computer (FileReader to Base64 dataURL)
  const handleImageFileUpload = (field, e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        handleContentFieldChange('images', field, reader.result)
        soundEngine.playClick()
        setSuccessToast('Изображение успешно загружено!')
        setTimeout(() => setSuccessToast(''), 2500)
      }
    }
    reader.readAsDataURL(file)
  }

  // Save all site content texts & images
  const handleSaveAllContent = (e) => {
    e.preventDefault()
    setSiteContent(editableContent)
    soundEngine.playFire()
    setSuccessToast('Все изменения (тексты и изображения) успешно сохранены!')
    setTimeout(() => setSuccessToast(''), 3500)
  }

  // Reset all texts to defaults
  const handleResetContent = () => {
    if (window.confirm('Сбросить все тексты и изображения к исходным?')) {
      setEditableContent(DEFAULT_SITE_CONTENT)
      setSiteContent(DEFAULT_SITE_CONTENT)
      soundEngine.playWater()
      setSuccessToast('Данные сброшены к значениям по умолчанию.')
      setTimeout(() => setSuccessToast(''), 3000)
    }
  }

  // Project handlers
  const handleSaveProject = (e) => {
    e.preventDefault()
    if (!title || !description) return

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    if (editingId) {
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
    resetProjectForm()
    setTimeout(() => setSuccessToast(''), 3500)
  }

  const handleEditProjectClick = (p) => {
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

  const handleDeleteProjectClick = (id) => {
    if (window.confirm('Удалить этот проект из портфолио?')) {
      const updated = projects.filter((p) => p.id !== id)
      setProjects(updated)
      soundEngine.playSlash()
      setSuccessToast('Проект удален.')
      setTimeout(() => setSuccessToast(''), 3000)
    }
  }

  const handleResetProjects = () => {
    if (window.confirm('Сбросить список проектов к исходным?')) {
      setProjects(INITIAL_PROJECTS)
      soundEngine.playWater()
      setSuccessToast('Исходные проекты восстановлены!')
      setTimeout(() => setSuccessToast(''), 3000)
    }
  }

  const resetProjectForm = () => {
    setEditingId(null)
    setTitle('')
    setCategory('Веб-разработка')
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
        <h1 className="neon-section-heading">Админ-Панель & CMS DoomHex</h1>
        <p className="section-description">
          Управление текстами, картинками и проектами. При удалении текста блок полностью исчезает с сайта.
        </p>
      </div>

      {successToast && (
        <div className="admin-toast-banner">
          <Check size={18} />
          <span>{successToast}</span>
        </div>
      )}

      {!isAuthenticated ? (
        /* Clean Login Form without visible credentials */
        <div className="admin-login-card glass-panel">
          <div className="gate-lock-icon-wrap">
            <Lock size={36} />
          </div>
          <h2 className="gate-title">Вход в Панель Управления</h2>
          <p className="gate-sub">Введите учетные данные администратора</p>

          <form onSubmit={handleLogin} className="gate-login-form">
            <div className="form-field">
              <label>Логин</label>
              <input
                type="text"
                required
                placeholder="Логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="crow-input"
                autoComplete="username"
              />
            </div>

            <div className="form-field">
              <label>Пароль</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="crow-input"
                autoComplete="current-password"
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
              <span>Войти в систему</span>
            </button>
          </form>
        </div>
      ) : (
        /* Authenticated Admin CMS */
        <div className="admin-dashboard-layout">
          {/* Top Status & Main Tabs Bar */}
          <div className="admin-header-strip glass-panel">
            <div className="admin-status-left">
              <span className="pulse-dot green" />
              <span className="admin-welcom-text">
                Вход выполнен: <strong>doomhexadmin</strong>
              </span>
            </div>

            {/* Admin Main Tabs */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setAdminTab('content')
                  soundEngine.playClick()
                }}
                className={`filter-btn ${adminTab === 'content' ? 'active' : ''}`}
                style={{ padding: '8px 16px', display: 'flex', gap: '6px', alignItems: 'center' }}
              >
                <FileText size={16} />
                <span>Контент & Картинки (CMS)</span>
              </button>

              <button
                onClick={() => {
                  setAdminTab('projects')
                  soundEngine.playClick()
                }}
                className={`filter-btn ${adminTab === 'projects' ? 'active' : ''}`}
                style={{ padding: '8px 16px', display: 'flex', gap: '6px', alignItems: 'center' }}
              >
                <Layers size={16} />
                <span>Проекты ({projects.length})</span>
              </button>
            </div>

            <div className="admin-actions-right">
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

          {/* ================= TAB 1: CONTENT & IMAGES CMS ================= */}
          {adminTab === 'content' && (
            <div className="admin-form-panel glass-panel">
              <div className="panel-title-row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={22} className="plus-icon" />
                  <div>
                    <h3>Редактор Контента, Изображений & Блоков</h3>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                      Если стереть текст в поле — соответствующий блок (рамка и фон) полностью исчезнет с сайта!
                    </div>
                  </div>
                </div>

                <button onClick={handleResetContent} className="btn-reset-ghost">
                  <RotateCcw size={15} />
                  <span>Сбросить всё к базовым</span>
                </button>
              </div>

              {/* Sub-tabs for Pages & Images */}
              <div style={{ display: 'flex', gap: '8px', margin: '20px 0 24px 0', flexWrap: 'wrap' }}>
                {[
                  { id: 'images', label: '🖼️ Изображения (Фон & Аватар)' },
                  { id: 'home', label: '🏠 Главная (Home)' },
                  { id: 'about', label: '👤 Обо мне (About)' },
                  { id: 'contact', label: '📬 Контакты (Contact)' },
                  { id: 'footer', label: '⚡ Футер (Footer)' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setContentSection(s.id)
                      soundEngine.playClick()
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      background: contentSection === s.id ? 'var(--neon-primary)' : 'rgba(255,255,255,0.05)',
                      color: contentSection === s.id ? '#000' : '#fff',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'all 0.2s'
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSaveAllContent} className="quest-admin-form">
                {/* ================= IMAGES SECTION ================= */}
                {contentSection === 'images' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Hero Background Image */}
                    <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <h4 style={{ color: 'var(--neon-accent)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ImageIcon size={18} />
                        <span>Фоновое изображение главной страницы (Hero Background)</span>
                      </h4>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '14px' }}>
                        Вставьте прямую ссылку на картинку или загрузите изображение прямо с вашего компьютера:
                      </div>

                      <div className="form-grid-2">
                        <div className="form-field">
                          <label>URL картинки фона</label>
                          <input
                            type="text"
                            placeholder="https://... или /images/hero.jpg"
                            value={editableContent.images?.heroBg || ''}
                            onChange={(e) => handleContentFieldChange('images', 'heroBg', e.target.value)}
                            className="crow-input"
                          />
                        </div>

                        <div className="form-field">
                          <label>Загрузить файл с устройства</label>
                          <label className="btn-neon-ghost" style={{ cursor: 'pointer', justifyContent: 'center' }}>
                            <Upload size={16} />
                            <span>Выбрать файл с ПК</span>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={(e) => handleImageFileUpload('heroBg', e)}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Presets */}
                      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Быстрые пресеты:</span>
                        <button
                          type="button"
                          onClick={() => handleContentFieldChange('images', 'heroBg', '/images/hero.jpg')}
                          className="filter-btn"
                          style={{ fontSize: '0.78rem' }}
                        >
                          Битва Драконов (Hero)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleContentFieldChange('images', 'heroBg', '/images/castle.jpg')}
                          className="filter-btn"
                          style={{ fontSize: '0.78rem' }}
                        >
                          Бесконечный Замок (Castle)
                        </button>
                      </div>

                      {/* Preview Thumbnail */}
                      {editableContent.images?.heroBg && (
                        <div style={{ marginTop: '14px', borderRadius: '10px', overflow: 'hidden', height: '140px', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <img
                            src={editableContent.images.heroBg}
                            alt="Hero Preview"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Avatar Image */}
                    <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <h4 style={{ color: 'var(--neon-accent)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ImageIcon size={18} />
                        <span>Аватар разработчика (Profile Avatar)</span>
                      </h4>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '14px' }}>
                        Отображается на странице «Обо мне»:
                      </div>

                      <div className="form-grid-2">
                        <div className="form-field">
                          <label>URL картинки аватара</label>
                          <input
                            type="text"
                            placeholder="https://... или /images/avatar.jpg"
                            value={editableContent.images?.avatar || ''}
                            onChange={(e) => handleContentFieldChange('images', 'avatar', e.target.value)}
                            className="crow-input"
                          />
                        </div>

                        <div className="form-field">
                          <label>Загрузить файл с устройства</label>
                          <label className="btn-neon-ghost" style={{ cursor: 'pointer', justifyContent: 'center' }}>
                            <Upload size={16} />
                            <span>Выбрать фото с ПК</span>
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={(e) => handleImageFileUpload('avatar', e)}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Presets */}
                      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Быстрый пресет:</span>
                        <button
                          type="button"
                          onClick={() => handleContentFieldChange('images', 'avatar', '/images/avatar.jpg')}
                          className="filter-btn"
                          style={{ fontSize: '0.78rem' }}
                        >
                          Аниме-аватар DoomHex
                        </button>
                      </div>

                      {/* Preview Thumbnail */}
                      {editableContent.images?.avatar && (
                        <div style={{ marginTop: '14px', width: '90px', height: '90px', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--neon-border)' }}>
                          <img
                            src={editableContent.images.avatar}
                            alt="Avatar Preview"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ================= HOME SECTION ================= */}
                {contentSection === 'home' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-field">
                      <label>Статус-бейдж (напр. "ОТКРЫТ К НОВЫМ ПРОЕКТАМ", если очистить — скроется)</label>
                      <input
                        type="text"
                        placeholder="Пусто = скрыть бейдж"
                        value={editableContent.home?.badgeText || ''}
                        onChange={(e) => handleContentFieldChange('home', 'badgeText', e.target.value)}
                        className="crow-input"
                      />
                    </div>

                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Надзаголовок (Маленький текст над именем)</label>
                        <input
                          type="text"
                          placeholder="Пусто = скрыть"
                          value={editableContent.home?.preTitle || ''}
                          onChange={(e) => handleContentFieldChange('home', 'preTitle', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Главный заголовок (Имя/Бренд)</label>
                        <input
                          type="text"
                          placeholder="Пусто = скрыть"
                          value={editableContent.home?.mainTitle || ''}
                          onChange={(e) => handleContentFieldChange('home', 'mainTitle', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label>Главное описание в Hero (если очистить — скроется)</label>
                      <textarea
                        rows={3}
                        placeholder="Пусто = скрыть блок описания"
                        value={editableContent.home?.description || ''}
                        onChange={(e) => handleContentFieldChange('home', 'description', e.target.value)}
                        className="crow-textarea"
                      />
                    </div>

                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Кнопка 1: Проекты (если очистить — скроется)</label>
                        <input
                          type="text"
                          placeholder="Пусто = скрыть кнопку"
                          value={editableContent.home?.projectsBtnText || ''}
                          onChange={(e) => handleContentFieldChange('home', 'projectsBtnText', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Кнопка 2: Связаться (если очистить — скроется)</label>
                        <input
                          type="text"
                          placeholder="Пусто = скрыть кнопку"
                          value={editableContent.home?.contactBtnText || ''}
                          onChange={(e) => handleContentFieldChange('home', 'contactBtnText', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label>Кнопка 3: Эффект клинка (если очистить — скроется)</label>
                      <input
                        type="text"
                        placeholder="Пусто = скрыть кнопку"
                        value={editableContent.home?.bladeBtnText || ''}
                        onChange={(e) => handleContentFieldChange('home', 'bladeBtnText', e.target.value)}
                        className="crow-input"
                      />
                    </div>

                    {/* Stats */}
                    <div style={{ marginTop: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <h4 style={{ color: 'var(--neon-accent)', marginBottom: '14px' }}>
                        Блоки статистики (Очистите все поля карточки, чтобы она полностью исчезла)
                      </h4>

                      <div className="form-grid-2" style={{ marginBottom: '14px' }}>
                        <div className="form-field">
                          <label>Карточка 1: Число/Значение</label>
                          <input
                            type="text"
                            placeholder="Пусто = удалить"
                            value={editableContent.home?.stat1Value || ''}
                            onChange={(e) => handleContentFieldChange('home', 'stat1Value', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Карточка 1: Заголовок</label>
                          <input
                            type="text"
                            placeholder="Пусто = удалить"
                            value={editableContent.home?.stat1Title || ''}
                            onChange={(e) => handleContentFieldChange('home', 'stat1Title', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                      </div>
                      <div className="form-field" style={{ marginBottom: '16px' }}>
                        <label>Карточка 1: Описание</label>
                        <input
                          type="text"
                          placeholder="Пусто = удалить"
                          value={editableContent.home?.stat1Desc || ''}
                          onChange={(e) => handleContentFieldChange('home', 'stat1Desc', e.target.value)}
                          className="crow-input"
                        />
                      </div>

                      <div className="form-grid-2" style={{ marginBottom: '14px' }}>
                        <div className="form-field">
                          <label>Карточка 2: Число/Значение</label>
                          <input
                            type="text"
                            placeholder="Пусто = удалить"
                            value={editableContent.home?.stat2Value || ''}
                            onChange={(e) => handleContentFieldChange('home', 'stat2Value', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Карточка 2: Заголовок</label>
                          <input
                            type="text"
                            placeholder="Пусто = удалить"
                            value={editableContent.home?.stat2Title || ''}
                            onChange={(e) => handleContentFieldChange('home', 'stat2Title', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                      </div>
                      <div className="form-field" style={{ marginBottom: '16px' }}>
                        <label>Карточка 2: Описание</label>
                        <input
                          type="text"
                          placeholder="Пусто = удалить"
                          value={editableContent.home?.stat2Desc || ''}
                          onChange={(e) => handleContentFieldChange('home', 'stat2Desc', e.target.value)}
                          className="crow-input"
                        />
                      </div>

                      <div className="form-grid-2" style={{ marginBottom: '14px' }}>
                        <div className="form-field">
                          <label>Карточка 3: Число/Значение</label>
                          <input
                            type="text"
                            placeholder="Пусто = удалить"
                            value={editableContent.home?.stat3Value || ''}
                            onChange={(e) => handleContentFieldChange('home', 'stat3Value', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Карточка 3: Заголовок</label>
                          <input
                            type="text"
                            placeholder="Пусто = удалить"
                            value={editableContent.home?.stat3Title || ''}
                            onChange={(e) => handleContentFieldChange('home', 'stat3Title', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                      </div>
                      <div className="form-field" style={{ marginBottom: '16px' }}>
                        <label>Карточка 3: Описание</label>
                        <input
                          type="text"
                          placeholder="Пусто = удалить"
                          value={editableContent.home?.stat3Desc || ''}
                          onChange={(e) => handleContentFieldChange('home', 'stat3Desc', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                    </div>

                    <div style={{ marginTop: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="form-grid-2">
                        <div className="form-field">
                          <label>Заголовок секции Избранных Проектов</label>
                          <input
                            type="text"
                            placeholder="Пусто = скрыть"
                            value={editableContent.home?.featuredHeading || ''}
                            onChange={(e) => handleContentFieldChange('home', 'featuredHeading', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Подзаголовок секции Избранных Проектов</label>
                          <input
                            type="text"
                            placeholder="Пусто = скрыть"
                            value={editableContent.home?.featuredSub || ''}
                            onChange={(e) => handleContentFieldChange('home', 'featuredSub', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= ABOUT SECTION ================= */}
                {contentSection === 'about' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Имя в профиле (если очистить — скроется)</label>
                        <input
                          type="text"
                          placeholder="Пусто = скрыть"
                          value={editableContent.about?.name || ''}
                          onChange={(e) => handleContentFieldChange('about', 'name', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Бейдж 1 (если очистить — скроется)</label>
                        <input
                          type="text"
                          placeholder="Пусто = скрыть"
                          value={editableContent.about?.badge1 || ''}
                          onChange={(e) => handleContentFieldChange('about', 'badge1', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label>Бейдж 2 (если очистить — скроется)</label>
                      <input
                        type="text"
                        placeholder="Пусто = скрыть"
                        value={editableContent.about?.badge2 || ''}
                        onChange={(e) => handleContentFieldChange('about', 'badge2', e.target.value)}
                        className="crow-input"
                      />
                    </div>

                    <div className="form-field">
                      <label>Текст биографии и опыта (Bio)</label>
                      <textarea
                        rows={4}
                        placeholder="Пусто = скрыть"
                        value={editableContent.about?.bio || ''}
                        onChange={(e) => handleContentFieldChange('about', 'bio', e.target.value)}
                        className="crow-textarea"
                      />
                    </div>

                    <div style={{ marginTop: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <h4 style={{ color: 'var(--neon-accent)', marginBottom: '14px' }}>
                        Спецификации разработчика (Очистите оба поля карточки, чтобы она полностью исчезла)
                      </h4>

                      <div className="form-grid-2" style={{ marginBottom: '12px' }}>
                        <div className="form-field">
                          <label>Спецификация 1: Название</label>
                          <input
                            type="text"
                            placeholder="Пусто = удалить карточку"
                            value={editableContent.about?.spec1Label || ''}
                            onChange={(e) => handleContentFieldChange('about', 'spec1Label', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Спецификация 1: Значение</label>
                          <input
                            type="text"
                            placeholder="Пусто = удалить карточку"
                            value={editableContent.about?.spec1Val || ''}
                            onChange={(e) => handleContentFieldChange('about', 'spec1Val', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                      </div>

                      <div className="form-grid-2" style={{ marginBottom: '12px' }}>
                        <div className="form-field">
                          <label>Спецификация 2: Название</label>
                          <input
                            type="text"
                            placeholder="Пусто = удалить карточку"
                            value={editableContent.about?.spec2Label || ''}
                            onChange={(e) => handleContentFieldChange('about', 'spec2Label', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Спецификация 2: Значение</label>
                          <input
                            type="text"
                            placeholder="Пусто = удалить карточку"
                            value={editableContent.about?.spec2Val || ''}
                            onChange={(e) => handleContentFieldChange('about', 'spec2Val', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                      </div>

                      <div className="form-grid-2" style={{ marginBottom: '12px' }}>
                        <div className="form-field">
                          <label>Спецификация 3: Название</label>
                          <input
                            type="text"
                            placeholder="Пусто = удалить карточку"
                            value={editableContent.about?.spec3Label || ''}
                            onChange={(e) => handleContentFieldChange('about', 'spec3Label', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Спецификация 3: Значение</label>
                          <input
                            type="text"
                            placeholder="Пусто = удалить карточку"
                            value={editableContent.about?.spec3Val || ''}
                            onChange={(e) => handleContentFieldChange('about', 'spec3Val', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                      </div>

                      <div className="form-grid-2" style={{ marginBottom: '12px' }}>
                        <div className="form-field">
                          <label>Спецификация 4: Название</label>
                          <input
                            type="text"
                            placeholder="Пусто = удалить карточку"
                            value={editableContent.about?.spec4Label || ''}
                            onChange={(e) => handleContentFieldChange('about', 'spec4Label', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Спецификация 4: Значение</label>
                          <input
                            type="text"
                            placeholder="Пусто = удалить карточку"
                            value={editableContent.about?.spec4Val || ''}
                            onChange={(e) => handleContentFieldChange('about', 'spec4Label', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="form-grid-2">
                        <div className="form-field">
                          <label>Заголовок секции навыков</label>
                          <input
                            type="text"
                            placeholder="Пусто = скрыть"
                            value={editableContent.about?.skillsHeading || ''}
                            onChange={(e) => handleContentFieldChange('about', 'skillsHeading', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Подзаголовок секции навыков</label>
                          <input
                            type="text"
                            placeholder="Пусто = скрыть"
                            value={editableContent.about?.skillsSub || ''}
                            onChange={(e) => handleContentFieldChange('about', 'skillsSub', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                      </div>

                      <div className="form-field" style={{ marginTop: '14px' }}>
                        <label>Заголовок блока принципов (Очистите оба поля, чтобы скрыть весь блок)</label>
                        <input
                          type="text"
                          placeholder="Пусто = скрыть весь блок"
                          value={editableContent.about?.principlesHeading || ''}
                          onChange={(e) => handleContentFieldChange('about', 'principlesHeading', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Текст принципов разработки</label>
                        <textarea
                          rows={3}
                          placeholder="Пусто = скрыть весь блок"
                          value={editableContent.about?.principlesText || ''}
                          onChange={(e) => handleContentFieldChange('about', 'principlesText', e.target.value)}
                          className="crow-textarea"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= CONTACT SECTION ================= */}
                {contentSection === 'contact' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Заголовок страницы Контакты</label>
                        <input
                          type="text"
                          placeholder="Пусто = скрыть"
                          value={editableContent.contact?.heading || ''}
                          onChange={(e) => handleContentFieldChange('contact', 'heading', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Подзаголовок страницы Контакты</label>
                        <input
                          type="text"
                          placeholder="Пусто = скрыть"
                          value={editableContent.contact?.subheading || ''}
                          onChange={(e) => handleContentFieldChange('contact', 'subheading', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Заголовок формы сообщения</label>
                        <input
                          type="text"
                          value={editableContent.contact?.formTitle || ''}
                          onChange={(e) => handleContentFieldChange('contact', 'formTitle', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Подзаголовок формы</label>
                        <input
                          type="text"
                          placeholder="Пусто = скрыть"
                          value={editableContent.contact?.formSub || ''}
                          onChange={(e) => handleContentFieldChange('contact', 'formSub', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Email (если очистить — карточка Email исчезнет)</label>
                        <input
                          type="text"
                          placeholder="Пусто = скрыть Email карточку"
                          value={editableContent.contact?.email || ''}
                          onChange={(e) => handleContentFieldChange('contact', 'email', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Telegram (если очистить — карточка Telegram исчезнет)</label>
                        <input
                          type="text"
                          placeholder="Пусто = скрыть Telegram карточку"
                          value={editableContent.contact?.telegram || ''}
                          onChange={(e) => handleContentFieldChange('contact', 'telegram', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Discord (если очистить — карточка Discord исчезнет)</label>
                        <input
                          type="text"
                          placeholder="Пусто = скрыть Discord карточку"
                          value={editableContent.contact?.discord || ''}
                          onChange={(e) => handleContentFieldChange('contact', 'discord', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>GitHub (если очистить — карточка GitHub исчезнет)</label>
                        <input
                          type="text"
                          placeholder="Пусто = скрыть GitHub карточку"
                          value={editableContent.contact?.github || ''}
                          onChange={(e) => handleContentFieldChange('contact', 'github', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label>Нижний текст карточки каналов (если очистить — рамка исчезнет)</label>
                      <textarea
                        rows={2}
                        placeholder="Пусто = скрыть плашку"
                        value={editableContent.contact?.directNotice || ''}
                        onChange={(e) => handleContentFieldChange('contact', 'directNotice', e.target.value)}
                        className="crow-textarea"
                      />
                    </div>
                  </div>
                )}

                {/* ================= FOOTER SECTION ================= */}
                {contentSection === 'footer' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-field">
                      <label>Текст бренда в футере</label>
                      <input
                        type="text"
                        value={editableContent.footer?.brandText || ''}
                        onChange={(e) => handleContentFieldChange('footer', 'brandText', e.target.value)}
                        className="crow-input"
                      />
                    </div>
                    <div className="form-field">
                      <label>Текст копирайта и подписи</label>
                      <textarea
                        rows={2}
                        value={editableContent.footer?.subText || ''}
                        onChange={(e) => handleContentFieldChange('footer', 'subText', e.target.value)}
                        className="crow-textarea"
                      />
                    </div>
                  </div>
                )}

                <div className="form-btn-actions" style={{ marginTop: '24px' }}>
                  <button type="submit" className="btn-demon-katana" style={{ padding: '14px 32px' }}>
                    <Save size={18} />
                    <span>Сохранить все изменения (Тексты & Картинки)</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= TAB 2: PROJECTS MANAGER ================= */}
          {adminTab === 'projects' && (
            <>
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
                        placeholder="Например: Веб-разработка, Telegram-боты, VR игры..."
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="crow-input"
                      />
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                        {[
                          'Веб-разработка',
                          'Telegram-боты',
                          'Игры Unreal & Unity',
                          'VR игры',
                          'Виртуальные туры & Фото 360',
                          'Arduino & Микроконтроллеры',
                          'Приложения & Сервисы'
                        ].map((catPreset) => (
                          <button
                            key={catPreset}
                            type="button"
                            onClick={() => setCategory(catPreset)}
                            className="filter-btn"
                            style={{
                              fontSize: '0.74rem',
                              padding: '3px 8px',
                              background: category === catPreset ? 'var(--neon-primary)' : 'rgba(255,255,255,0.05)',
                              color: category === catPreset ? '#000' : 'var(--text-muted)'
                            }}
                          >
                            {catPreset}
                          </button>
                        ))}
                      </div>
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
                      <button type="button" onClick={resetProjectForm} className="btn-neon-ghost">
                        Отмена
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Current Projects List */}
              <div className="admin-projects-list glass-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 className="list-title" style={{ margin: 0 }}>Опубликованные проекты ({projects.length})</h3>
                  <button onClick={handleResetProjects} className="btn-reset-ghost">
                    <RotateCcw size={15} />
                    <span>Сбросить проекты к базовым</span>
                  </button>
                </div>

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
                          onClick={() => handleEditProjectClick(p)}
                          className="action-icon-btn edit"
                          title="Редактировать проект"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProjectClick(p.id)}
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
            </>
          )}
        </div>
      )}
    </div>
  )
}
