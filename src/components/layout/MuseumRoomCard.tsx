import { RoomDefinition, RoomState } from '../../types'

interface Props {
  room: RoomDefinition
  roomState: RoomState
  onClick: () => void
}

export function MuseumRoomCard({ room, roomState, onClick }: Props) {
  const { status } = roomState
  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'
  const isScrambled = status === 'scrambled'
  const isAvailable = status === 'available' || status === 'in_progress'

  const correct = roomState.correctSlots.length
  const total = room.slots.length

  let borderStyle = `2px solid ${room.accentColor}`
  let bg = '#fff'
  let opacity = 1

  if (isLocked) { bg = '#F0F0F0'; borderStyle = '2px solid #CBD5E0'; opacity = 0.6 }
  if (isCompleted) { bg = '#F0FFF4'; borderStyle = `2px solid #38A169` }
  if (isScrambled) { bg = '#FFF5F5'; borderStyle = '2px solid #E53E3E' }

  return (
    <div
      onClick={isLocked ? undefined : onClick}
      role={isLocked ? 'presentation' : 'button'}
      tabIndex={isLocked ? -1 : 0}
      onKeyDown={e => { if (!isLocked && (e.key === 'Enter' || e.key === ' ')) onClick() }}
      aria-label={`${room.title} — ${status}`}
      style={{
        background: bg,
        border: borderStyle,
        borderRadius: '12px',
        padding: '16px',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        opacity,
        transition: 'transform 0.15s, box-shadow 0.15s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => { if (!isLocked) (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
    >
      {/* Accent bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '4px',
        background: isLocked ? '#CBD5E0' : isScrambled ? '#E53E3E' : room.accentColor,
      }}/>

      <div style={{ marginTop: '4px' }}>
        {/* Status badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: isLocked ? '#A0AEC0' : isCompleted ? '#38A169' : isScrambled ? '#E53E3E' : room.accentColor,
          }}>
            {isLocked ? '🔒 Locked' : isCompleted ? '✓ Restored' : isScrambled ? '⚠ Scrambled' : status === 'in_progress' ? '◐ In Progress' : 'Available'}
          </span>
        </div>

        <div style={{ fontSize: '15px', fontWeight: 700, color: '#2D3748', fontFamily: 'Georgia, serif', marginBottom: '4px' }}>
          {room.title}
        </div>
        <div style={{ fontSize: '12px', color: '#718096', marginBottom: '10px' }}>
          {room.subtitle}
        </div>

        {/* Progress bar */}
        {isAvailable && (
          <div style={{ height: '4px', background: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              width: `${total > 0 ? (correct / total) * 100 : 0}%`,
              height: '100%',
              background: room.accentColor,
              transition: 'width 0.4s ease',
            }}/>
          </div>
        )}
        {(isCompleted || isScrambled) && (
          <div style={{ fontSize: '11px', color: isCompleted ? '#38A169' : '#E53E3E', fontWeight: 600 }}>
            {isCompleted ? `${total}/${total} labels restored` : 'Re-label to fix!'}
          </div>
        )}
        {isLocked && (
          <div style={{ fontSize: '11px', color: '#A0AEC0' }}>
            Complete prerequisites first
          </div>
        )}
      </div>
    </div>
  )
}
