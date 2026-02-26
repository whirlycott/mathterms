import { useState, useRef, useEffect } from 'react'
import { computeRank } from '../../utils/progressionUtils'
import { useGameStore } from '../../store/gameStore'

export function CuratorBadge() {
  const rooms = useGameStore(s => s.rooms)
  const playerName = useGameStore(s => s.playerName)
  const badgeColor = useGameStore(s => s.badgeColor)
  const resetProgress = useGameStore(s => s.resetProgress)
  const rank = computeRank(rooms)

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const handleReset = () => {
    setOpen(false)
    resetProgress()
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Curator profile menu"
        style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: badgeColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          color: '#fff',
          fontWeight: 700,
          border: '2px solid rgba(255,255,255,0.4)',
        }}>
          {playerName ? playerName[0].toUpperCase() : '?'}
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#FAF3E0' }}>
            {playerName || 'Curator'}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(250,243,224,0.8)' }}>
            {rank.title}
          </div>
        </div>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          background: '#fff',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          minWidth: '160px',
          zIndex: 200,
          overflow: 'hidden',
        }}>
          <button
            onClick={handleReset}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px 16px',
              background: 'none',
              border: 'none',
              textAlign: 'left',
              fontSize: '13px',
              color: '#E53E3E',
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#FFF5F5')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            Clear progress
          </button>
        </div>
      )}
    </div>
  )
}
