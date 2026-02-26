import { ExhibitProps } from '../../types'
import { InlineSlot } from '../dnd/InlineSlot'

export function Room2DivisionExhibit({ filledSlots, correctSlots, shakingSlot, accentColor }: ExhibitProps) {
  const S = (id: string) => (
    <InlineSlot
      id={id}
      displayTerm={filledSlots[id] ?? null}
      isCorrect={correctSlots.includes(id)}
      isShaking={shakingSlot === id}
      accentColor={accentColor}
    />
  )

  const label = { fontSize: '12px', color: '#718096', marginBottom: '4px' } as React.CSSProperties
  const row = { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' } as React.CSSProperties

  return (
    <div style={{ padding: '16px', background: '#FAF3E0', display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* Long Division */}
      <div style={{ background: '#F9EDE8', border: '2px solid #7B2D3E', borderRadius: '10px', padding: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#7B2D3E', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Long Division</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>

          {/* Dividend */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2D3748', fontFamily: 'monospace', background: '#fff', border: '2px solid #7B2D3E', borderRadius: '8px', padding: '8px 20px', marginBottom: '6px' }}>15</div>
            <div style={label}>The number being divided:</div>
            {S('dividend')}
          </div>

          <div style={{ fontSize: '28px', color: '#4A5568' }}>÷</div>

          {/* Divisor */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2D3748', fontFamily: 'monospace', background: '#fff', border: '2px solid #7B2D3E', borderRadius: '8px', padding: '8px 20px', marginBottom: '6px' }}>3</div>
            <div style={label}>The number we divide by:</div>
            {S('divisor')}
          </div>

          <div style={{ fontSize: '28px', color: '#4A5568' }}>= 5 R</div>

          {/* Remainder */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2D3748', fontFamily: 'monospace', background: '#fff', border: '2px solid #7B2D3E', borderRadius: '8px', padding: '8px 20px', marginBottom: '6px' }}>0</div>
            <div style={label}>The amount left over:</div>
            {S('remainder')}
          </div>
        </div>
      </div>

      {/* Subtraction Parts */}
      <div style={{ background: '#F9EDE8', border: '2px solid #7B2D3E', borderRadius: '10px', padding: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#7B2D3E', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Subtraction Parts</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2D3748', fontFamily: 'monospace', background: '#fff', border: '2px solid #7B2D3E', borderRadius: '8px', padding: '8px 20px', marginBottom: '6px' }}>15</div>
            <div style={label}>The starting number:</div>
            {S('minuend')}
          </div>

          <div style={{ fontSize: '28px', color: '#4A5568' }}>−</div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2D3748', fontFamily: 'monospace', background: '#fff', border: '2px solid #7B2D3E', borderRadius: '8px', padding: '8px 20px', marginBottom: '6px' }}>7</div>
            <div style={label}>The number being subtracted:</div>
            {S('subtrahend')}
          </div>

          <div style={{ fontSize: '28px', color: '#4A5568' }}>= 8</div>
        </div>
      </div>

      {/* Bottom row: Algorithm / Array / Decompose / Compose */}
      <div style={{ display: 'flex', gap: '10px' }}>

        <div style={{ background: '#E6F2F2', border: '2px solid #2C7A7B', borderRadius: '10px', padding: '14px', flex: 1 }}>
          <div style={{ fontSize: '13px', color: '#2D3748', marginBottom: '8px' }}>
            <strong>Step 1:</strong> Divide<br />
            <strong>Step 2:</strong> Multiply<br />
            <strong>Step 3:</strong> Subtract
          </div>
          <div style={label}>A set of steps to solve a problem:</div>
          <div style={row}>{S('algorithm')}</div>
        </div>

        <div style={{ background: '#EEF5E8', border: '2px solid #38A169', borderRadius: '10px', padding: '14px', flex: 1, textAlign: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', marginBottom: '10px', justifyItems: 'center' }}>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#38A169', opacity: 0.8 }} />
            ))}
          </div>
          <div style={label}>An orderly arrangement of rows &amp; columns:</div>
          <div style={row}>{S('array')}</div>
        </div>

        <div style={{ background: '#F5ECD7', border: '2px solid #C9A84C', borderRadius: '10px', padding: '14px', flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2D3748', marginBottom: '8px', fontFamily: 'monospace' }}>12 → 10 + 2</div>
          <div style={label}>To separate into smaller parts:</div>
          <div style={row}>{S('decompose')}</div>
        </div>

        <div style={{ background: '#F5ECD7', border: '2px solid #C9A84C', borderRadius: '10px', padding: '14px', flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2D3748', marginBottom: '8px', fontFamily: 'monospace' }}>10 + 2 → 12</div>
          <div style={label}>To put parts together into a whole:</div>
          <div style={row}>{S('compose')}</div>
        </div>

      </div>
    </div>
  )
}
