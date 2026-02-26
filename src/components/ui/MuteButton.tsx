import { useGameStore } from '../../store/gameStore'

export function MuteButton() {
  const isMuted = useGameStore(s => s.isMuted)
  const setMuted = useGameStore(s => s.setMuted)

  return (
    <button
      onClick={() => setMuted(!isMuted)}
      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      title={isMuted ? 'Unmute' : 'Mute'}
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
      {isMuted ? '🔇' : '🔊'}
    </button>
  )
}
