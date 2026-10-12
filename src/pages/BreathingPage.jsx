import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import {
  Flame,
  Droplets,
  Zap,
  Moon,
  Swords,
  Sparkles
} from 'lucide-react'
import { soundEngine } from '../audio'

export default function BreathingPage({ onSlash, setBreathing }) {
  const [activeTechnique, setActiveTechnique] = useState(null)

  const techniques = [
    {
      id: 'water-1',
      breathing: 'water',
      styleName: 'Дыхание Воды (Water Breathing)',
      form: 'Первый стиль: Рассекающая водная гладь',
      kanji: '壱ノ型 水面斬り',
      desc: 'Горизонтальный разрез клинком с мягкой волной света и лазурными всплесками.',
      color: '#38bdf8',
      icon: <Droplets size={22} />,
      sound: () => {
        soundEngine.playWater()
        setTimeout(() => soundEngine.playSlash(), 90)
      }
    },
    {
      id: 'water-10',
      breathing: 'water',
      styleName: 'Дыхание Воды (Water Breathing)',
      form: 'Десятый стиль: Дракон Перемен',
      kanji: '拾ノ型 生生流転',
      desc: 'Серия круговых движений клинком с нарастающей скоростью и мощным аквамариновым свечением.',
      color: '#0284c7',
      icon: <Droplets size={22} />,
      sound: () => {
        soundEngine.playWater()
        setTimeout(() => soundEngine.playSlash(), 120)
      }
    },
    {
      id: 'sun-1',
      breathing: 'sun',
      styleName: 'Танец Бога Огня (Hinokami Kagura)',
      form: 'Стиль Солнца: Вальс Огня',
      kanji: '壱ノ型 円舞 (Enbu)',
      desc: 'Огненная рубящая дуга с багровым неоновым следом и эффектом раскаленного лезвия.',
      color: '#ef4444',
      icon: <Flame size={22} />,
      sound: () => {
        soundEngine.playFire()
        setTimeout(() => soundEngine.playSlash(), 100)
      }
    },
    {
      id: 'sun-dragon',
      breathing: 'sun',
      styleName: 'Танец Бога Огня (Hinokami Kagura)',
      form: 'Стиль Солнца: Солнечный Нимб Дракона',
      kanji: '日暈の龍 頭舞い',
      desc: 'Стремительный огненный танец с яркими солнечными искрами и вспышкой пламени.',
      color: '#f97316',
      icon: <Flame size={22} />,
      sound: () => {
        soundEngine.playFire()
        setTimeout(() => soundEngine.playSlash(), 70)
      }
    },
    {
      id: 'thunder-1',
      breathing: 'thunder',
      styleName: 'Дыхание Грома (Thunder Breathing)',
      form: 'Первый стиль: Громовой раскат и молния',
      kanji: '壱ノ型 霹靂一閃',
      desc: 'Сверхзвуковой рывок с резким обнажением катаны, электрическим треском и вспышкой молнии.',
      color: '#facc15',
      icon: <Zap size={22} />,
      sound: () => {
        soundEngine.playThunder()
        setTimeout(() => soundEngine.playSlash(), 80)
      }
    },
    {
      id: 'moon-6',
      breathing: 'moon',
      styleName: 'Дыхание Луны (Moon Breathing)',
      form: 'Стиль Луны: Одинокая ночная луна',
      kanji: '陸ノ型 常夜孤月',
      desc: 'Поток серповидных лунных лезвий темного неона с кружащимися лепестками сакуры.',
      color: '#c084fc',
      icon: <Moon size={22} />,
      sound: () => {
        soundEngine.playSlash()
        setTimeout(() => soundEngine.playSlash(), 180)
      }
    }
  ]

  const handleUnleash = (t) => {
    setActiveTechnique(t.id)
    setBreathing(t.breathing)
    t.sound()

    if (onSlash) {
      onSlash(`${t.kanji} — ${t.form.toUpperCase()}`)
    }

    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.5 },
      colors: [t.color, '#ffffff', '#1e293b']
    })

    setTimeout(() => {
      setActiveTechnique(null)
    }, 2200)
  }

  return (
    <div className="page-container breathing-page">
      <div className="section-title-wrap">
        <div className="section-kanji-tag">ИНТЕРАКТИВНЫЕ ЭФФЕКТЫ</div>
        <h1 className="neon-section-heading">Аниме-Лаборатория: Клинок & Элементы</h1>
        <p className="section-description">
          Интерактивная песочница анимаций в стилистике «Клинок, рассекающий демонов». 
          Выберите форму и нажмите «Протестировать удар», чтобы активировать звуки стали, неоновые вспышки и смену темы!
        </p>
      </div>

      <div className="techniques-grid">
        {techniques.map((t) => (
          <div
            key={t.id}
            className={`technique-card glass-panel ${activeTechnique === t.id ? 'active-technique-glow' : ''}`}
            style={{ '--tech-glow': t.color }}
          >
            <div className="tech-header">
              <div className="tech-icon-box" style={{ color: t.color, borderColor: t.color }}>
                {t.icon}
              </div>
              <div className="tech-kanji-stamp">{t.kanji}</div>
            </div>

            <div className="tech-style-label" style={{ color: t.color }}>
              {t.styleName}
            </div>
            <h2 className="tech-form-title">{t.form}</h2>
            <p className="tech-desc">{t.desc}</p>

            <button
              onClick={() => handleUnleash(t)}
              className="btn-unleash-tech"
              style={{
                '--hover-bg': t.color
              }}
            >
              <Swords size={18} />
              <span>{activeTechnique === t.id ? 'ЭФФЕКТ АКТИВИРОВАН!' : 'Протестировать удар'}</span>
              <Sparkles size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
