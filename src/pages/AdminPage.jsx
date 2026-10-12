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
  Sparkles
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
  const [contentSection, setContentSection] = useState('home')

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
      setErrorMsg('Неверный логин или пароль администратора. Проверьте введенные данные!')
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

  // Save all site content texts
  const handleSaveAllContent = (e) => {
    e.preventDefault()
    setSiteContent(editableContent)
    soundEngine.playFire()
    setSuccessToast('Все тексты сайта успешно сохранены и обновлены!')
    setTimeout(() => setSuccessToast(''), 3500)
  }

  // Reset all texts to defaults
  const handleResetContent = () => {
    if (window.confirm('Сбросить все тексты сайта к исходным значениям?')) {
      setEditableContent(DEFAULT_SITE_CONTENT)
      setSiteContent(DEFAULT_SITE_CONTENT)
      soundEngine.playWater()
      setSuccessToast('Тексты сброшены к значениям по умолчанию.')
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
        <h1 className="neon-section-heading">Админ-Панель & CMS DoomHex</h1>
        <p className="section-description">
          Полный контроль над сайтом: изменяйте каждый текст от точки до запятой и управляйте проектами портфолио.
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
          <h2 className="gate-title">Вход в Панель Управления</h2>
          <p className="gate-sub">Авторизация администратора DoomHex</p>

          <form onSubmit={handleLogin} className="gate-login-form">
            <div className="form-field">
              <label>Логин администратора</label>
              <input
                type="text"
                required
                placeholder="doomhexadmin"
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
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={() => {
                  setAdminTab('content')
                  soundEngine.playClick()
                }}
                className={`filter-btn ${adminTab === 'content' ? 'active' : ''}`}
                style={{ padding: '8px 16px', display: 'flex', gap: '6px', alignItems: 'center' }}
              >
                <FileText size={16} />
                <span>Редактор Текстов Сайта (CMS)</span>
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

          {/* ================= TAB 1: TEXT CMS ================= */}
          {adminTab === 'content' && (
            <div className="admin-form-panel glass-panel">
              <div className="panel-title-row" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={22} className="plus-icon" />
                  <div>
                    <h3>Редактор Текстов Сайта</h3>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                      Изменяйте абсолютно любые надписи, заголовки, описания и метрики
                    </div>
                  </div>
                </div>

                <button onClick={handleResetContent} className="btn-reset-ghost">
                  <RotateCcw size={15} />
                  <span>Сбросить тексты к базовым</span>
                </button>
              </div>

              {/* Sub-tabs for Pages */}
              <div style={{ display: 'flex', gap: '8px', margin: '20px 0 24px 0', flexWrap: 'wrap' }}>
                {[
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
                {/* Home Page Texts */}
                {contentSection === 'home' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Статус-бейдж (в самом верху Hero)</label>
                        <input
                          type="text"
                          value={editableContent.home?.badgeText || ''}
                          onChange={(e) => handleContentFieldChange('home', 'badgeText', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Текст темы (справа от бейджа)</label>
                        <input
                          type="text"
                          value={editableContent.home?.tagText || ''}
                          onChange={(e) => handleContentFieldChange('home', 'tagText', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Надзаголовок (Маленький текст над именем)</label>
                        <input
                          type="text"
                          value={editableContent.home?.preTitle || ''}
                          onChange={(e) => handleContentFieldChange('home', 'preTitle', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Главный заголовок (Имя/Бренд)</label>
                        <input
                          type="text"
                          value={editableContent.home?.mainTitle || ''}
                          onChange={(e) => handleContentFieldChange('home', 'mainTitle', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label>Главное описание в Hero</label>
                      <textarea
                        rows={3}
                        value={editableContent.home?.description || ''}
                        onChange={(e) => handleContentFieldChange('home', 'description', e.target.value)}
                        className="crow-textarea"
                      />
                    </div>

                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Текст первой кнопки (Проекты)</label>
                        <input
                          type="text"
                          value={editableContent.home?.projectsBtnText || ''}
                          onChange={(e) => handleContentFieldChange('home', 'projectsBtnText', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Текст второй кнопки (Связаться)</label>
                        <input
                          type="text"
                          value={editableContent.home?.contactBtnText || ''}
                          onChange={(e) => handleContentFieldChange('home', 'contactBtnText', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div style={{ marginTop: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <h4 style={{ color: 'var(--neon-accent)', marginBottom: '14px' }}>Блоки статистики (3 карточки)</h4>

                      <div className="form-grid-2" style={{ marginBottom: '14px' }}>
                        <div className="form-field">
                          <label>Статистика 1: Число/Значение</label>
                          <input
                            type="text"
                            value={editableContent.home?.stat1Value || ''}
                            onChange={(e) => handleContentFieldChange('home', 'stat1Value', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Статистика 1: Заголовок</label>
                          <input
                            type="text"
                            value={editableContent.home?.stat1Title || ''}
                            onChange={(e) => handleContentFieldChange('home', 'stat1Title', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                      </div>
                      <div className="form-field" style={{ marginBottom: '16px' }}>
                        <label>Статистика 1: Описание</label>
                        <input
                          type="text"
                          value={editableContent.home?.stat1Desc || ''}
                          onChange={(e) => handleContentFieldChange('home', 'stat1Desc', e.target.value)}
                          className="crow-input"
                        />
                      </div>

                      <div className="form-grid-2" style={{ marginBottom: '14px' }}>
                        <div className="form-field">
                          <label>Статистика 2: Число/Значение</label>
                          <input
                            type="text"
                            value={editableContent.home?.stat2Value || ''}
                            onChange={(e) => handleContentFieldChange('home', 'stat2Value', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Статистика 2: Заголовок</label>
                          <input
                            type="text"
                            value={editableContent.home?.stat2Title || ''}
                            onChange={(e) => handleContentFieldChange('home', 'stat2Title', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                      </div>
                      <div className="form-field" style={{ marginBottom: '16px' }}>
                        <label>Статистика 2: Описание</label>
                        <input
                          type="text"
                          value={editableContent.home?.stat2Desc || ''}
                          onChange={(e) => handleContentFieldChange('home', 'stat2Desc', e.target.value)}
                          className="crow-input"
                        />
                      </div>

                      <div className="form-grid-2" style={{ marginBottom: '14px' }}>
                        <div className="form-field">
                          <label>Статистика 3: Число/Значение</label>
                          <input
                            type="text"
                            value={editableContent.home?.stat3Value || ''}
                            onChange={(e) => handleContentFieldChange('home', 'stat3Value', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Статистика 3: Заголовок</label>
                          <input
                            type="text"
                            value={editableContent.home?.stat3Title || ''}
                            onChange={(e) => handleContentFieldChange('home', 'stat3Title', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                      </div>
                      <div className="form-field">
                        <label>Статистика 3: Описание</label>
                        <input
                          type="text"
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
                            value={editableContent.home?.featuredHeading || ''}
                            onChange={(e) => handleContentFieldChange('home', 'featuredHeading', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Подзаголовок секции Избранных Проектов</label>
                          <input
                            type="text"
                            value={editableContent.home?.featuredSub || ''}
                            onChange={(e) => handleContentFieldChange('home', 'featuredSub', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* About Page Texts */}
                {contentSection === 'about' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Имя в профиле</label>
                        <input
                          type="text"
                          value={editableContent.about?.name || ''}
                          onChange={(e) => handleContentFieldChange('about', 'name', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Бейдж 1 (Слева)</label>
                        <input
                          type="text"
                          value={editableContent.about?.badge1 || ''}
                          onChange={(e) => handleContentFieldChange('about', 'badge1', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label>Бейдж 2 (Справа)</label>
                      <input
                        type="text"
                        value={editableContent.about?.badge2 || ''}
                        onChange={(e) => handleContentFieldChange('about', 'badge2', e.target.value)}
                        className="crow-input"
                      />
                    </div>

                    <div className="form-field">
                      <label>Текст биографии и опыта (Bio)</label>
                      <textarea
                        rows={4}
                        value={editableContent.about?.bio || ''}
                        onChange={(e) => handleContentFieldChange('about', 'bio', e.target.value)}
                        className="crow-textarea"
                      />
                    </div>

                    <div style={{ marginTop: '10px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <h4 style={{ color: 'var(--neon-accent)', marginBottom: '14px' }}>Спецификации разработчика (4 карточки)</h4>
                      
                      <div className="form-grid-2" style={{ marginBottom: '12px' }}>
                        <div className="form-field">
                          <label>Спецификация 1: Название</label>
                          <input
                            type="text"
                            value={editableContent.about?.spec1Label || ''}
                            onChange={(e) => handleContentFieldChange('about', 'spec1Label', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Спецификация 1: Значение</label>
                          <input
                            type="text"
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
                            value={editableContent.about?.spec2Label || ''}
                            onChange={(e) => handleContentFieldChange('about', 'spec2Label', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Спецификация 2: Значение</label>
                          <input
                            type="text"
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
                            value={editableContent.about?.spec3Label || ''}
                            onChange={(e) => handleContentFieldChange('about', 'spec3Label', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Спецификация 3: Значение</label>
                          <input
                            type="text"
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
                            value={editableContent.about?.spec4Label || ''}
                            onChange={(e) => handleContentFieldChange('about', 'spec4Label', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Спецификация 4: Значение</label>
                          <input
                            type="text"
                            value={editableContent.about?.spec4Val || ''}
                            onChange={(e) => handleContentFieldChange('about', 'spec4Val', e.target.value)}
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
                            value={editableContent.about?.skillsHeading || ''}
                            onChange={(e) => handleContentFieldChange('about', 'skillsHeading', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                        <div className="form-field">
                          <label>Подзаголовок секции навыков</label>
                          <input
                            type="text"
                            value={editableContent.about?.skillsSub || ''}
                            onChange={(e) => handleContentFieldChange('about', 'skillsSub', e.target.value)}
                            className="crow-input"
                          />
                        </div>
                      </div>

                      <div className="form-field" style={{ marginTop: '14px' }}>
                        <label>Заголовок блока принципов</label>
                        <input
                          type="text"
                          value={editableContent.about?.principlesHeading || ''}
                          onChange={(e) => handleContentFieldChange('about', 'principlesHeading', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Текст принципов разработки</label>
                        <textarea
                          rows={3}
                          value={editableContent.about?.principlesText || ''}
                          onChange={(e) => handleContentFieldChange('about', 'principlesText', e.target.value)}
                          className="crow-textarea"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Page Texts */}
                {contentSection === 'contact' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Заголовок страницы Контакты</label>
                        <input
                          type="text"
                          value={editableContent.contact?.heading || ''}
                          onChange={(e) => handleContentFieldChange('contact', 'heading', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Подзаголовок страницы Контакты</label>
                        <input
                          type="text"
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
                          value={editableContent.contact?.formSub || ''}
                          onChange={(e) => handleContentFieldChange('contact', 'formSub', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Email для связи</label>
                        <input
                          type="text"
                          value={editableContent.contact?.email || ''}
                          onChange={(e) => handleContentFieldChange('contact', 'email', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>Telegram</label>
                        <input
                          type="text"
                          value={editableContent.contact?.telegram || ''}
                          onChange={(e) => handleContentFieldChange('contact', 'telegram', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-field">
                        <label>Discord</label>
                        <input
                          type="text"
                          value={editableContent.contact?.discord || ''}
                          onChange={(e) => handleContentFieldChange('contact', 'discord', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                      <div className="form-field">
                        <label>GitHub ссылка/никнейм</label>
                        <input
                          type="text"
                          value={editableContent.contact?.github || ''}
                          onChange={(e) => handleContentFieldChange('contact', 'github', e.target.value)}
                          className="crow-input"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label>Нижний текст карточки каналов</label>
                      <textarea
                        rows={2}
                        value={editableContent.contact?.directNotice || ''}
                        onChange={(e) => handleContentFieldChange('contact', 'directNotice', e.target.value)}
                        className="crow-textarea"
                      />
                    </div>
                  </div>
                )}

                {/* Footer Texts */}
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
                    <span>Сохранить все тексты сайта</span>
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
                      <button type="button" onClick={resetProjectForm} className="btn-neon-ghost">
                        Отмена
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Current Projects List */}
              <div className="admin-projects-list glass-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
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
