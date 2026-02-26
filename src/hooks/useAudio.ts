import { useGameStore } from '../store/gameStore'
import * as audio from '../audio/audioEngine'

export function useAudio() {
  const isMuted = useGameStore(s => s.isMuted)

  return {
    playCorrect: () => { if (!isMuted) audio.playCorrect() },
    playWrong:   () => { if (!isMuted) audio.playWrong() },
    playComplete:() => { if (!isMuted) audio.playComplete() },
    playGlitch:  () => { if (!isMuted) audio.playGlitch() },
  }
}
