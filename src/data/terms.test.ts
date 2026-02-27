import { describe, it, expect } from 'vitest'
import { ALL_TERMS, getTermById, getTermsByRoom } from './terms'

describe('ALL_TERMS', () => {
  it('has 72 terms', () => {
    expect(ALL_TERMS).toHaveLength(72)
  })

  it('every term has the required fields', () => {
    for (const term of ALL_TERMS) {
      expect(term.id).toBeTruthy()
      expect(typeof term.id).toBe('string')
      expect(term.displayTerm).toBeTruthy()
      expect(typeof term.displayTerm).toBe('string')
      expect(term.definition).toBeTruthy()
      expect(typeof term.definition).toBe('string')
      expect(term.roomId).toBeTruthy()
      expect(typeof term.roomId).toBe('string')
    }
  })

  it('every term id is a lowercase slug with no spaces', () => {
    for (const term of ALL_TERMS) {
      expect(term.id).toMatch(/^[a-z0-9-]+$/)
    }
  })

  it('has no duplicate ids', () => {
    const ids = ALL_TERMS.map(t => t.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('assigns every term to a known room', () => {
    const validRooms = new Set([
      'operations', 'division', 'fractions', 'decimals',
      'properties', 'expressions', 'measurement', 'coordinates',
    ])
    for (const term of ALL_TERMS) {
      expect(validRooms.has(term.roomId)).toBe(true)
    }
  })
})

describe('getTermById', () => {
  it('returns the correct term for a valid id', () => {
    const term = getTermById('sum')
    expect(term).toBeDefined()
    expect(term!.id).toBe('sum')
    expect(term!.displayTerm).toBe('Sum')
    expect(term!.roomId).toBe('operations')
  })

  it('returns undefined for an unknown id', () => {
    expect(getTermById('nonexistent-term')).toBeUndefined()
  })
})

describe('getTermsByRoom', () => {
  it('returns only terms belonging to the given room', () => {
    const opTerms = getTermsByRoom('operations')
    for (const term of opTerms) {
      expect(term.roomId).toBe('operations')
    }
  })

  it('returns 11 terms for operations room', () => {
    expect(getTermsByRoom('operations')).toHaveLength(11)
  })

  it('returns an empty array for an unknown room', () => {
    expect(getTermsByRoom('unknown-room')).toHaveLength(0)
  })
})
