interface Props {
  correct: number
  total: number
  accentColor: string
}

export function RoomProgressBar({ correct, total, accentColor }: Props) {
  const pct = total > 0 ? (correct / total) * 100 : 0

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        flex: 1,
        height: '8px',
        background: 'rgba(0,0,0,0.1)',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          background: accentColor,
          borderRadius: '4px',
          transition: 'width 0.4s ease',
        }}/>
      </div>
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#4A5568', whiteSpace: 'nowrap' }}>
        {correct} / {total}
      </div>
    </div>
  )
}
