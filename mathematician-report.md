# Mathematician's Definition Audit — TODO

## What Was Asked For

A mathematics expert was asked to review every term definition in `src/data/terms.ts` for:
1. Mathematical accuracy
2. Any misleading, incomplete, or technically wrong content
3. Age-appropriateness for Grade 5 students

The report below should be used as a guide for correcting definitions before the game is used in a classroom setting. **The definitions must match the teacher's original PDFs** (`Remy Jacob - Math Terminology #1 and 2 Study Cards.pdf` and `Remy Jacob - Math Terminology #3.pdf`) — so any corrections need to be coordinated with the teacher first.

---

## Significant Issues (fix before classroom use)

| Term | Problem |
|---|---|
| **Reciprocal** | "1 divided by that number" is wrong for fractions. The reciprocal of 2/3 is 3/2, not 1÷(2/3). Since Grade 5 students work with fraction reciprocals, this will produce incorrect understanding. Should say: "A number that, when multiplied by the original number, gives a product of 1. To find the reciprocal of a fraction, flip the numerator and denominator." |
| **Evaluate** | Defines evaluation as only substitution — omits the computation step. Students will think substituting values IS evaluating, without calculating. Should say: "To find the value of an expression by substituting values for variables and calculating the result." |
| **Distributive Property** | Written as an instruction ("Multiply a sum…"), not a definition. Covers only the expanding direction, omits the subtraction form, and lacks the algebraic pattern a×(b+c) = a×b + a×c. |
| **Simplest form** | "Fewest number of pieces" is informal and non-mathematical. Should reference that the numerator and denominator share no common factor other than 1. Also "lowest term" should be "lowest terms." |
| **Lowest terms** | Same "fewest number of pieces" problem as Simplest form. |
| **Metric system** | Defines the entire metric system as only being about length — completely omits mass (grams/kilograms) and volume (liters), both of which are taught in Grade 5. |
| **Axis** | States axes "make up the quadrants" — this is backwards. The axes *divide* the plane into quadrants. Also, Grade 5 CCSS works only in the first quadrant, so implying all four quadrants is misleading. Should say: "A horizontal or vertical number line on a coordinate plane used to locate points." |
| **Bar model** | Describes it as a substitute for "guess and check," which is a separate and unrelated problem-solving strategy. The definition mischaracterizes the tool. |

---

## Minor Issues (worth reviewing)

| Term | Issue |
|---|---|
| Factor | Says "expressions" — should say "numbers" for Grade 5 |
| Commutative Properties (both) | Restrict to "two numbers" — the property holds for any count |
| Product | "Two numbers" is too restrictive — products can have 3+ factors |
| area | Subject-verb disagreement ("covers" → "cover") |
| Less than / Greater than | Fragment sentences; don't mention the symbols < and > |
| Quotient | "Answer to a division problem" can conflate quotient with remainder |
| Estimate | "Close guess" undersells estimation as a deliberate reasoning process |
| Order of Operation | Fragment sentence; the standard term is "Operations" (plural) |
| Round | "Its nearest place value" is ambiguous — rounding is always to a *specific* place value |
| Numerator / Denominator | Purely positional ("top/bottom part") — don't convey what each number represents |
| Place value | Grammatically awkward; conflates position with value |
| Remainder | "One divisor" is odd phrasing; also omits that remainder < divisor |
| Decimal | Defines decimals as only expressing fractions — excludes whole-number decimals like 12.5 |
| Number line | "Correct position" is vague; doesn't convey equal spacing or directionality |
| Millimeter | No equivalent relationship given (unlike the centimeter entry which says 100 cm = 1 m) |
| Area model | Used for division too, not only multiplication |
| Expression | Defines only what it's NOT (no equal sign) — doesn't say what it IS |
| Standard form | Says "each number" when it means "each digit" |
| Unlike denominators | Defines the fractions, not the denominators themselves |
| Simplify | Circular — uses "simplest form" to define "simplify" |
| Inequality | Omits ≤, ≥, and ≠ symbols, which are also taught in Grade 5 |
| Decimal point | Uses "whole numbers" where it should say "whole number part" |
| attribute | Lists "color" as a math attribute — color is not a mathematical attribute |
| decompose / compose | "Basic elements" is science vocabulary, not math vocabulary |
| algorithm | Missing article ("A set of steps…") |
| Benchmark fractions | Doesn't name the actual benchmark fractions (e.g. 1/2, 1/4, 3/4) |
| Coordinate system | "Space of given dimensions" is college-level phrasing, not Grade 5 |
| Corresponding terms | Doesn't specify the two-sequence context required by CCSS 5.OA.B.3 |
| Base of an exponent | Slightly circular; would benefit from a concrete example like 2³ |
| Cubic unit | Doesn't explain what makes it "cubic" |
| array | Run-on definition; "fair shares" is informal |

---

## Constraint

All definitions in `src/data/terms.ts` are sourced directly from the teacher's study cards. **Any correction must first be approved by the teacher** — the source PDFs are the authority. Do not change definitions unilaterally.
