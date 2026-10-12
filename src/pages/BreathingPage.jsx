import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import {
  Flame,
  Droplets,
  Zap,
  Moon,
  Swords,
  Sparkles,
  ShieldAlert
} from 'lucide-react'
import { soundEngine } from '../audio'

export default function BreathingPage({ onSlash, setBreathing }) {
  const [activeTechnique, setActiveTechnique] = useState(null)

  const techniques = [
    {
      id: 'water-1',
      breathing: 'water',
      styleName: 'Дыхание Воды (水の呼吸)',
      form: 'Первый стиль: Рассекающая водная гладь',
      kanji: '壱ノ型 水面斬り',
      desc: 'Молниеносный горизонтальный разрез клинком, сопровождающийся бурлящим водным потоком и чистым рассечением багов.',
      color: '#38bdf8',
      icon: <Droplets size={22} />,
      sound: () => {
        soundEngine.playWater()
        setTimeout(() => soundEngine.playSlash(), 100)
      }
    },
    {
      id: 'water-10',
      breathing: 'water',
      styleName: 'Дыхание Воды (水の呼吸)',
      form: 'Десятый стиль: Дракон Перемен',
      kanji: '拾ノ型 生生流転',
      desc: 'Непрерывная серия круговых ударов, набирающая мощь с каждым оборотом и превращающаяся в гигантского водяного дракона.',
      color: '#0284c7',
      icon: <Droplets size={22} />,
      sound: () => {
        soundEngine.playWater()
        setTimeout(() => soundEngine.playSlash(), 150)
      }
    },
    {
      id: 'sun-1',
      breathing: 'sun',
      styleName: 'Танец Бога Огня (ヒノカミ神楽)',
      form: 'Первый стиль: Вальс Огня',
      kanji: '壱ノ型 円舞 (Enbu)',
      desc: 'Одиночный рубящий удар в форме огненной дуги, испепеляющий любые архитектурные несовершенства и тормозящий код.',
      color: '#ef4444',
      icon: <Flame size={22} />,
      sound: () => {
        soundEngine.playFire()
        setTimeout(() => soundEngine.playSlash(), 120)
      }
    },
    {
      id: 'sun-dragon',
      breathing: 'sun',
      styleName: 'Танец Бога Огня (ヒノカミ神楽)',
      form: 'Стиль Солнца: Солнечный Нимб Дракона',
      kanji: '日暈の龍 頭舞い',
      desc: 'Быстрый танец с пылающим клинком в форме огненного солнечного дракона, очищающий всю кодовую базу в один миг.',
      color: '#f97316',
      icon: <Flame size={22} />,
      sound: () => {
        soundEngine.playFire()
        setTimeout(() => soundEngine.playSlash(), 80)
      }
    },
    {
      id: 'thunder-1',
      breathing: 'thunder',
      styleName: 'Дыхание Грома (雷の呼吸)',
      form: 'Первый стиль: Громовой раскат и молния (Шесть ударов)',
      kanji: '壱ノ型 霹靂一閃・六連',
      desc: 'Молниеносный рывок вперед на сверхзвуковой скорости с мгновенным обнажением клинка Нитирин и ослепляющей вспышкой.',
      color: '#facc15',
      icon: <Zap size={22} />,
      sound: () => {
        soundEngine.playThunder()
        setTimeout(() => soundEngine.playSlash(), 90)
      }
    },
    {
      id: 'moon-6',
      breathing: 'moon',
      styleName: 'Дыхание Луны (月の呼吸)',
      form: 'Шестой стиль: Одинокая ночная луна',
      kanji: '陸ノ型 常夜孤月・無間',
      desc: 'Поток бесконечных серповидных лунных лезвий темного неона, разрезающих пространство и защищающих границы системы.',
      color: '#c084fc',
      icon: <Moon size={22} />,
      sound: () => {
        soundEngine.playSlash()
        setTimeout(() => soundEngine.playSlash(), 200)
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

    // Spark confetti tailored to breathing color
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.5 },
      colors: [t.color, '#ffffff', '#111827']
    })

    setTimeout(() => {
      setActiveTechnique(null)
    }, 2500)
  }

  return (
    <div className="page-container breathing-page">
      <div className="section-title-wrap">
        <div className="section-kanji-tag">呼吸法・型</div>
        <h1 className="neon-section-heading">Зал Техник & Ката Симулятора</h1>
        <p className="section-description">
          Интерактивный тренажер стилей дыхания. Выберите технику и нажмите «Применить форму», чтобы активировать звуковой и визуальный эффект рассечения!
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
              <span>{activeTechnique === t.id ? 'ТЕХНИКА ВЫПОЛНЕНА!' : 'Применить форму'}</span>
              <Sparkles size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
