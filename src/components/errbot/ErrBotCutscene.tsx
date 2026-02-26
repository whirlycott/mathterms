import { useEffect, useState } from 'react'
import { ErrBotAvatar } from './ErrBotAvatar'
import { useAudio } from '../../hooks/useAudio'

interface Props {
  roomTitle: string
  onComplete: () => void
}

const MESSAGES = [
  'BWAHAHAHA! I\'ve scrambled your labels AGAIN!',
  'You thought you were done? Think again, Curator!',
  'Re-label this exhibit if you dare! BZZT!',
]

export function ErrBotCutscene({ roomTitle, onComplete }: Props) {
  const [msgIdx, setMsgIdx] = useState(0)
  const { playGlitch } = useAudio()

  useEffect(() => {
    playGlitch()
    const interval = setInterval(() => {
      setMsgIdx(i => {
        if (i + 1 >= MESSAGES.length) {
          clearInterval(interval)
          setTimeout(onComplete, 800)
        }
        return Math.min(i + 1, MESSAGES.length - 1)
      })
    }, 1800)
    return () => clearInterval(interval)
  }, [playGlitch, onComplete])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(229,62,62,0.92)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      gap: '24px',
    }}>
      <ErrBotAvatar size={120} glitching />
      <div style={{
        color: '#fff',
        fontFamily: 'Georgia, serif',
        fontSize: '22px',
        fontWeight: 700,
        textAlign: 'center',
        maxWidth: '420px',
        lineHeight: 1.4,
        textShadow: '0 2px 8px rgba(0,0,0,0.5)',
      }}>
        {MESSAGES[msgIdx]}
      </div>
      <div style={{
        color: 'rgba(255,255,255,0.7)',
        fontSize: '14px',
      }}>
        {roomTitle} has been scrambled!
      </div>
    </div>
  )
}
