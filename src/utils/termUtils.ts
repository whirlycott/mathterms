import { TermRecord } from '../types'

export function toSlug(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function deduplicateTerms(terms: TermRecord[]): TermRecord[] {
  const seen = new Set<string>()
  return terms.filter(t => {
    if (seen.has(t.id)) return false
    seen.add(t.id)
    return true
  })
}

export function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
