import React from 'react'
import { CuratorBadge } from '../ui/CuratorBadge'
import { MuteButton } from '../ui/MuteButton'
import { useGameStore } from '../../store/gameStore'

interface Props {
  children: React.ReactNode
  title?: string
  onBack?: () => void
}

export function AppShell({ children, title, onBack }: Props) {
  const screen = useGameStore(s => s.screen)

  return (
    <div style={{ minHeight: '100vh', background: '#FAF3E0', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <header style={{
        background: '#2C7A7B',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Back to museum"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              color: '#FAF3E0',
              fontSize: '18px',
              cursor: 'pointer',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ←
          </button>
        )}
        <div style={{ fontFamily: 'Georgia, serif', color: '#FAF3E0', fontWeight: 700, fontSize: '18px', flex: 1 }}>
          {title ?? 'The Lexicon Lab'}
        </div>
        {screen !== 'welcome' && <CuratorBadge />}
        <MuteButton />
      </header>

      {/* Main content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
    </div>
  )
}
