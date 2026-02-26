import { ErrBotAvatar } from './ErrBotAvatar'

interface Props {
  message: string
  onDismiss?: () => void
}

export function ErrBotSpeechBubble({ message, onDismiss }: Props) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      background: '#FFF5F5',
      border: '2px solid #FC8181',
      borderRadius: '12px',
      padding: '12px',
    }}>
      <ErrBotAvatar size={40} glitching />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#E53E3E', marginBottom: '4px' }}>
          ERR-0R says:
        </div>
        <div style={{ fontSize: '13px', color: '#742A2A', lineHeight: 1.4 }}>
          {message}
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FC8181', fontSize: '16px' }}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  )
}
