import { useEffect } from 'react'
import { useGameStore } from './store/gameStore'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { MuseumScreen } from './screens/MuseumScreen'
import { RoomScreen } from './screens/RoomScreen'
import { ErrBotCutscene } from './components/errbot/ErrBotCutscene'
import { getLowestConfidenceRoom } from './utils/progressionUtils'
import { getRoomById } from './data/rooms'

const CUTSCENE_KEY = 'lexicon-lab-cutscene-shown'

export default function App() {
  const screen = useGameStore(s => s.screen)
  const activeRoomId = useGameStore(s => s.activeRoomId)
  const rooms = useGameStore(s => s.rooms)
  const errBotVisible = useGameStore(s => s.errBotVisible)
  const scrambleRoom = useGameStore(s => s.scrambleRoom)
  const setErrBotVisible = useGameStore(s => s.setErrBotVisible)

  // After all 8 rooms completed, trigger ERR-0R scramble on museum screen
  useEffect(() => {
    if (screen !== 'museum') return
    const allCompleted = Object.values(rooms).every(r => r.status === 'completed')
    if (!allCompleted) return
    if (localStorage.getItem(CUTSCENE_KEY)) return

    // Trigger the cutscene
    const targetRoomId = getLowestConfidenceRoom(rooms)
    if (targetRoomId) {
      setErrBotVisible(true)
    }
  }, [screen, rooms, setErrBotVisible])

  const handleCutsceneComplete = () => {
    setErrBotVisible(false)
    const targetRoomId = getLowestConfidenceRoom(rooms)
    if (targetRoomId) {
      scrambleRoom(targetRoomId)
    }
    localStorage.setItem(CUTSCENE_KEY, '1')
  }

  const scrambledRoom = errBotVisible
    ? (() => {
        const id = getLowestConfidenceRoom(rooms)
        return id ? getRoomById(id) : null
      })()
    : null

  return (
    <>
      {screen === 'welcome' && <WelcomeScreen />}
      {screen === 'museum' && <MuseumScreen />}
      {screen === 'room' && activeRoomId && <RoomScreen roomId={activeRoomId} />}

      {errBotVisible && scrambledRoom && (
        <ErrBotCutscene
          roomTitle={scrambledRoom.title}
          onComplete={handleCutsceneComplete}
        />
      )}
    </>
  )
}
