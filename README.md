# The Lexicon Lab

A browser-based vocabulary game for 5th graders to master 74 math terms.

**Play it:** https://whirlycott.github.io/mathterms/

## How it works

Players take on the role of museum curators restoring a scrambled math museum. Each of the 8 rooms covers a different math topic. Drag the term labels from the pool at the top and drop them onto the correct spots in each exhibit.

Getting a term wrong shakes the slot and shows a hint definition. Progress is saved automatically in the browser.

## Rooms

| # | Room | Topics |
|---|------|--------|
| 1 | Operations Gallery | Sum, difference, product, quotient, addend, factor, estimate, round, inequalities |
| 2 | Division Chamber | Dividend, divisor, remainder, algorithm, array, decompose/compose |
| 3 | Fraction Wing | Numerator, denominator, proper/improper fractions, mixed numbers, equivalent fractions, simplest form, reciprocal |
| 4 | Decimal Hall | Decimal, place value, tenths/hundredths/thousandths, standard form, expanded form |
| 5 | Properties Pavilion | Commutative, associative, and distributive properties |
| 6 | Expression Lab | Expression, equation, order of operations, parentheses, brackets, braces, evaluate |
| 7 | Measurement Room | Area, area model, bar model, metric units, cubic unit, number line |
| 8 | Coordinate Observatory | Coordinate plane, axes, coordinates, corresponding terms, base of a solid/exponent |

Rooms unlock sequentially as earlier rooms are completed.

## Development

```
npm install
npm run dev       # dev server at localhost:5173
npm run build     # production build → dist/
```

Built with React 19, TypeScript, Vite, @dnd-kit, and Zustand.

## License

MIT License — see [LICENSE](LICENSE) for details.
