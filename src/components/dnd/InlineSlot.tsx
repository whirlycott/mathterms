import { useDroppable } from '@dnd-kit/core'

interface Props {
  id: string
  displayTerm: string | null
  isCorrect: boolean
  isShaking: boolean
  accentColor: string
}

export function InlineSlot({ id, displayTerm, isCorrect, isShaking, accentColor }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id })

  const bg = isCorrect ? '#38A169' : isOver ? accentColor : '#fff'
  const border = isCorrect ? '#276749' : isOver ? accentColor : '#A0AEC0'
  const color = isCorrect || isOver ? '#fff' : '#718096'

  return (
    <span
      ref={setNodeRef}
      role="region"
      aria-label={`Drop zone${displayTerm ? ': ' + displayTerm : ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '80px',
        padding: '4px 12px',
        borderRadius: '20px',
        border: `2px dashed ${border}`,
        background: bg,
        color,
        fontSize: '12px',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        transition: 'background 0.2s, border-color 0.2s',
        animation: isShaking ? 'slotShake 0.5s ease' : undefined,
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {displayTerm ?? '?'}
    </span>
  )
}
