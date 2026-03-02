import { RoomDefinition, BonusQuestion as BonusQuestionType } from '../../types'
import { BonusQuestion } from './BonusQuestion'
import { useGameStore } from '../../store/gameStore'
import { useConfetti } from '../../hooks/useConfetti'
import { useEffect } from 'react'

interface Props {
  room: RoomDefinition
  bonusQuestion: BonusQuestionType
  onClose: () => void
}

export function CompletionModal({ room, bonusQuestion, onClose }: Props) {
  const answerBonus = useGameStore(s => s.answerBonus)
  const bonusAnswered = useGameStore(s => s.rooms[room.id].bonusAnswered)
  const { burst } = useConfetti()

  useEffect(() => {
    burst()
  }, [burst])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px',
    }}>
      <div style={{
        background: '#FAF3E0',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        border: `3px solid ${room.accentColor}`,
      }}>
        {/* Badge */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: room.accentColor,
            margin: '0 auto 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
          }}>
            🏛️
          </div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2D3748', fontFamily: 'Georgia, serif' }}>
            Exhibit Restored!
          </div>
          <div style={{ fontSize: '14px', color: '#718096', marginTop: '4px' }}>
            {room.title} is now fully labeled.
          </div>
        </div>

        {/* Bonus question */}
        {!bonusAnswered && (
          <div style={{
            background: '#F5ECD7',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
            border: '1px solid #C9A84C',
          }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#7B2D3E', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Bonus Challenge
            </div>
            <BonusQuestion
              question={bonusQuestion}
              onAnswer={() => answerBonus(room.id)}
            />
          </div>
        )}

        {bonusAnswered && (
          <div style={{ textAlign: 'center', marginBottom: '20px', color: '#38A169', fontWeight: 600 }}>
            Bonus question answered!
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '10px',
            background: room.accentColor,
            color: '#fff',
            fontWeight: 700,
            fontSize: '15px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Back to Museum
        </button>
      </div>
    </div>
  )
}
