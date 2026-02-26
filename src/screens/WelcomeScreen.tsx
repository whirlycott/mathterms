import { useState } from 'react'
import { useGameStore } from '../store/gameStore'

const BADGE_COLORS = [
  '#2C7A7B', '#7B2D3E', '#C9A84C', '#805AD5',
  '#38A169', '#DD6B20', '#3182CE', '#553C9A',
]

export function WelcomeScreen() {
  const setPlayerName = useGameStore(s => s.setPlayerName)
  const setBadgeColor = useGameStore(s => s.setBadgeColor)
  const setScreen = useGameStore(s => s.setScreen)
  const storedName = useGameStore(s => s.playerName)
  const storedColor = useGameStore(s => s.badgeColor)

  const [name, setName] = useState(storedName)
  const [color, setColor] = useState(storedColor)

  const handleStart = () => {
    if (!name.trim()) return
    setPlayerName(name.trim())
    setBadgeColor(color)
    setScreen('museum')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2C7A7B 0%, #1a4a4a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    }}>
      <div style={{
        background: '#FAF3E0',
        borderRadius: '20px',
        padding: '40px 36px',
        maxWidth: '440px',
        width: '100%',
        boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
        border: '3px solid #C9A84C',
        textAlign: 'center',
      }}>
        {/* Museum logo */}
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏛️</div>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '28px',
          color: '#2C7A7B',
          margin: '0 0 4px',
        }}>
          The Lexicon Lab
        </h1>
        <p style={{ color: '#7B2D3E', fontStyle: 'italic', margin: '0 0 28px', fontSize: '14px' }}>
          Math Vocabulary Museum
        </p>

        <p style={{ fontSize: '14px', color: '#4A5568', lineHeight: 1.6, marginBottom: '28px', textAlign: 'left' }}>
          ERR-0R, the rogue robot, has scrambled all the labels in the Math Museum!
          As the new <strong>Curator</strong>, you must restore all 8 exhibit rooms
          by dragging labels back to their correct positions.
        </p>

        {/* Name input */}
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Your Curator Name
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleStart() }}
            placeholder="Enter your name..."
            maxLength={24}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '2px solid #C9A84C',
              background: '#FFFDF7',
              fontSize: '15px',
              color: '#2D3748',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Badge color */}
        <div style={{ textAlign: 'left', marginBottom: '28px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#4A5568', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Curator Badge Color
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {BADGE_COLORS.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                aria-label={`Select badge color ${c}`}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: c,
                  border: color === c ? '3px solid #2D3748' : '3px solid transparent',
                  cursor: 'pointer',
                  outline: color === c ? '2px solid #C9A84C' : 'none',
                  outlineOffset: '2px',
                }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={!name.trim()}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '10px',
            background: name.trim() ? '#2C7A7B' : '#CBD5E0',
            color: '#fff',
            fontWeight: 700,
            fontSize: '16px',
            border: 'none',
            cursor: name.trim() ? 'pointer' : 'not-allowed',
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.04em',
          }}
        >
          Enter the Museum →
        </button>
      </div>
    </div>
  )
}
