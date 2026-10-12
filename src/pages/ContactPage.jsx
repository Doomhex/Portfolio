import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import {
  Send,
  Mail,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Feather
} from 'lucide-react'
import GithubIcon from '../components/GithubIcon'
import { soundEngine } from '../audio'

export default function ContactPage() {
  const [formData, setFormData] = useState({ sender: '', email: '', message: '' })
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

    soundEngine.playSlash()
    setDispatched(true)

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#c084fc', '#38bdf8', '#facc15', '#ffffff']
    })

    setTimeout(() => {
      setFormData({ sender: '', email: '', message: '' })
      setDispatched(false)
    }, 4500)
  }

  return (
    <div className="page-container contact-page">
      <div className="section-title-wrap">
        <div className="section-kanji-tag">鎹鴉・伝令</div>
        <h1 className="neon-section-heading">Ворон Уз: Связь со Столпом</h1>
        <p className="section-description">
          Отправьте срочное послание через Ворона уз (Kasugai Crow) или свяжитесь с DoomHex в защищенных каналах связи.
        </p>
      </div>

      <div className="contact-crow-layout">
        {/* Left Scroll Form */}
        <div className="crow-form-card glass-panel">
          <div className="crow-scroll-header">
            <div className="scroll-icon-wrap">
              <Feather size={22} />
            </div>
            <div>
              <h2 className="crow-card-title">Свиток Поручения</h2>
              <p className="crow-card-sub">Напишите о проекте, предложении или коллаборации</p>
            </div>
          </div>

          {dispatched ? (
            <div className="crow-sent-state">
              <div className="crow-stamp-kanji">受領</div>
              <h3>Послание отправлено Вороном!</h3>
              <p>Ворон уже вылетел в поместье Столпа DoomHex. Ответ прибудет со скоростью звука!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="crow-messenger-form">
              <div className="form-field">
                <label>Ваше Имя / Позывной в Корпусе</label>
                <input
                  type="text"
                  placeholder="Например: Тандзиро Камадо или Имя"
                  value={formData.sender}
                  onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                  className="crow-input"
                />
              </div>

              <div className="form-field">
                <label>Ваш Email для ответа *</label>
                <input
                  type="email"
                  required
                  placeholder="contact@yourdomain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="crow-input"
                />
              </div>

              <div className="form-field">
                <label>Суть свитка / Описание задачи *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Опишите ваш проект, стек, сроки или тему сотрудничества..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="crow-textarea"
                />
              </div>

              <button type="submit" className="btn-demon-katana full-width">
                <Send size={18} />
                <span>Отправить Ворона уз</span>
                <span className="kanji-btn-mark">飛</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Direct Channels */}
        <div className="direct-channels-card glass-panel">
          <div className="channels-header">
            <ShieldCheck size={24} className="shield-icon" />
            <h3 className="channels-title">Прямые Каналы Доступа</h3>
          </div>

          <div className="channels-list">
            <div className="channel-box">
              <div className="ch-info">
                <span className="ch-label">Email Столпа:</span>
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
                <span>Открыть</span>
              </a>
            </div>

            <div className="channel-box">
              <div className="ch-info">
                <span className="ch-label">Telegram Канал:</span>
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
                <span className="ch-label">Discord Святилища:</span>
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
            <div className="sanctum-stamp-kanji">隠</div>
            <p className="sanctum-stamp-text">
              Все каналы защищены специальными глифами и печатью Корпуса. Сообщения обрабатываются ежедневно.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
