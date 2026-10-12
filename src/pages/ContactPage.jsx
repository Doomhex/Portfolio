import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import {
  Send,
  Mail,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  ShieldCheck
} from 'lucide-react'
import GithubIcon from '../components/GithubIcon'
import { soundEngine } from '../audio'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [dispatched, setDispatched] = useState(false)
  const [copiedKey, setCopiedKey] = useState('')

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text)
    soundEngine.playClick()
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(''), 2500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.email || !formData.message) return

    soundEngine.playClick()
    setDispatched(true)

    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#c084fc', '#38bdf8', '#facc15', '#ffffff']
    })

    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setDispatched(false)
    }, 4000)
  }

  return (
    <div className="page-container contact-page">
      <div className="section-title-wrap">
        <div className="section-kanji-tag">СВЯЗЬ И СОТРУДНИЧЕСТВО</div>
        <h1 className="neon-section-heading">Контакты & Обратная Связь</h1>
        <p className="section-description">
          Обсудить проект, предложить задачу или задать вопрос. Напишите сообщение через форму или напрямую в мессенджеры.
        </p>
      </div>

      <div className="contact-crow-layout">
        {/* Contact Form */}
        <div className="crow-form-card glass-panel">
          <div className="crow-scroll-header">
            <div className="scroll-icon-wrap">
              <Mail size={22} />
            </div>
            <div>
              <h2 className="crow-card-title">Отправить сообщение</h2>
              <p className="crow-card-sub">Заполните форму, и я отвечу вам в ближайшее время</p>
            </div>
          </div>

          {dispatched ? (
            <div className="crow-sent-state">
              <Check size={48} style={{ color: '#34d399', margin: '0 auto 12px auto' }} />
              <h3>Сообщение успешно отправлено!</h3>
              <p>Спасибо за обращение. Я свяжусь с вами по указанному адресу электронной почты.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="crow-messenger-form">
              <div className="form-field">
                <label>Ваше имя</label>
                <input
                  type="text"
                  placeholder="Как к вам обращаться?"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="crow-input"
                />
              </div>

              <div className="form-field">
                <label>Ваш Email для ответа *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="crow-input"
                />
              </div>

              <div className="form-field">
                <label>Текст сообщения / Детали проекта *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Расскажите о вашей задаче, идее, сроках или стеке..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="crow-textarea"
                />
              </div>

              <button type="submit" className="btn-demon-katana full-width">
                <Send size={18} />
                <span>Отправить сообщение</span>
              </button>
            </form>
          )}
        </div>

        {/* Direct Channels */}
        <div className="direct-channels-card glass-panel">
          <div className="channels-header">
            <ShieldCheck size={24} className="shield-icon" />
            <h3 className="channels-title">Прямые каналы связи</h3>
          </div>

          <div className="channels-list">
            <div className="channel-box">
              <div className="ch-info">
                <span className="ch-label">Email:</span>
                <span className="ch-val">doomhex@slayer.dev</span>
              </div>
              <button
                onClick={() => handleCopy('email', 'doomhex@slayer.dev')}
                className="ch-copy-btn"
              >
                {copiedKey === 'email' ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiedKey === 'email' ? 'Скопировано!' : 'Копировать'}</span>
              </button>
            </div>

            <div className="channel-box">
              <div className="ch-info">
                <span className="ch-label">GitHub Профиль:</span>
                <span className="ch-val">github.com/Doomhex</span>
              </div>
              <a
                href="https://github.com/Doomhex"
                target="_blank"
                rel="noreferrer"
                className="ch-link-btn"
                onClick={() => soundEngine.playClick()}
              >
                <GithubIcon size={16} />
                <span>Перейти</span>
              </a>
            </div>

            <div className="channel-box">
              <div className="ch-info">
                <span className="ch-label">Telegram:</span>
                <span className="ch-val">@DoomHex</span>
              </div>
              <button
                onClick={() => handleCopy('tg', '@DoomHex')}
                className="ch-copy-btn"
              >
                {copiedKey === 'tg' ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiedKey === 'tg' ? 'Скопировано!' : 'Копировать'}</span>
              </button>
            </div>

            <div className="channel-box">
              <div className="ch-info">
                <span className="ch-label">Discord:</span>
                <span className="ch-val">doomhex#1337</span>
              </div>
              <button
                onClick={() => handleCopy('discord', 'doomhex#1337')}
                className="ch-copy-btn"
              >
                {copiedKey === 'discord' ? <Check size={16} /> : <Copy size={16} />}
                <span>{copiedKey === 'discord' ? 'Скопировано!' : 'Копировать'}</span>
              </button>
            </div>
          </div>

          <div className="sanctum-stamp-box">
            <Sparkles size={24} style={{ color: 'var(--neon-primary)', flexShrink: 0 }} />
            <p className="sanctum-stamp-text">
              Открыт для интересных проектов, разработки новых интерфейсов и предложений о сотрудничестве.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
