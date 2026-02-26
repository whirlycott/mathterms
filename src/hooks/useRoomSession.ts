import { useState, useCallback } from 'react'
import { RoomId } from '../types'
import { useGameStore } from '../store/gameStore'
import { getRoomById } from '../data/rooms'

export function useRoomSession(roomId: RoomId) {
  const [shakingSlot, setShakingSlot] = useState<string | null>(null)
  const [hintTermId, setHintTermId] = useState<string | null>(null)

  const placeLabel = useGameStore(s => s.placeLabel)
  const removeLabel = useGameStore(s => s.removeLabel)
  const completeRoom = useGameStore(s => s.completeRoom)
  const updateConfidence = useGameStore(s => s.updateConfidence)
  const roomState = useGameStore(s => s.rooms[roomId])
  const room = getRoomById(roomId)!

  const handleDrop = useCallback((slotId: string, termId: string, isCorrect: boolean) => {
    if (isCorrect) {
      placeLabel(roomId, slotId, termId, true)
      updateConfidence(roomId, termId, 1)
      setHintTermId(null)

      // Check if all slots are now correct
      const totalSlots = room.slots.length
      const newCorrect = (roomState.correctSlots.length) + 1
      if (newCorrect >= totalSlots) {
        completeRoom(roomId)
      }
    } else {
      setShakingSlot(slotId)
      setHintTermId(termId)
      updateConfidence(roomId, termId, -1)
      setTimeout(() => setShakingSlot(null), 600)
    }
  }, [roomId, placeLabel, removeLabel, completeRoom, updateConfidence, roomState.correctSlots.length, room.slots.length])

  return {
    roomState,
    shakingSlot,
    hintTermId,
    setHintTermId,
    handleDrop,
  }
}
