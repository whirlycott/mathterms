import { AppShell } from '../components/layout/AppShell'
import { MuseumRoomCard } from '../components/layout/MuseumRoomCard'
import { useGameStore } from '../store/gameStore'
import { ROOMS } from '../data/rooms'
import { RoomId } from '../types'
import { computeRank } from '../utils/progressionUtils'

export function MuseumScreen() {
  const rooms = useGameStore(s => s.rooms)
  const setScreen = useGameStore(s => s.setScreen)
  const rank = computeRank(rooms)

  const completedCount = Object.values(rooms).filter(r => r.status === 'completed' || r.status === 'scrambled').length

  return (
    <AppShell title="The Lexicon Lab — Museum Map">
      <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        {/* Rank banner */}
        <div style={{
          background: '#2C7A7B',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          color: '#FAF3E0',
        }}>
          <div style={{ fontSize: '28px' }}>🏛️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700 }}>
              Museum Map
            </div>
            <div style={{ fontSize: '13px', opacity: 0.85 }}>
              {completedCount} of 8 exhibits restored · Current rank: <strong>{rank.title}</strong>
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '20px',
            padding: '4px 12px',
            fontSize: '12px',
            fontWeight: 600,
          }}>
            {completedCount}/8
          </div>
        </div>

        {/* Room grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '16px',
        }}>
          {ROOMS.map(room => (
            <MuseumRoomCard
              key={room.id}
              room={room}
              roomState={rooms[room.id]}
              onClick={() => setScreen('room', room.id as RoomId)}
            />
          ))}
        </div>

        {completedCount === 8 && (
          <div style={{
            marginTop: '24px',
            background: '#F0FFF4',
            border: '2px solid #38A169',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎓</div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#276749', fontWeight: 700 }}>
              Museum Fully Restored!
            </div>
            <div style={{ fontSize: '14px', color: '#4A5568', marginTop: '4px' }}>
              You have achieved the rank of Museum Director.
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
