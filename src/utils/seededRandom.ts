/**
 * Mulberry32 — a fast, seedable 32-bit PRNG.
 * Returns a function that produces floats in [0, 1) on each call.
 */
export function mulberry32(seed: number): () => number {
  let s = seed | 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Random integer in [min, max] inclusive. */
export function randInt(rng: () => number, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

/** Random integer in [min, max] that is not in the exclude set. */
export function randIntExcluding(
  rng: () => number,
  min: number,
  max: number,
  exclude: number[],
): number {
  const excSet = new Set(exclude)
  // Safety: if every value is excluded, fall back to min
  if (max - min + 1 <= excSet.size) return min
  let val: number
  do {
    val = randInt(rng, min, max)
  } while (excSet.has(val))
  return val
}
