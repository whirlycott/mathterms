interface Props {
  displayTerm: string
}

export function DragOverlayLabel({ displayTerm }: Props) {
  return (
    <div style={{
      padding: '6px 12px',
      borderRadius: '20px',
      background: '#2C7A7B',
      color: '#FAF3E0',
      fontSize: '13px',
      fontWeight: 600,
      boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
      cursor: 'grabbing',
      whiteSpace: 'nowrap',
      userSelect: 'none',
    }}>
      {displayTerm}
    </div>
  )
}
