import { describe, it, expect } from 'vitest'
import { computeRank, isRoomUnlocked, getLowestConfidenceRoom } from './progressionUtils'
import { GameState, RoomId, RoomState } from '../types'

function makeRoomState(status: RoomState['status'], confidence: Record<string, number> = {}): RoomState {
  return {
    status,
    filledSlots: {},
    correctSlots: [],
    bonusAnswered: false,
    confidence,
  }
}

function makeRooms(overrides: Partial<Record<RoomId, RoomState>> = {}): GameState['rooms'] {
  const defaults: Record<RoomId, RoomState> = {
    operations:  makeRoomState('available'),
    division:    makeRoomState('available'),
    fractions:   makeRoomState('locked'),
    decimals:    makeRoomState('locked'),
    properties:  makeRoomState('locked'),
    expressions: makeRoomState('locked'),
    measurement: makeRoomState('locked'),
    coordinates: makeRoomState('locked'),
  }
  return { ...defaults, ...overrides }
}

describe('computeRank', () => {
  it('returns Junior Curator when no rooms are completed', () => {
    const rank = computeRank(makeRooms())
    expect(rank.title).toBe('Junior Curator')
    expect(rank.level).toBe(1)
  })

  it('returns Associate Curator when 2 rooms are completed', () => {
    const rank = computeRank(makeRooms({
      operations: makeRoomState('completed'),
      division:   makeRoomState('completed'),
    }))
    expect(rank.title).toBe('Associate Curator')
    expect(rank.level).toBe(2)
  })

  it('returns Senior Curator when 4 rooms are completed', () => {
    const rank = computeRank(makeRooms({
      operations: makeRoomState('completed'),
      division:   makeRoomState('completed'),
      fractions:  makeRoomState('completed'),
      decimals:   makeRoomState('completed'),
    }))
    expect(rank.title).toBe('Senior Curator')
    expect(rank.level).toBe(3)
  })

  it('returns Lead Curator when 6 rooms are completed', () => {
    const rank = computeRank(makeRooms({
      operations:  makeRoomState('completed'),
      division:    makeRoomState('completed'),
      fractions:   makeRoomState('completed'),
      decimals:    makeRoomState('completed'),
      properties:  makeRoomState('completed'),
      expressions: makeRoomState('completed'),
    }))
    expect(rank.title).toBe('Lead Curator')
    expect(rank.level).toBe(4)
  })

  it('returns Museum Director when all 8 rooms are completed', () => {
    const rank = computeRank(makeRooms({
      operations:  makeRoomState('completed'),
      division:    makeRoomState('completed'),
      fractions:   makeRoomState('completed'),
      decimals:    makeRoomState('completed'),
      properties:  makeRoomState('completed'),
      expressions: makeRoomState('completed'),
      measurement: makeRoomState('completed'),
      coordinates: makeRoomState('completed'),
    }))
    expect(rank.title).toBe('Museum Director')
    expect(rank.level).toBe(5)
  })

  it('counts scrambled rooms toward completion for rank', () => {
    // scrambled rooms still count toward the rank threshold
    const rank = computeRank(makeRooms({
      operations: makeRoomState('completed'),
      division:   makeRoomState('scrambled'),
    }))
    expect(rank.level).toBe(2)
  })
})

describe('isRoomUnlocked', () => {
  it('returns true for operations (no prerequisites)', () => {
    expect(isRoomUnlocked('operations', makeRooms())).toBe(true)
  })

  it('returns true for division (no prerequisites)', () => {
    expect(isRoomUnlocked('division', makeRooms())).toBe(true)
  })

  it('returns false for fractions when operations is not completed', () => {
    expect(isRoomUnlocked('fractions', makeRooms())).toBe(false)
  })

  it('returns true for fractions when operations is completed', () => {
    const rooms = makeRooms({ operations: makeRoomState('completed') })
    expect(isRoomUnlocked('fractions', rooms)).toBe(true)
  })

  it('returns true for fractions when operations is scrambled', () => {
    const rooms = makeRooms({ operations: makeRoomState('scrambled') })
    expect(isRoomUnlocked('fractions', rooms)).toBe(true)
  })

  it('returns false for properties when only operations is completed', () => {
    const rooms = makeRooms({ operations: makeRoomState('completed') })
    expect(isRoomUnlocked('properties', rooms)).toBe(false)
  })

  it('returns true for properties when both operations and division are completed', () => {
    const rooms = makeRooms({
      operations: makeRoomState('completed'),
      division:   makeRoomState('completed'),
    })
    expect(isRoomUnlocked('properties', rooms)).toBe(true)
  })

  it('returns false for coordinates when measurement is not completed', () => {
    const rooms = makeRooms({
      operations: makeRoomState('completed'),
      division:   makeRoomState('completed'),
      fractions:  makeRoomState('completed'),
      decimals:   makeRoomState('completed'),
      // measurement still locked
    })
    expect(isRoomUnlocked('coordinates', rooms)).toBe(false)
  })

  it('returns false for an unknown room id', () => {
    expect(isRoomUnlocked('unknown' as RoomId, makeRooms())).toBe(false)
  })
})

describe('getLowestConfidenceRoom', () => {
  it('returns null when no rooms are completed', () => {
    expect(getLowestConfidenceRoom(makeRooms())).toBeNull()
  })

  it('returns the only completed room when there is one', () => {
    const rooms = makeRooms({
      operations: makeRoomState('completed', { sum: 2 }),
    })
    expect(getLowestConfidenceRoom(rooms)).toBe('operations')
  })

  it('returns the room with the lower average confidence', () => {
    const rooms = makeRooms({
      operations: makeRoomState('completed', { sum: 3, difference: 3 }),
      division:   makeRoomState('completed', { dividend: 1, divisor: 1 }),
    })
    // division avg = 1, operations avg = 3 → division is lowest
    expect(getLowestConfidenceRoom(rooms)).toBe('division')
  })

  it('treats a room with no confidence entries as avg 0 (lowest possible)', () => {
    const rooms = makeRooms({
      operations: makeRoomState('completed', { sum: 2 }),
      division:   makeRoomState('completed'),  // empty confidence → avg 0
    })
    expect(getLowestConfidenceRoom(rooms)).toBe('division')
  })

  it('does not include scrambled rooms', () => {
    const rooms = makeRooms({
      operations: makeRoomState('scrambled', { sum: 0 }),
      division:   makeRoomState('completed', { dividend: 3 }),
    })
    // Only division is 'completed'; operations is scrambled and excluded
    expect(getLowestConfidenceRoom(rooms)).toBe('division')
  })
})
