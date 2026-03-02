import { useMemo } from 'react'
import { RoomId } from '../types'
import { ExhibitNumbers, generateExhibitNumbers } from '../utils/exhibitNumbers'

/**
 * Generates randomized exhibit numbers for a room visit.
 * The seed is created once per mount (Date.now()), so numbers stay
 * stable during the visit but change on each new visit.
 */
export function useExhibitNumbers(roomId: RoomId): ExhibitNumbers | null {
  return useMemo(
    () => generateExhibitNumbers(roomId, Date.now()),
    [roomId],
  )
}
