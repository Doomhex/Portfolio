import React from 'react'

export default function SlashOverlay({ active, techniqueName, breathing = 'sun' }) {
  if (!active) return null

  const getSlashColor = () => {
    switch (breathing) {
      case 'water': return '#38bdf8'
      case 'thunder': return '#facc15'
      case 'moon': return '#c084fc'
      case 'sun':
      default: return '#f97316'
    }
  }

  return (
    <div className="slash-overlay-container">
      <div 
        className="katana-slash-blade" 
        style={{ '--slash-glow': getSlashColor() }}
      />
      {techniqueName && (
        <div className="slash-technique-callout">
          <div className="kanji-seal">滅</div>
          <div className="technique-text">{techniqueName}</div>
        </div>
      )}
    </div>
  )
}
