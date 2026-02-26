let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  return ctx
}

function playTone(freq: number, startTime: number, duration: number, gain: number, ctx: AudioContext) {
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.connect(g)
  g.connect(ctx.destination)
  osc.frequency.value = freq
  g.gain.setValueAtTime(0, startTime)
  g.gain.linearRampToValueAtTime(gain, startTime + 0.01)
  g.gain.linearRampToValueAtTime(0, startTime + duration)
  osc.start(startTime)
  osc.stop(startTime + duration + 0.05)
}

export function playCorrect() {
  const c = getCtx()
  const now = c.currentTime
  playTone(523.25, now,        0.15, 0.3, c)  // C5
  playTone(659.25, now + 0.1,  0.15, 0.3, c)  // E5
}

export function playWrong() {
  const c = getCtx()
  const now = c.currentTime
  playTone(220, now, 0.1, 0.25, c)  // A3, short muted tone
}

export function playComplete() {
  const c = getCtx()
  const now = c.currentTime
  const notes = [523.25, 659.25, 783.99, 1046.5]  // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    playTone(freq, now + i * 0.13, 0.15, 0.35, c)
  })
}

export function playGlitch() {
  const c = getCtx()
  const bufferSize = c.sampleRate * 0.3
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.15
  }
  const source = c.createBufferSource()
  source.buffer = buffer
  const g = c.createGain()
  g.gain.setValueAtTime(0.4, c.currentTime)
  g.gain.linearRampToValueAtTime(0, c.currentTime + 0.3)
  source.connect(g)
  g.connect(c.destination)
  source.start()
}
