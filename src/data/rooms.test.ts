import { describe, it, expect } from 'vitest'
import { ROOMS, getRoomById } from './rooms'

describe('ROOMS', () => {
  it('has exactly 8 rooms', () => {
    expect(ROOMS).toHaveLength(8)
  })

  it('contains the expected room ids in order', () => {
    const ids = ROOMS.map(r => r.id)
    expect(ids).toEqual([
      'operations',
      'division',
      'fractions',
      'decimals',
      'properties',
      'expressions',
      'measurement',
      'coordinates',
    ])
  })

  it('every room has a non-empty slots array', () => {
    for (const room of ROOMS) {
      expect(room.slots.length).toBeGreaterThan(0)
    }
  })

  it('every room has a bonusQuestion with question, options, and correctIndex', () => {
    for (const room of ROOMS) {
      expect(room.bonusQuestion).toBeDefined()
      expect(room.bonusQuestion.question).toBeTruthy()
      expect(Array.isArray(room.bonusQuestion.options)).toBe(true)
      expect(room.bonusQuestion.options.length).toBeGreaterThan(0)
      expect(typeof room.bonusQuestion.correctIndex).toBe('number')
    }
  })

  it('every bonusQuestion correctIndex is within the options array bounds', () => {
    for (const room of ROOMS) {
      const { correctIndex, options } = room.bonusQuestion
      expect(correctIndex).toBeGreaterThanOrEqual(0)
      expect(correctIndex).toBeLessThan(options.length)
    }
  })

  it('every room has a title, subtitle, and accentColor', () => {
    for (const room of ROOMS) {
      expect(room.title).toBeTruthy()
      expect(room.subtitle).toBeTruthy()
      expect(room.accentColor).toMatch(/^#[0-9A-Fa-f]{6}$/)
    }
  })

  it('operations and division start with no unlock requirements', () => {
    const operations = ROOMS.find(r => r.id === 'operations')!
    const division = ROOMS.find(r => r.id === 'division')!
    expect(operations.unlockAfter).toHaveLength(0)
    expect(division.unlockAfter).toHaveLength(0)
  })

  it('fractions and decimals require operations', () => {
    const fractions = ROOMS.find(r => r.id === 'fractions')!
    const decimals = ROOMS.find(r => r.id === 'decimals')!
    expect(fractions.unlockAfter).toContain('operations')
    expect(decimals.unlockAfter).toContain('operations')
  })

  it('properties requires both operations and division', () => {
    const properties = ROOMS.find(r => r.id === 'properties')!
    expect(properties.unlockAfter).toContain('operations')
    expect(properties.unlockAfter).toContain('division')
  })

  it('expressions requires properties', () => {
    const expressions = ROOMS.find(r => r.id === 'expressions')!
    expect(expressions.unlockAfter).toContain('properties')
  })

  it('measurement requires fractions and decimals', () => {
    const measurement = ROOMS.find(r => r.id === 'measurement')!
    expect(measurement.unlockAfter).toContain('fractions')
    expect(measurement.unlockAfter).toContain('decimals')
  })

  it('coordinates requires measurement', () => {
    const coordinates = ROOMS.find(r => r.id === 'coordinates')!
    expect(coordinates.unlockAfter).toContain('measurement')
  })

  it('every slot has an id, top, left, and width', () => {
    for (const room of ROOMS) {
      for (const slot of room.slots) {
        expect(slot.id).toBeTruthy()
        expect(slot.top).toMatch(/%$/)
        expect(slot.left).toMatch(/%$/)
        expect(slot.width).toMatch(/px$/)
      }
    }
  })
})

describe('getRoomById', () => {
  it('returns the correct room for a valid id', () => {
    const room = getRoomById('operations')
    expect(room).toBeDefined()
    expect(room!.id).toBe('operations')
  })

  it('returns undefined for an unknown id', () => {
    expect(getRoomById('unknown-room')).toBeUndefined()
  })
})
