import { BonusQuestion, RoomId } from '../types'
import { mulberry32, randInt, randIntExcluding } from './seededRandom'

// ── Room 1: Operations ──────────────────────────────────────────────

export interface Room1Numbers {
  addA: number; addB: number; addSum: number
  subMin: number; subSub: number; subDiff: number
  mulA: number; mulB: number; mulProduct: number
  divDividend: number; divDivisor: number; divQuotient: number
  estN: number; estRounded: number
  roundN: number; roundRounded: number
  ltA: number; ltB: number
  gtA: number; gtB: number
  neqA: number; neqB: number
}

export function generateRoom1(seed: number): Room1Numbers {
  const rng = mulberry32(seed)

  const addA = randInt(rng, 2, 9)
  const addB = randInt(rng, 2, 9)

  const subMin = randInt(rng, 6, 15)
  const subSub = randInt(rng, 2, subMin - 1)

  const mulA = randInt(rng, 2, 9)
  const mulB = randInt(rng, 2, 9)

  const divDivisor = randInt(rng, 2, 6)
  const divQuotient = randInt(rng, 2, 6)
  const divDividend = divDivisor * divQuotient

  // Estimate: number not divisible by 10, round to nearest 10
  let estN = randInt(rng, 21, 49)
  while (estN % 10 === 0) estN = randInt(rng, 21, 49)
  const estRounded = Math.round(estN / 10) * 10

  // Round: different pair from estimate
  let roundN = randInt(rng, 21, 49)
  while (roundN % 10 === 0 || roundN === estN) roundN = randInt(rng, 21, 49)
  const roundRounded = Math.round(roundN / 10) * 10

  const ltA = randInt(rng, 1, 8)
  const ltB = randIntExcluding(rng, ltA + 1, 9, [])

  const gtA = randInt(rng, 2, 9)
  const gtB = randIntExcluding(rng, 1, gtA - 1, [])

  const neqA = randInt(rng, 1, 9)
  const neqB = randIntExcluding(rng, 1, 9, [neqA])

  return {
    addA, addB, addSum: addA + addB,
    subMin, subSub, subDiff: subMin - subSub,
    mulA, mulB, mulProduct: mulA * mulB,
    divDividend, divDivisor, divQuotient,
    estN, estRounded,
    roundN, roundRounded,
    ltA, ltB,
    gtA, gtB,
    neqA, neqB,
  }
}

// ── Room 2: Division ────────────────────────────────────────────────

export interface Room2Numbers {
  divDividend: number; divDivisor: number; divQuotient: number
  subMin: number; subSub: number; subDiff: number
  arrayRows: number; arrayCols: number; arrayTotal: number
  decompWhole: number; decompTens: number; decompOnes: number
}

export function generateRoom2(seed: number): Room2Numbers {
  const rng = mulberry32(seed)

  const divDivisor = randInt(rng, 2, 6)
  const divQuotient = randInt(rng, 2, 6)
  const divDividend = divDivisor * divQuotient

  const subMin = randInt(rng, 10, 20)
  const subSub = randInt(rng, 2, subMin - 1)

  const arrayRows = randInt(rng, 3, 5)
  const arrayCols = randInt(rng, 3, 5)

  // Exclude multiples of 10 so the decomposition always has a nonzero ones digit
  let decompWhole = randInt(rng, 12, 29)
  while (decompWhole % 10 === 0) decompWhole = randInt(rng, 12, 29)
  const decompTens = Math.floor(decompWhole / 10) * 10
  const decompOnes = decompWhole - decompTens

  return {
    divDividend, divDivisor, divQuotient,
    subMin, subSub, subDiff: subMin - subSub,
    arrayRows, arrayCols, arrayTotal: arrayRows * arrayCols,
    decompWhole, decompTens, decompOnes,
  }
}

// ── Room 3: Fractions ───────────────────────────────────────────────

export interface Room3Numbers {
  mainNum: number; mainDen: number
  proper: Array<{ num: number; den: number }>
  improper: Array<{ num: number; den: number }>
  mixed: Array<{ whole: number; num: number; den: number }>
  eqBase: { num: number; den: number }
  eqEquiv: { num: number; den: number }
  recipNum: number; recipDen: number
  // Simplification chain: start ÷2 → mid ÷2 → simplest
  simpStart: { num: number; den: number }
  simpMid: { num: number; den: number }
  simpEnd: { num: number; den: number }
  likeNum1: number; likeNum2: number; likeDen: number
  unlikeNum1: number; unlikeDen1: number; unlikeNum2: number; unlikeDen2: number
}

export function generateRoom3(seed: number): Room3Numbers {
  const rng = mulberry32(seed)

  const mainDen = randInt(rng, 3, 8)
  const mainNum = randInt(rng, 1, mainDen - 1)

  // 3 proper fractions (num < den)
  const proper: Array<{ num: number; den: number }> = []
  for (let i = 0; i < 3; i++) {
    const d = randInt(rng, 3, 8)
    const n = randInt(rng, 1, d - 1)
    proper.push({ num: n, den: d })
  }

  // 3 improper fractions (num > den)
  const improper: Array<{ num: number; den: number }> = []
  for (let i = 0; i < 3; i++) {
    const d = randInt(rng, 2, 6)
    const n = randInt(rng, d + 1, d + 4)
    improper.push({ num: n, den: d })
  }

  // 3 mixed numbers
  const mixed: Array<{ whole: number; num: number; den: number }> = []
  for (let i = 0; i < 3; i++) {
    const w = randInt(rng, 1, 4)
    const d = randInt(rng, 3, 6)
    const n = randInt(rng, 1, d - 1)
    mixed.push({ whole: w, num: n, den: d })
  }

  // Equivalent: base fraction × 2
  const eqDen = randInt(rng, 2, 5)
  const eqNum = randInt(rng, 1, eqDen - 1)
  const eqBase = { num: eqNum, den: eqDen }
  const eqEquiv = { num: eqNum * 2, den: eqDen * 2 }

  // Reciprocal: reuse main fraction flipped
  const recipNum = mainNum
  const recipDen = mainDen

  // Simplification chain: pick fraction divisible by 4 → ÷2 → ÷2 → simplest
  // simpEnd must be a proper fraction (num < den) so the chain reduces correctly
  const simpEndNum = randInt(rng, 1, 3)
  const simpEndDen = randIntExcluding(rng, simpEndNum + 1, 6, [])
  const simpEnd = { num: simpEndNum, den: simpEndDen }
  const simpMid = { num: simpEndNum * 2, den: simpEndDen * 2 }
  const simpStart = { num: simpEndNum * 4, den: simpEndDen * 4 }

  // Like denominators
  const likeDen = randInt(rng, 3, 8)
  const likeNum1 = randInt(rng, 1, likeDen - 1)
  const likeNum2 = randIntExcluding(rng, 1, likeDen - 1, [likeNum1])

  // Unlike denominators
  const unlikeDen1 = randInt(rng, 3, 6)
  const unlikeDen2 = randIntExcluding(rng, 3, 6, [unlikeDen1])
  const unlikeNum1 = randInt(rng, 1, unlikeDen1 - 1)
  const unlikeNum2 = randInt(rng, 1, unlikeDen2 - 1)

  return {
    mainNum, mainDen,
    proper, improper, mixed,
    eqBase, eqEquiv,
    recipNum, recipDen,
    simpStart, simpMid, simpEnd,
    likeNum1, likeNum2, likeDen,
    unlikeNum1, unlikeDen1, unlikeNum2, unlikeDen2,
  }
}

// ── Room 4: Decimals ────────────────────────────────────────────────

export interface Room4Numbers {
  whole: number
  tenths: number
  hundredths: number
  thousandths: number
  // Bonus question uses a different 0.XYZ number
  bonusT: number; bonusH: number; bonusU: number
}

export function generateRoom4(seed: number): Room4Numbers {
  const rng = mulberry32(seed)

  const whole = randInt(rng, 1, 9)
  const tenths = randInt(rng, 1, 9)
  const hundredths = randInt(rng, 1, 9)
  const thousandths = randInt(rng, 1, 9)

  // Different digits for bonus question
  const bonusT = randInt(rng, 1, 9)
  const bonusH = randIntExcluding(rng, 1, 9, [bonusT])
  const bonusU = randIntExcluding(rng, 1, 9, [bonusT, bonusH])

  return { whole, tenths, hundredths, thousandths, bonusT, bonusH, bonusU }
}

// ── Room 5: Properties ──────────────────────────────────────────────

export interface Room5Numbers {
  commAddA: number; commAddB: number
  commMulA: number; commMulB: number
  assocA: number; assocB: number; assocC: number
  distA: number; distB: number; distC: number; distResult: number
}

export function generateRoom5(seed: number): Room5Numbers {
  const rng = mulberry32(seed)

  const commAddA = randInt(rng, 2, 9)
  const commAddB = randIntExcluding(rng, 2, 9, [commAddA])

  const commMulA = randInt(rng, 2, 9)
  const commMulB = randIntExcluding(rng, 2, 9, [commMulA])

  const assocA = randInt(rng, 2, 5)
  const assocB = randInt(rng, 2, 5)
  const assocC = randInt(rng, 2, 5)

  const distA = randInt(rng, 2, 5)
  const distB = randInt(rng, 2, 5)
  const distC = randInt(rng, 2, 5)
  const distResult = distA * (distB + distC)

  return {
    commAddA, commAddB,
    commMulA, commMulB,
    assocA, assocB, assocC,
    distA, distB, distC, distResult,
  }
}

// ── Room 6: Expressions ─────────────────────────────────────────────

export interface Room6Numbers {
  // Nested expression: { a×[(b+c)÷d]−e }
  nestA: number; nestB: number; nestC: number; nestD: number; nestE: number
  nestInner: number   // b+c
  nestBracket: number // (b+c)÷d
  nestResult: number  // a×((b+c)÷d)−e
  // Expression/equation panels share a×(b+c) base
  exprA: number; exprB: number; exprC: number; exprResult: number
}

export function generateRoom6(seed: number): Room6Numbers {
  const rng = mulberry32(seed)

  // Nested expression: { a×[(b+c)÷d]−e }
  // d in [2..4], (b+c) must be a multiple of d
  const nestD = randInt(rng, 2, 4)
  const nestBcMultiplier = randInt(rng, 2, 4)
  const nestInner = nestD * nestBcMultiplier // b+c
  const nestB = randInt(rng, 1, nestInner - 1)
  const nestC = nestInner - nestB
  const nestBracket = nestBcMultiplier // (b+c)÷d
  const nestA = randInt(rng, 2, 5)
  const preSubtract = nestA * nestBracket
  // e so result > 0
  const nestE = randInt(rng, 1, Math.max(1, preSubtract - 1))
  const nestResult = preSubtract - nestE

  // Expression/equation panels: a×(b+c)
  const exprA = randInt(rng, 2, 5)
  const exprB = randInt(rng, 2, 5)
  const exprC = randInt(rng, 2, 5)
  const exprResult = exprA * (exprB + exprC)

  return {
    nestA, nestB, nestC, nestD, nestE,
    nestInner, nestBracket, nestResult,
    exprA, exprB, exprC, exprResult,
  }
}

// ── Room 8: Coordinates ─────────────────────────────────────────────

export interface Room8Numbers {
  pointX: number; pointY: number
  seqAStep: number; seqA: number[]
  seqBStep: number; seqB: number[]
  expBase: number; expPower: number; expResult: number
}

export function generateRoom8(seed: number): Room8Numbers {
  const rng = mulberry32(seed)

  const pointX = randInt(rng, 1, 4)
  const pointY = randInt(rng, 1, 4)

  const seqAStep = randInt(rng, 2, 5)
  const seqA = [1, 2, 3, 4].map(i => seqAStep * i)
  let seqBStep = randIntExcluding(rng, 2, 5, [seqAStep])
  const seqB = [1, 2, 3, 4].map(i => seqBStep * i)

  const expBase = randInt(rng, 2, 5)
  const expPower = randInt(rng, 2, 4)
  const expResult = Math.pow(expBase, expPower)

  return {
    pointX, pointY,
    seqAStep, seqA,
    seqBStep, seqB,
    expBase, expPower, expResult,
  }
}

// ── All rooms union type ────────────────────────────────────────────

export type ExhibitNumbers =
  | Room1Numbers
  | Room2Numbers
  | Room3Numbers
  | Room4Numbers
  | Room5Numbers
  | Room6Numbers
  | Room8Numbers

// ── Generator dispatch ──────────────────────────────────────────────

const generators: Record<string, (seed: number) => ExhibitNumbers> = {
  operations: generateRoom1,
  division: generateRoom2,
  fractions: generateRoom3,
  decimals: generateRoom4,
  properties: generateRoom5,
  expressions: generateRoom6,
  coordinates: generateRoom8,
}

export function generateExhibitNumbers(roomId: RoomId, seed: number): ExhibitNumbers | null {
  const gen = generators[roomId]
  return gen ? gen(seed) : null
}

// ── Bonus question overrides ────────────────────────────────────────

export function getBonusQuestionOverride(
  roomId: RoomId,
  numbers: ExhibitNumbers | null,
): Partial<BonusQuestion> | null {
  if (!numbers) return null

  if (roomId === 'division') {
    const n = numbers as Room2Numbers
    return {
      question: `In ${n.divDividend} ÷ ${n.divDivisor} = ${n.divQuotient}, what is the number ${n.divDividend} called?`,
    }
  }

  if (roomId === 'decimals') {
    const n = numbers as Room4Numbers
    // Options are the 3 digits + 0; correctIndex points to hundredths (index 1)
    const options = [String(n.bonusT), String(n.bonusH), String(n.bonusU), '0']
    return {
      question: `In the number 0.${n.bonusT}${n.bonusH}${n.bonusU}, which digit is in the hundredths place?`,
      options,
      correctIndex: 1,
    }
  }

  if (roomId === 'properties') {
    const n = numbers as Room5Numbers
    return {
      question: `Which property says ${n.commAddA} + ${n.commAddB} = ${n.commAddB} + ${n.commAddA}?`,
    }
  }

  return null
}
