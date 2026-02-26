import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface Props {
  id: string
  displayTerm: string
  disabled?: boolean
}

export function DraggableLabel({ id, displayTerm, disabled }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled,
  })

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    cursor: disabled ? 'default' : 'grab',
    touchAction: 'none',
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '20px',
    background: '#2C7A7B',
    color: '#FAF3E0',
    fontSize: '13px',
    fontWeight: 600,
    userSelect: 'none',
    boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
    whiteSpace: 'nowrap',
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {displayTerm}
    </div>
  )
}
