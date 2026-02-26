import { RoomId, RoomStatus, GameState } from '../types'
import { ROOMS } from '../data/rooms'

export interface RankInfo {
  title: string
  level: number
}

export function computeRank(rooms: GameState['rooms']): RankInfo {
  const completed = Object.values(rooms).filter(r => r.status === 'completed' || r.status === 'scrambled').length
  if (completed >= 8) return { title: 'Museum Director', level: 5 }
  if (completed >= 6) return { title: 'Lead Curator', level: 4 }
  if (completed >= 4) return { title: 'Senior Curator', level: 3 }
  if (completed >= 2) return { title: 'Associate Curator', level: 2 }
  return { title: 'Junior Curator', level: 1 }
}

export function isRoomUnlocked(roomId: RoomId, rooms: GameState['rooms']): boolean {
  const room = ROOMS.find(r => r.id === roomId)
  if (!room) return false
  return room.unlockAfter.every(prereq => {
    const status: RoomStatus = rooms[prereq].status
    return status === 'completed' || status === 'scrambled'
  })
}

export function getLowestConfidenceRoom(rooms: GameState['rooms']): RoomId | null {
  const completed = Object.entries(rooms)
    .filter(([, rs]) => rs.status === 'completed')
    .map(([id, rs]) => {
      const confidence = Object.values(rs.confidence)
      const avg = confidence.length > 0
        ? confidence.reduce((a, b) => a + b, 0) / confidence.length
        : 0
      return { id: id as RoomId, avg }
    })
  if (completed.length === 0) return null
  return completed.sort((a, b) => a.avg - b.avg)[0].id
}
