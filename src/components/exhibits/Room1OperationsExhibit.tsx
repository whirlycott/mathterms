import { ExhibitProps } from '../../types'
import { InlineSlot } from '../dnd/InlineSlot'
import { Room1Numbers } from '../../utils/exhibitNumbers'

// Panel order is intentional for pedagogical reasons: the four basic operations
// (addition, subtraction, multiplication, division) appear first as the foundation,
// followed by related concepts (factor, estimate, round), then comparisons.
// Do not randomize — students need the foundational panels before dependent ones.
export function Room1OperationsExhibit({ filledSlots, correctSlots, shakingSlot, accentColor, numbers }: ExhibitProps) {
  const n = numbers as Room1Numbers | undefined
  const S = (id: string) => (
    <InlineSlot
      id={id}
      displayTerm={filledSlots[id] ?? null}
      isCorrect={correctSlots.includes(id)}
      isShaking={shakingSlot === id}
      accentColor={accentColor}
    />
  )

  const opBox = (color: string) => ({
    background: '#fff',
    border: `2px solid ${color}`,
    borderRadius: '10px',
    padding: '14px',
    flex: 1,
  } as React.CSSProperties)

  const row = { display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' as const, marginBottom: '8px' }
  const label = { fontSize: '12px', color: '#718096', marginBottom: '4px' }

  return (
    <div style={{ padding: '16px', background: '#FAF3E0', display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* Row 1: Four operation machines */}
      <div style={{ display: 'flex', gap: '10px' }}>

        {/* Addition */}
        <div style={opBox('#2C7A7B')}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#2C7A7B', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Addition</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2D3748', marginBottom: '10px', fontFamily: 'monospace' }}>{n ? `${n.addA} + ${n.addB} = ${n.addSum}` : '4 + 3 = 7'}</div>
          <div style={label}>Each number being added:</div>
          <div style={row}>{S('addend')}</div>
          <div style={label}>The answer:</div>
          <div style={row}>{S('sum')}</div>
        </div>

        {/* Subtraction */}
        <div style={opBox('#7B2D3E')}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#7B2D3E', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Subtraction</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2D3748', marginBottom: '10px', fontFamily: 'monospace' }}>{n ? `${n.subMin} − ${n.subSub} = ${n.subDiff}` : '9 − 4 = 5'}</div>
          <div style={label}>The answer:</div>
          <div style={row}>{S('difference')}</div>
        </div>

        {/* Multiplication */}
        <div style={opBox('#38A169')}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#38A169', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Multiplication</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2D3748', marginBottom: '10px', fontFamily: 'monospace' }}>{n ? `${n.mulA} × ${n.mulB} = ${n.mulProduct}` : '6 × 7 = 42'}</div>
          <div style={label}>The answer:</div>
          <div style={row}>{S('product')}</div>
        </div>

        {/* Division */}
        <div style={opBox('#553C9A')}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#553C9A', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Division</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2D3748', marginBottom: '10px', fontFamily: 'monospace' }}>{n ? `${n.divDividend} ÷ ${n.divDivisor} = ${n.divQuotient}` : '12 ÷ 3 = 4'}</div>
          <div style={label}>The answer:</div>
          <div style={row}>{S('quotient')}</div>
        </div>
      </div>

      {/* Row 2: Factor / Estimate / Round */}
      <div style={{ display: 'flex', gap: '10px' }}>

        <div style={{ background: '#F5ECD7', border: '2px solid #C9A84C', borderRadius: '10px', padding: '14px', flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2D3748', marginBottom: '8px', fontFamily: 'monospace' }}>{n ? `${n.mulA} × ${n.mulB} = ${n.mulProduct}` : '6 × 7 = 42'}</div>
          <div style={label}>{n ? `${n.mulA} and ${n.mulB}` : '6 and 7'} are each a ___? (numbers you multiply together)</div>
          <div style={row}>{S('factor')}</div>
        </div>

        <div style={{ background: '#F5ECD7', border: '2px solid #C9A84C', borderRadius: '10px', padding: '14px', flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2D3748', marginBottom: '8px', fontFamily: 'monospace' }}>{n ? `${n.estN} ≈ ${n.estRounded}` : '38 ≈ 40'}</div>
          <div style={label}>A close guess of the actual value:</div>
          <div style={row}>{S('estimate')}</div>
        </div>

        <div style={{ background: '#F5ECD7', border: '2px solid #C9A84C', borderRadius: '10px', padding: '14px', flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2D3748', marginBottom: '8px', fontFamily: 'monospace' }}>{n ? `${n.roundN} → ${n.roundRounded}` : '37 → 40'}</div>
          <div style={label}>Approximate to the nearest place value:</div>
          <div style={row}>{S('round')}</div>
        </div>
      </div>

      {/* Row 3: Comparisons */}
      <div style={{ background: '#EEF2F7', border: '2px solid #4A5568', borderRadius: '10px', padding: '14px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#4A5568', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Comparisons</div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>

          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#7B2D3E', marginBottom: '6px', fontFamily: 'monospace' }}>{n ? `${n.ltA} < ${n.ltB}` : '3 < 7'}</div>
            <div style={label}>Used when first number is smaller:</div>
            <div style={row}>{S('less-than')}</div>
          </div>

          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#7B2D3E', marginBottom: '6px', fontFamily: 'monospace' }}>{n ? `${n.gtA} > ${n.gtB}` : '8 > 2'}</div>
            <div style={label}>Used when first number is larger:</div>
            <div style={row}>{S('greater-than')}</div>
          </div>

          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#7B2D3E', marginBottom: '6px', fontFamily: 'monospace' }}>{n ? `${n.neqA} ≠ ${n.neqB}` : '3 ≠ 5'}</div>
            <div style={label}>A sentence comparing two quantities with &lt; or &gt;:</div>
            <div style={row}>{S('inequality')}</div>
          </div>
        </div>
      </div>

    </div>
  )
}
