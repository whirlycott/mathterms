import { useState, useCallback } from 'react'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { AppShell } from '../components/layout/AppShell'
import { ExhibitWrapper } from '../components/exhibits/ExhibitWrapper'
import { LabelPool } from '../components/dnd/LabelPool'
import { DragOverlayLabel } from '../components/dnd/DragOverlayLabel'
import { RoomProgressBar } from '../components/ui/RoomProgressBar'
import { CompletionModal } from '../components/modals/CompletionModal'
import { OnboardingOverlay } from '../components/ui/OnboardingOverlay'
import { useGameStore } from '../store/gameStore'
import { useRoomSession } from '../hooks/useRoomSession'
import { useAudio } from '../hooks/useAudio'
import { useExhibitNumbers } from '../hooks/useExhibitNumbers'
import { getRoomById } from '../data/rooms'
import { getTermsByRoom, getTermById } from '../data/terms'
import { getBonusQuestionOverride } from '../utils/exhibitNumbers'
import { ExhibitProps, RoomId, BonusQuestion } from '../types'

import { Room1OperationsExhibit } from '../components/exhibits/Room1OperationsExhibit'
import { Room2DivisionExhibit } from '../components/exhibits/Room2DivisionExhibit'
import { Room3FractionExhibit } from '../components/exhibits/Room3FractionExhibit'
import { Room4DecimalExhibit } from '../components/exhibits/Room4DecimalExhibit'
import { Room5PropertiesExhibit } from '../components/exhibits/Room5PropertiesExhibit'
import { Room6ExpressionExhibit } from '../components/exhibits/Room6ExpressionExhibit'
import { Room7MeasurementExhibit } from '../components/exhibits/Room7MeasurementExhibit'
import { Room8CoordinateExhibit } from '../components/exhibits/Room8CoordinateExhibit'

const EXHIBIT_MAP: Record<RoomId, React.ComponentType<ExhibitProps>> = {
  operations:  Room1OperationsExhibit,
  division:    Room2DivisionExhibit,
  fractions:   Room3FractionExhibit,
  decimals:    Room4DecimalExhibit,
  properties:  Room5PropertiesExhibit,
  expressions: Room6ExpressionExhibit,
  measurement: Room7MeasurementExhibit,
  coordinates: Room8CoordinateExhibit,
}

const ONBOARDING_KEY = 'lexicon-lab-onboarding-seen'

interface Props {
  roomId: RoomId
}

export function RoomScreen({ roomId }: Props) {
  const setScreen = useGameStore(s => s.setScreen)
  const { roomState, shakingSlot, hintTermId, handleDrop } = useRoomSession(roomId)
  const { playCorrect, playWrong, playComplete } = useAudio()

  const room = getRoomById(roomId)!
  const terms = getTermsByRoom(roomId)
  const ExhibitComponent = EXHIBIT_MAP[roomId]
  const exhibitNumbers = useExhibitNumbers(roomId)

  // Merge bonus question overrides for rooms whose bonus questions reference exhibit numbers
  const bonusOverride = getBonusQuestionOverride(roomId, exhibitNumbers)
  const bonusQuestion: BonusQuestion = bonusOverride
    ? { ...room.bonusQuestion, ...bonusOverride }
    : room.bonusQuestion

  const [activeTermId, setActiveTermId] = useState<string | null>(null)
  const [showCompletion, setShowCompletion] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (roomId !== 'operations') return false
    return !localStorage.getItem(ONBOARDING_KEY)
  })

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  // Slots that have been correctly placed — these IDs match term IDs
  const placedIds = new Set(roomState.correctSlots)

  // slotId → displayTerm for filled correct slots
  const filledSlotDisplay: Record<string, string> = {}
  for (const slotId of roomState.correctSlots) {
    const term = getTermById(slotId)
    if (term) filledSlotDisplay[slotId] = term.displayTerm
  }

  const onDragStart = useCallback((event: DragStartEvent) => {
    setActiveTermId(event.active.id as string)
  }, [])

  const onDragEnd = useCallback((event: DragEndEvent) => {
    setActiveTermId(null)
    const { active, over } = event
    if (!over) return

    const termId = active.id as string
    const slotId = over.id as string

    if (roomState.correctSlots.includes(slotId)) return

    const isCorrect = termId === slotId
    handleDrop(slotId, termId, isCorrect)

    if (isCorrect) {
      const newCorrect = roomState.correctSlots.length + 1
      if (newCorrect >= room.slots.length) {
        playComplete()
        setShowCompletion(true)
      } else {
        playCorrect()
      }
    } else {
      playWrong()
    }
  }, [room, roomState.correctSlots, handleDrop, playCorrect, playWrong, playComplete])

  const activeTerm = activeTermId ? getTermById(activeTermId) : null
  const hintTerm = hintTermId ? getTermById(hintTermId) : null

  const exhibitProps: ExhibitProps = {
    filledSlots: filledSlotDisplay,
    correctSlots: roomState.correctSlots,
    shakingSlot,
    accentColor: room.accentColor,
    numbers: exhibitNumbers,
  }

  return (
    <>
      <AppShell title={room.title} onBack={() => setScreen('museum')}>
        <div style={{ padding: '16px 20px', maxWidth: '960px', margin: '0 auto', width: '100%', paddingBottom: '180px' }}>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '13px', color: '#718096', marginBottom: '6px' }}>{room.subtitle}</div>
            <RoomProgressBar
              correct={roomState.correctSlots.length}
              total={room.slots.length}
              accentColor={room.accentColor}
            />
          </div>

          <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <ExhibitWrapper description={room.exhibitDescription}>
              <ExhibitComponent {...exhibitProps} />
            </ExhibitWrapper>

            <DragOverlay>
              {activeTerm ? <DragOverlayLabel displayTerm={activeTerm.displayTerm} /> : null}
            </DragOverlay>

            {/* Fixed label tray pinned to the bottom of the viewport */}
            <div style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 200,
              background: '#FAF3E0',
              borderTop: '2px solid #C9A84C',
              boxShadow: '0 -4px 16px rgba(0,0,0,0.15)',
              padding: '10px 20px 14px',
            }}>
              <div style={{ maxWidth: '960px', margin: '0 auto' }}>
                {hintTerm && (
                  <div style={{
                    background: '#FFF5F5', border: '1px solid #FC8181', borderRadius: '8px',
                    padding: '10px 14px', marginBottom: '10px', fontSize: '13px', color: '#742A2A',
                  }}>
                    <strong>{hintTerm.displayTerm}:</strong> {hintTerm.definition}
                  </div>
                )}
                <LabelPool terms={terms} placedIds={placedIds} />
              </div>
            </div>
          </DndContext>
        </div>
      </AppShell>

      {showCompletion && (
        <CompletionModal room={room} bonusQuestion={bonusQuestion} onClose={() => { setShowCompletion(false); setScreen('museum') }} />
      )}

      {showOnboarding && (
        <OnboardingOverlay onDismiss={() => { localStorage.setItem(ONBOARDING_KEY, '1'); setShowOnboarding(false) }} />
      )}

      <style>{`
        @keyframes slotShake {
          0%  { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
          100%{ transform: translateX(0); }
        }
      `}</style>
    </>
  )
}
