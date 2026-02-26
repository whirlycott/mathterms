import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GameState, RoomId, RoomState, RoomStatus } from '../types'
import { ROOMS } from '../data/rooms'

function makeInitialRoomState(roomId: RoomId): RoomState {
  const room = ROOMS.find(r => r.id === roomId)!
  const unlocked = room.unlockAfter.length === 0
  return {
    status: unlocked ? 'available' : 'locked',
    filledSlots: {},
    correctSlots: [],
    bonusAnswered: false,
    confidence: {},
  }
}

function makeInitialRooms(): Record<RoomId, RoomState> {
  return {
    operations:   makeInitialRoomState('operations'),
    division:     makeInitialRoomState('division'),
    fractions:    makeInitialRoomState('fractions'),
    decimals:     makeInitialRoomState('decimals'),
    properties:   makeInitialRoomState('properties'),
    expressions:  makeInitialRoomState('expressions'),
    measurement:  makeInitialRoomState('measurement'),
    coordinates:  makeInitialRoomState('coordinates'),
  }
}

interface Actions {
  placeLabel: (roomId: RoomId, slotId: string, termId: string, isCorrect: boolean) => void
  removeLabel: (roomId: RoomId, slotId: string) => void
  completeRoom: (roomId: RoomId) => void
  answerBonus: (roomId: RoomId) => void
  scrambleRoom: (roomId: RoomId) => void
  setScreen: (screen: GameState['screen'], roomId?: RoomId) => void
  setMuted: (v: boolean) => void
  updateConfidence: (roomId: RoomId, termId: string, delta: number) => void
  setPlayerName: (name: string) => void
  setBadgeColor: (color: string) => void
  setErrBotVisible: (v: boolean) => void
  unlockDependentRooms: (completedRoomId: RoomId) => void
  resetProgress: () => void
}

type Store = GameState & Actions

export const useGameStore = create<Store>()(
  persist(
    (set, get) => ({
      screen: 'welcome',
      activeRoomId: null,
      playerName: '',
      badgeColor: '#2C7A7B',
      isMuted: false,
      rooms: makeInitialRooms(),
      errBotVisible: false,

      placeLabel: (roomId, slotId, termId, isCorrect) => {
        set(state => {
          const room = { ...state.rooms[roomId] }
          room.filledSlots = { ...room.filledSlots, [slotId]: termId }
          if (isCorrect) {
            room.correctSlots = [...room.correctSlots, slotId]
            room.status = 'in_progress'
          }
          return { rooms: { ...state.rooms, [roomId]: room } }
        })
      },

      removeLabel: (roomId, slotId) => {
        set(state => {
          const room = { ...state.rooms[roomId] }
          const filled = { ...room.filledSlots }
          delete filled[slotId]
          room.filledSlots = filled
          room.correctSlots = room.correctSlots.filter(id => id !== slotId)
          return { rooms: { ...state.rooms, [roomId]: room } }
        })
      },

      completeRoom: (roomId) => {
        set(state => {
          const room = { ...state.rooms[roomId], status: 'completed' as RoomStatus }
          const rooms = { ...state.rooms, [roomId]: room }
          return { rooms }
        })
        get().unlockDependentRooms(roomId)
      },

      answerBonus: (roomId) => {
        set(state => {
          const room = { ...state.rooms[roomId], bonusAnswered: true }
          return { rooms: { ...state.rooms, [roomId]: room } }
        })
      },

      scrambleRoom: (roomId) => {
        set(state => {
          const room: RoomState = {
            ...state.rooms[roomId],
            status: 'scrambled',
            filledSlots: {},
            correctSlots: [],
          }
          return { rooms: { ...state.rooms, [roomId]: room } }
        })
      },

      setScreen: (screen, roomId) => {
        set({ screen, activeRoomId: roomId ?? null })
      },

      setMuted: (v) => set({ isMuted: v }),

      updateConfidence: (roomId, termId, delta) => {
        set(state => {
          const room = { ...state.rooms[roomId] }
          const prev = room.confidence[termId] ?? 0
          room.confidence = { ...room.confidence, [termId]: Math.max(0, Math.min(3, prev + delta)) }
          return { rooms: { ...state.rooms, [roomId]: room } }
        })
      },

      setPlayerName: (name) => set({ playerName: name }),
      setBadgeColor: (color) => set({ badgeColor: color }),
      setErrBotVisible: (v) => set({ errBotVisible: v }),

      resetProgress: () => set({
        screen: 'welcome',
        activeRoomId: null,
        playerName: '',
        badgeColor: '#2C7A7B',
        rooms: makeInitialRooms(),
        errBotVisible: false,
      }),

      unlockDependentRooms: (completedRoomId) => {
        set(state => {
          const completedRooms = Object.entries(state.rooms)
            .filter(([, rs]) => rs.status === 'completed')
            .map(([id]) => id as RoomId)
          // Include the just-completed room
          const allCompleted = completedRooms.includes(completedRoomId)
            ? completedRooms
            : [...completedRooms, completedRoomId]

          const rooms = { ...state.rooms }
          for (const room of ROOMS) {
            if (rooms[room.id].status === 'locked') {
              const prereqsMet = room.unlockAfter.every(prereq => allCompleted.includes(prereq))
              if (prereqsMet) {
                rooms[room.id] = { ...rooms[room.id], status: 'available' }
              }
            }
          }
          return { rooms }
        })
      },
    }),
    { name: 'lexicon-lab-v1' }
  )
)
