import { describe, it, expect } from 'vitest'
import {
  generateRoom1, generateRoom2, generateRoom3, generateRoom4,
  generateRoom5, generateRoom6, generateRoom8,
  getBonusQuestionOverride,
} from './exhibitNumbers'

const ITERATIONS = 100

// A broad sweep of fixed seeds chosen to cover boundary conditions, not just
// runtime-dependent Date.now() values.
const FIXED_SEEDS = [
  0, 1, 2, 3, 7, 42, 100, 255, 256, 1000, 7919, 12345, 65535, 65536,
  100000, 999999, 2147483647,
]

function seeds(): number[] {
  return Array.from({ length: ITERATIONS }, (_, i) => Date.now() + i * 7919)
}

describe('generateRoom1 (Operations)', () => {
  it.each(seeds().map(s => [s]))('seed %i produces valid math', (seed) => {
    const n = generateRoom1(seed)
    expect(n.addA).toBeGreaterThanOrEqual(2)
    expect(n.addB).toBeGreaterThanOrEqual(2)
    expect(n.addSum).toBe(n.addA + n.addB)

    expect(n.subMin).toBeGreaterThanOrEqual(6)
    expect(n.subSub).toBeLessThan(n.subMin)
    expect(n.subDiff).toBe(n.subMin - n.subSub)

    expect(n.mulProduct).toBe(n.mulA * n.mulB)
    expect(n.divDividend).toBe(n.divDivisor * n.divQuotient)
    expect(n.divDividend % n.divDivisor).toBe(0)

    expect(n.estN % 10).not.toBe(0)
    expect(n.estRounded).toBe(Math.round(n.estN / 10) * 10)
    expect(n.roundN % 10).not.toBe(0)
    expect(n.roundN).not.toBe(n.estN)
    expect(n.roundRounded).toBe(Math.round(n.roundN / 10) * 10)

    expect(n.ltA).toBeLessThan(n.ltB)
    expect(n.gtA).toBeGreaterThan(n.gtB)
    expect(n.neqA).not.toBe(n.neqB)
  })
})

describe('generateRoom2 (Division)', () => {
  it.each(seeds().map(s => [s]))('seed %i produces valid math', (seed) => {
    const n = generateRoom2(seed)
    expect(n.divDividend).toBe(n.divDivisor * n.divQuotient)
    expect(n.divDividend % n.divDivisor).toBe(0)
    expect(n.subDiff).toBe(n.subMin - n.subSub)
    expect(n.subSub).toBeLessThan(n.subMin)
    expect(n.arrayTotal).toBe(n.arrayRows * n.arrayCols)
    expect(n.arrayRows).toBeGreaterThanOrEqual(3)
    expect(n.arrayCols).toBeGreaterThanOrEqual(3)
    expect(n.decompWhole).toBe(n.decompTens + n.decompOnes)
    expect(n.decompTens % 10).toBe(0)
  })
})

describe('generateRoom3 (Fractions)', () => {
  it.each(seeds().map(s => [s]))('seed %i produces valid fractions', (seed) => {
    const n = generateRoom3(seed)
    expect(n.mainNum).toBeLessThan(n.mainDen)
    expect(n.mainNum).toBeGreaterThanOrEqual(1)

    n.proper.forEach(f => {
      expect(f.num).toBeLessThan(f.den)
      expect(f.num).toBeGreaterThanOrEqual(1)
    })

    n.improper.forEach(f => {
      expect(f.num).toBeGreaterThan(f.den)
    })

    n.mixed.forEach(m => {
      expect(m.whole).toBeGreaterThanOrEqual(1)
      expect(m.num).toBeLessThan(m.den)
      expect(m.num).toBeGreaterThanOrEqual(1)
    })

    // Equivalent: base × 2
    expect(n.eqEquiv.num).toBe(n.eqBase.num * 2)
    expect(n.eqEquiv.den).toBe(n.eqBase.den * 2)

    // Simplification chain
    expect(n.simpStart.num).toBe(n.simpMid.num * 2)
    expect(n.simpStart.den).toBe(n.simpMid.den * 2)
    expect(n.simpMid.num).toBe(n.simpEnd.num * 2)
    expect(n.simpMid.den).toBe(n.simpEnd.den * 2)
    expect(n.simpEnd.num).not.toBe(n.simpEnd.den)

    // Like denominators
    expect(n.likeNum1).not.toBe(n.likeNum2)
    expect(n.likeNum1).toBeLessThan(n.likeDen)
    expect(n.likeNum2).toBeLessThan(n.likeDen)

    // Unlike denominators
    expect(n.unlikeDen1).not.toBe(n.unlikeDen2)
  })
})

describe('generateRoom4 (Decimals)', () => {
  it.each(seeds().map(s => [s]))('seed %i produces valid decimals', (seed) => {
    const n = generateRoom4(seed)
    expect(n.whole).toBeGreaterThanOrEqual(1)
    expect(n.whole).toBeLessThanOrEqual(9)
    expect(n.tenths).toBeGreaterThanOrEqual(1)
    expect(n.hundredths).toBeGreaterThanOrEqual(1)
    expect(n.thousandths).toBeGreaterThanOrEqual(1)

    // Bonus digits are all distinct
    expect(n.bonusT).not.toBe(n.bonusH)
    expect(n.bonusT).not.toBe(n.bonusU)
    expect(n.bonusH).not.toBe(n.bonusU)
  })
})

describe('generateRoom5 (Properties)', () => {
  it.each(seeds().map(s => [s]))('seed %i produces valid properties', (seed) => {
    const n = generateRoom5(seed)
    expect(n.commAddA).not.toBe(n.commAddB)
    expect(n.commMulA).not.toBe(n.commMulB)
    expect(n.assocA).toBeGreaterThanOrEqual(2)
    expect(n.assocB).toBeGreaterThanOrEqual(2)
    expect(n.assocC).toBeGreaterThanOrEqual(2)
    expect(n.distResult).toBe(n.distA * (n.distB + n.distC))
  })
})

describe('generateRoom6 (Expressions)', () => {
  it.each(seeds().map(s => [s]))('seed %i produces valid expressions', (seed) => {
    const n = generateRoom6(seed)
    expect(n.nestInner).toBe(n.nestB + n.nestC)
    expect(n.nestInner % n.nestD).toBe(0)
    expect(n.nestBracket).toBe(n.nestInner / n.nestD)
    expect(n.nestResult).toBe(n.nestA * n.nestBracket - n.nestE)
    expect(n.nestResult).toBeGreaterThan(0)

    expect(n.exprResult).toBe(n.exprA * (n.exprB + n.exprC))
  })
})

describe('generateRoom8 (Coordinates)', () => {
  it.each(seeds().map(s => [s]))('seed %i produces valid coordinates', (seed) => {
    const n = generateRoom8(seed)
    expect(n.pointX).toBeGreaterThanOrEqual(1)
    expect(n.pointX).toBeLessThanOrEqual(4)
    expect(n.pointY).toBeGreaterThanOrEqual(1)
    expect(n.pointY).toBeLessThanOrEqual(4)

    expect(n.seqA).toHaveLength(4)
    expect(n.seqB).toHaveLength(4)
    expect(n.seqAStep).not.toBe(n.seqBStep)

    expect(n.expResult).toBe(Math.pow(n.expBase, n.expPower))
    expect(n.expBase).toBeGreaterThanOrEqual(2)
  })
})

describe('getBonusQuestionOverride', () => {
  it('overrides Room 2 bonus question with generated numbers', () => {
    const n = generateRoom2(42)
    const override = getBonusQuestionOverride('division', n)
    expect(override).not.toBeNull()
    expect(override!.question).toContain(String(n.divDividend))
    expect(override!.question).toContain(String(n.divDivisor))
  })

  it('overrides Room 4 bonus question with generated digits', () => {
    const n = generateRoom4(42)
    const override = getBonusQuestionOverride('decimals', n)
    expect(override).not.toBeNull()
    expect(override!.question).toContain(`0.${n.bonusT}${n.bonusH}${n.bonusU}`)
    expect(override!.correctIndex).toBe(1)
    expect(override!.options![1]).toBe(String(n.bonusH))
  })

  it('overrides Room 5 bonus question with generated numbers', () => {
    const n = generateRoom5(42)
    const override = getBonusQuestionOverride('properties', n)
    expect(override).not.toBeNull()
    expect(override!.question).toContain(String(n.commAddA))
    expect(override!.question).toContain(String(n.commAddB))
  })

  it('returns null for rooms without overrides', () => {
    expect(getBonusQuestionOverride('operations', generateRoom1(42))).toBeNull()
    expect(getBonusQuestionOverride('measurement', null)).toBeNull()
  })
})

// ─── Edge-case audit: boundary conditions and degenerate value checks ────────

describe('Edge cases: Room 1 boundary conditions', () => {
  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: mulA*mulB stays within 2-digit range', (seed) => {
    const n = generateRoom1(seed)
    // mulA in [2,9], mulB in [2,9], max product 81 — safely 2 digits
    expect(n.mulProduct).toBeLessThanOrEqual(81)
    expect(n.mulProduct).toBeGreaterThanOrEqual(4)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: ltA strictly less than ltB (never equal)', (seed) => {
    const n = generateRoom1(seed)
    expect(n.ltA).toBeLessThan(n.ltB)
    // ltB >= ltA+1, so they can never be equal
    expect(n.ltB - n.ltA).toBeGreaterThanOrEqual(1)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: gtA strictly greater than gtB (never equal)', (seed) => {
    const n = generateRoom1(seed)
    expect(n.gtA).toBeGreaterThan(n.gtB)
    // gtB <= gtA-1, so they can never be equal
    expect(n.gtA - n.gtB).toBeGreaterThanOrEqual(1)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: subDiff is always positive (never 0)', (seed) => {
    const n = generateRoom1(seed)
    // subSub in [2, subMin-1], so subDiff = subMin - subSub >= 1
    expect(n.subDiff).toBeGreaterThanOrEqual(1)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: divQuotient is at least 2 (no trivial x÷x=1)', (seed) => {
    const n = generateRoom1(seed)
    expect(n.divQuotient).toBeGreaterThanOrEqual(2)
    expect(n.divDivisor).toBeGreaterThanOrEqual(2)
  })
})

describe('Edge cases: Room 2 degenerate decomposition', () => {
  // BUG: decompWhole=20 produces '20 → 20 + 0', which is a trivial decomposition.
  // The value 20 is within the range [12,29] and occurs in roughly 5.7% of seeds.
  // This is not a math-correctness bug (20 = 20 + 0 is true), but it is
  // pedagogically degenerate: decompose/compose exist to show tens + ones, and
  // showing '+ 0' defeats that purpose.
  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: decompOnes is not zero (no trivial N+0 decomposition)', (seed) => {
    const n = generateRoom2(seed)
    expect(n.decompOnes).not.toBe(0)
    expect(n.decompOnes).toBeGreaterThanOrEqual(1)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: decompTens is never the entire number', (seed) => {
    const n = generateRoom2(seed)
    expect(n.decompTens).toBeLessThan(n.decompWhole)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: remainder is correctly 0 for clean division', (seed) => {
    const n = generateRoom2(seed)
    // The exhibit hardcodes '0' as the remainder display; this test confirms
    // the generator always produces exact (no-remainder) division.
    expect(n.divDividend % n.divDivisor).toBe(0)
  })
})

describe('Edge cases: Room 3 fraction constraints', () => {
  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: eqBase is a proper fraction (num < den, not = 1)', (seed) => {
    const n = generateRoom3(seed)
    expect(n.eqBase.num).toBeLessThan(n.eqBase.den)
    // eqBase.num/eqBase.den must not equal 1 (which would make it a whole number)
    expect(n.eqBase.num).not.toBe(n.eqBase.den)
  })

  // BUG: simpEndNum is drawn from [1,3] and simpEndDen excludes simpEndNum but
  // can still be smaller than it. Specifically, simpEndNum=3 allows simpEndDen=2,
  // yielding simpEnd={num:3, den:2} — an improper fraction. The simplification
  // chain then becomes 12/8 → 6/4 → 3/2, which contradicts the exhibit's
  // purpose of showing reduction to simplest proper form.
  // Confirmed failing seeds: 100, 65535.
  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: simpEnd is a proper fraction (num < den)', (seed) => {
    const n = generateRoom3(seed)
    expect(n.simpEnd.num).not.toBe(n.simpEnd.den)
    expect(n.simpEnd.num).toBeLessThan(n.simpEnd.den)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: reciprocal display is non-trivial (neither part is 1/1)', (seed) => {
    const n = generateRoom3(seed)
    // recipNum/recipDen comes from mainNum/mainDen which is always a proper fraction
    expect(n.recipNum).toBeGreaterThanOrEqual(1)
    expect(n.recipDen).toBeGreaterThanOrEqual(3)
    // The reciprocal shown is recipDen/recipNum — must have recipNum != recipDen
    // (otherwise flipping gives the same fraction, which defeats the example)
    expect(n.recipNum).not.toBe(n.recipDen)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: like-denominator numerators are distinct', (seed) => {
    const n = generateRoom3(seed)
    expect(n.likeNum1).not.toBe(n.likeNum2)
  })

  // Confirm likeDen=3 boundary case is handled: only 1 and 2 are available,
  // randIntExcluding must correctly find the other value (not fall back to min=1).
  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: both like-denom numerators are valid for any likeDen including 3', (seed) => {
    const n = generateRoom3(seed)
    expect(n.likeNum1).toBeGreaterThanOrEqual(1)
    expect(n.likeNum2).toBeGreaterThanOrEqual(1)
    expect(n.likeNum1).toBeLessThan(n.likeDen)
    expect(n.likeNum2).toBeLessThan(n.likeDen)
  })
})

describe('Edge cases: Room 4 decimal display', () => {
  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: main decimal digits are all nonzero (no misleading "0" place in display)', (seed) => {
    const n = generateRoom4(seed)
    // All four digits appear individually in the exhibit; if any were 0 the
    // expanded form and place-value panel would look wrong (e.g. '0.0' in tenths)
    expect(n.tenths).not.toBe(0)
    expect(n.hundredths).not.toBe(0)
    expect(n.thousandths).not.toBe(0)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: bonus digit options are all distinct (no duplicate choice labels)', (seed) => {
    const n = generateRoom4(seed)
    expect(n.bonusT).not.toBe(n.bonusH)
    expect(n.bonusT).not.toBe(n.bonusU)
    expect(n.bonusH).not.toBe(n.bonusU)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: bonus correctIndex=1 matches hundredths digit', (seed) => {
    const n = generateRoom4(seed)
    const override = getBonusQuestionOverride('decimals', n)
    expect(override).not.toBeNull()
    // The question is about the number 0.THU where T=tenths, H=hundredths
    // correctIndex=1 must map to bonusH (hundredths)
    expect(override!.correctIndex).toBe(1)
    expect(override!.options![1]).toBe(String(n.bonusH))
    // The number in the question must match the digit order
    expect(override!.question).toContain(`0.${n.bonusT}${n.bonusH}${n.bonusU}`)
  })
})

describe('Edge cases: Room 5 commutative property non-triviality', () => {
  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: commAddA != commAddB (a+b=b+a is non-trivial)', (seed) => {
    const n = generateRoom5(seed)
    // If a==b the equation a+b = b+a becomes a+a = a+a, which is technically
    // correct but fails to demonstrate the *commutative* swap visually.
    expect(n.commAddA).not.toBe(n.commAddB)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: commMulA != commMulB (a×b=b×a is non-trivial)', (seed) => {
    const n = generateRoom5(seed)
    expect(n.commMulA).not.toBe(n.commMulB)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: distributive result is correct', (seed) => {
    const n = generateRoom5(seed)
    const expanded = n.distA * n.distB + n.distA * n.distC
    expect(n.distResult).toBe(expanded)
    expect(n.distResult).toBe(n.distA * (n.distB + n.distC))
  })
})

describe('Edge cases: Room 6 nested expression', () => {
  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: nestResult is always positive (never 0 or negative)', (seed) => {
    const n = generateRoom6(seed)
    expect(n.nestResult).toBeGreaterThan(0)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: nestB and nestC are both positive (no zero addends in example)', (seed) => {
    const n = generateRoom6(seed)
    expect(n.nestB).toBeGreaterThanOrEqual(1)
    expect(n.nestC).toBeGreaterThanOrEqual(1)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: nestE < preSubtract (so nestResult > 0)', (seed) => {
    const n = generateRoom6(seed)
    const preSubtract = n.nestA * n.nestBracket
    // nestE must be strictly less than preSubtract so result > 0
    expect(n.nestE).toBeLessThan(preSubtract)
    expect(preSubtract - n.nestE).toBe(n.nestResult)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: (nestB+nestC) is exactly divisible by nestD', (seed) => {
    const n = generateRoom6(seed)
    expect(n.nestInner % n.nestD).toBe(0)
  })
})

describe('Edge cases: Room 8 coordinate and sequence constraints', () => {
  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: point coordinates are never on an axis (both nonzero)', (seed) => {
    const n = generateRoom8(seed)
    // A point at (0,y) or (x,0) lies on an axis, not in a quadrant.
    // Placing the marker on an axis would contradict the coordinate-pair label.
    expect(n.pointX).toBeGreaterThanOrEqual(1)
    expect(n.pointY).toBeGreaterThanOrEqual(1)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: seqA and seqB have different steps (distinct sequences)', (seed) => {
    const n = generateRoom8(seed)
    expect(n.seqAStep).not.toBe(n.seqBStep)
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: sequence values are all positive multiples (no zeros)', (seed) => {
    const n = generateRoom8(seed)
    // Steps are in [2,5], indices are [1,2,3,4], so all values >= 2
    n.seqA.forEach(v => expect(v).toBeGreaterThanOrEqual(2))
    n.seqB.forEach(v => expect(v).toBeGreaterThanOrEqual(2))
  })

  it.each(FIXED_SEEDS.map(s => [s]))('seed %i: exponentiation result is mathematically correct', (seed) => {
    const n = generateRoom8(seed)
    // expBase in [2,5], expPower in [2,4]: max is 5^4 = 625 (still readable)
    expect(n.expResult).toBe(Math.pow(n.expBase, n.expPower))
    expect(n.expResult).toBeGreaterThanOrEqual(4)   // min 2^2
    expect(n.expResult).toBeLessThanOrEqual(625)    // max 5^4
  })
})
