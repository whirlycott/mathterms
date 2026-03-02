import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from './gameStore'

// Reset store state before every test to avoid cross-test contamination.
// Zustand's getState/setState let us reach into the store directly.
beforeEach(() => {
  useGameStore.getState().resetProgress()
})

describe('initial state', () => {
  it('starts on the welcome screen', () => {
    expect(useGameStore.getState().screen).toBe('welcome')
  })

  it('has no active room', () => {
    expect(useGameStore.getState().activeRoomId).toBeNull()
  })

  it('has an empty player name', () => {
    expect(useGameStore.getState().playerName).toBe('')
  })

  it('has the default badge color', () => {
    expect(useGameStore.getState().badgeColor).toBe('#2C7A7B')
  })

  it('operations and division start as available', () => {
    const { rooms } = useGameStore.getState()
    expect(rooms.operations.status).toBe('available')
    expect(rooms.division.status).toBe('available')
  })

  it('fractions, decimals, properties, expressions, measurement, coordinates start as locked', () => {
    const { rooms } = useGameStore.getState()
    expect(rooms.fractions.status).toBe('locked')
    expect(rooms.decimals.status).toBe('locked')
    expect(rooms.properties.status).toBe('locked')
    expect(rooms.expressions.status).toBe('locked')
    expect(rooms.measurement.status).toBe('locked')
    expect(rooms.coordinates.status).toBe('locked')
  })

  it('all rooms start with empty correctSlots', () => {
    const { rooms } = useGameStore.getState()
    for (const room of Object.values(rooms)) {
      expect(room.correctSlots).toHaveLength(0)
    }
  })

  it('all rooms start with bonusAnswered = false', () => {
    const { rooms } = useGameStore.getState()
    for (const room of Object.values(rooms)) {
      expect(room.bonusAnswered).toBe(false)
    }
  })
})

describe('placeLabel', () => {
  it('adds the slot to correctSlots when isCorrect is true', () => {
    useGameStore.getState().placeLabel('operations', 'sum', 'sum', true)
    const room = useGameStore.getState().rooms.operations
    expect(room.correctSlots).toContain('sum')
  })

  it('sets status to in_progress on a correct placement', () => {
    useGameStore.getState().placeLabel('operations', 'sum', 'sum', true)
    expect(useGameStore.getState().rooms.operations.status).toBe('in_progress')
  })

  it('records the termId in filledSlots', () => {
    useGameStore.getState().placeLabel('operations', 'sum', 'sum', true)
    expect(useGameStore.getState().rooms.operations.filledSlots['sum']).toBe('sum')
  })

  it('does NOT add to correctSlots when isCorrect is false', () => {
    useGameStore.getState().placeLabel('operations', 'sum', 'difference', false)
    const room = useGameStore.getState().rooms.operations
    expect(room.correctSlots).not.toContain('sum')
  })

  it('does not affect other rooms', () => {
    useGameStore.getState().placeLabel('operations', 'sum', 'sum', true)
    const division = useGameStore.getState().rooms.division
    expect(division.correctSlots).toHaveLength(0)
  })
})

describe('removeLabel', () => {
  it('removes a slot from filledSlots', () => {
    useGameStore.getState().placeLabel('operations', 'sum', 'sum', true)
    useGameStore.getState().removeLabel('operations', 'sum')
    expect(useGameStore.getState().rooms.operations.filledSlots['sum']).toBeUndefined()
  })

  it('removes a slot from correctSlots', () => {
    useGameStore.getState().placeLabel('operations', 'sum', 'sum', true)
    useGameStore.getState().removeLabel('operations', 'sum')
    expect(useGameStore.getState().rooms.operations.correctSlots).not.toContain('sum')
  })
})

describe('completeRoom', () => {
  it('sets the room status to completed', () => {
    useGameStore.getState().completeRoom('operations')
    expect(useGameStore.getState().rooms.operations.status).toBe('completed')
  })

  it('unlocks dependent rooms after completing operations', () => {
    useGameStore.getState().completeRoom('operations')
    const { rooms } = useGameStore.getState()
    // fractions and decimals only need operations
    expect(rooms.fractions.status).toBe('available')
    expect(rooms.decimals.status).toBe('available')
  })

  it('does not unlock properties after only operations (division also required)', () => {
    useGameStore.getState().completeRoom('operations')
    expect(useGameStore.getState().rooms.properties.status).toBe('locked')
  })

  it('unlocks properties after both operations and division are completed', () => {
    useGameStore.getState().completeRoom('operations')
    useGameStore.getState().completeRoom('division')
    expect(useGameStore.getState().rooms.properties.status).toBe('available')
  })
})

describe('answerBonus', () => {
  it('sets bonusAnswered to true for the room', () => {
    useGameStore.getState().answerBonus('operations')
    expect(useGameStore.getState().rooms.operations.bonusAnswered).toBe(true)
  })

  it('does not affect other rooms', () => {
    useGameStore.getState().answerBonus('operations')
    expect(useGameStore.getState().rooms.division.bonusAnswered).toBe(false)
  })
})

describe('scrambleRoom', () => {
  it('sets room status to scrambled', () => {
    useGameStore.getState().completeRoom('operations')
    useGameStore.getState().scrambleRoom('operations')
    expect(useGameStore.getState().rooms.operations.status).toBe('scrambled')
  })

  it('clears correctSlots', () => {
    useGameStore.getState().placeLabel('operations', 'sum', 'sum', true)
    useGameStore.getState().scrambleRoom('operations')
    expect(useGameStore.getState().rooms.operations.correctSlots).toHaveLength(0)
  })

  it('clears filledSlots', () => {
    useGameStore.getState().placeLabel('operations', 'sum', 'sum', true)
    useGameStore.getState().scrambleRoom('operations')
    expect(useGameStore.getState().rooms.operations.filledSlots).toEqual({})
  })
})

describe('updateConfidence', () => {
  it('increments confidence by the given delta', () => {
    useGameStore.getState().updateConfidence('operations', 'sum', 1)
    expect(useGameStore.getState().rooms.operations.confidence['sum']).toBe(1)
  })

  it('starts from 0 when term has no entry yet', () => {
    useGameStore.getState().updateConfidence('operations', 'factor', 2)
    expect(useGameStore.getState().rooms.operations.confidence['factor']).toBe(2)
  })

  it('clamps at maximum value of 3', () => {
    useGameStore.getState().updateConfidence('operations', 'sum', 3)
    useGameStore.getState().updateConfidence('operations', 'sum', 2)
    expect(useGameStore.getState().rooms.operations.confidence['sum']).toBe(3)
  })

  it('clamps at minimum value of 0', () => {
    useGameStore.getState().updateConfidence('operations', 'sum', -5)
    expect(useGameStore.getState().rooms.operations.confidence['sum']).toBe(0)
  })

  it('decrements confidence by a negative delta', () => {
    useGameStore.getState().updateConfidence('operations', 'sum', 2)
    useGameStore.getState().updateConfidence('operations', 'sum', -1)
    expect(useGameStore.getState().rooms.operations.confidence['sum']).toBe(1)
  })
})

describe('setScreen', () => {
  it('updates the screen', () => {
    useGameStore.getState().setScreen('museum')
    expect(useGameStore.getState().screen).toBe('museum')
  })

  it('sets activeRoomId when provided', () => {
    useGameStore.getState().setScreen('room', 'operations')
    expect(useGameStore.getState().activeRoomId).toBe('operations')
  })

  it('clears activeRoomId when not provided', () => {
    useGameStore.getState().setScreen('room', 'operations')
    useGameStore.getState().setScreen('museum')
    expect(useGameStore.getState().activeRoomId).toBeNull()
  })
})

describe('setPlayerName', () => {
  it('updates the player name', () => {
    useGameStore.getState().setPlayerName('Alex')
    expect(useGameStore.getState().playerName).toBe('Alex')
  })
})

describe('setBadgeColor', () => {
  it('updates the badge color', () => {
    useGameStore.getState().setBadgeColor('#FF0000')
    expect(useGameStore.getState().badgeColor).toBe('#FF0000')
  })

  it('accepts a valid 6-digit hex color', () => {
    useGameStore.getState().setBadgeColor('#aB12cD')
    expect(useGameStore.getState().badgeColor).toBe('#aB12cD')
  })

  it('rejects an arbitrary CSS value and leaves the color unchanged', () => {
    const before = useGameStore.getState().badgeColor
    useGameStore.getState().setBadgeColor('url(evil)')
    expect(useGameStore.getState().badgeColor).toBe(before)
  })
})

describe('setMuted', () => {
  it('sets isMuted to true', () => {
    useGameStore.getState().setMuted(true)
    expect(useGameStore.getState().isMuted).toBe(true)
  })

  it('sets isMuted to false', () => {
    useGameStore.getState().setMuted(true)
    useGameStore.getState().setMuted(false)
    expect(useGameStore.getState().isMuted).toBe(false)
  })
})

describe('setErrBotVisible', () => {
  it('sets errBotVisible to true', () => {
    useGameStore.getState().setErrBotVisible(true)
    expect(useGameStore.getState().errBotVisible).toBe(true)
  })
})

describe('unlockDependentRooms', () => {
  it('unlocks rooms whose prerequisites are all completed', () => {
    // Manually complete operations in state then call unlock
    useGameStore.getState().completeRoom('operations')
    // fractions needs only operations → should be unlocked
    expect(useGameStore.getState().rooms.fractions.status).toBe('available')
  })

  it('does not unlock rooms whose prerequisites are only partially met', () => {
    useGameStore.getState().completeRoom('operations')
    // properties needs operations + division; division not complete
    expect(useGameStore.getState().rooms.properties.status).toBe('locked')
  })
})

describe('resetProgress', () => {
  it('resets screen to welcome', () => {
    useGameStore.getState().setScreen('museum')
    useGameStore.getState().resetProgress()
    expect(useGameStore.getState().screen).toBe('welcome')
  })

  it('clears player name', () => {
    useGameStore.getState().setPlayerName('Alex')
    useGameStore.getState().resetProgress()
    expect(useGameStore.getState().playerName).toBe('')
  })

  it('re-locks rooms that should be locked', () => {
    useGameStore.getState().completeRoom('operations')
    useGameStore.getState().resetProgress()
    expect(useGameStore.getState().rooms.fractions.status).toBe('locked')
  })

  it('resets operations back to available', () => {
    useGameStore.getState().completeRoom('operations')
    useGameStore.getState().resetProgress()
    expect(useGameStore.getState().rooms.operations.status).toBe('available')
  })
})
