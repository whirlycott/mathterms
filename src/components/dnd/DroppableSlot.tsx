import { useDroppable } from '@dnd-kit/core'
import { SlotDefinition } from '../../types'

interface Props {
  slot: SlotDefinition
  filledWith: string | null  // display term text
  isCorrect: boolean
  isShaking: boolean
  accentColor: string
}

export function DroppableSlot({ slot, filledWith, isCorrect, isShaking, accentColor }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: slot.id })

  const bg = isCorrect
    ? '#38A169'
    : isOver
    ? accentColor
    : filledWith
    ? '#C9A84C'
    : 'rgba(255,255,255,0.85)'

  const borderColor = isCorrect
    ? '#276749'
    : isOver
    ? accentColor
    : '#CBD5E0'

  const shakeStyle = isShaking ? {
    animation: 'slotShake 0.5s ease',
  } : {}

  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'absolute',
        top: slot.top,
        left: slot.left,
        width: slot.width,
        minHeight: '32px',
        border: `2px dashed ${borderColor}`,
        borderRadius: '16px',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px 8px',
        fontSize: '12px',
        fontWeight: 600,
        color: isCorrect ? '#fff' : '#2D3748',
        transition: 'background 0.2s, border-color 0.2s',
        zIndex: 10,
        ...shakeStyle,
      }}
      aria-label={slot.label}
      role="region"
    >
      {filledWith ?? slot.label}
    </div>
  )
}
