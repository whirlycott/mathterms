import { ExhibitProps } from '../../types'
import { InlineSlot } from '../dnd/InlineSlot'

export function Room4DecimalExhibit({ filledSlots, correctSlots, shakingSlot, accentColor }: ExhibitProps) {
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

  return (
    <div style={{ padding: '16px', background: '#FAF3E0', display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* The Number 3.147 */}
      <div style={{ background: '#EBF8FF', border: '2px solid #3182CE', borderRadius: '10px', padding: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#3182CE', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>The Number 3.147</div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>

          {/* 3 — whole part */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#2C7A7B', fontFamily: 'monospace', lineHeight: 1 }}>3</div>
            <div style={{ fontSize: '11px', color: '#718096', margin: '4px 0' }}>before the dot</div>
            <div style={label}>The whole number part:</div>
            {S('whole-numbers')}
          </div>

          {/* The dot */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#3182CE', fontFamily: 'monospace', lineHeight: 1 }}>.</div>
            <div style={{ fontSize: '11px', color: '#718096', margin: '4px 0' }}>the dot itself</div>
            <div style={label}>The printed dot:</div>
            {S('decimal-point')}
          </div>

          {/* 1 — tenths */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#DD6B20', fontFamily: 'monospace', lineHeight: 1 }}>1</div>
            <div style={{ fontSize: '11px', color: '#718096', margin: '4px 0' }}>1st digit after dot = 1/10</div>
            <div style={label}>1st place after dot:</div>
            {S('tenth')}
          </div>

          {/* 4 — hundredths */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#E53E3E', fontFamily: 'monospace', lineHeight: 1 }}>4</div>
            <div style={{ fontSize: '11px', color: '#718096', margin: '4px 0' }}>2nd digit after dot = 1/100</div>
            <div style={label}>2nd place after dot:</div>
            {S('hundredth')}
          </div>

          {/* 7 — thousandths */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#805AD5', fontFamily: 'monospace', lineHeight: 1 }}>7</div>
            <div style={{ fontSize: '11px', color: '#718096', margin: '4px 0' }}>3rd digit after dot = 1/1000</div>
            <div style={label}>3rd place after dot:</div>
            {S('thousandth')}
          </div>

          {/* Place value explanation */}
          <div style={{ background: '#fff', border: '2px solid #3182CE', borderRadius: '8px', padding: '12px', minWidth: '160px', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: '#3182CE', fontWeight: 700, marginBottom: '6px' }}>Position matters!</div>
            <div style={{ fontSize: '11px', color: '#4A5568', lineHeight: 1.5 }}>The digit 4 in 3.147<br />is worth 0.04,<br />not 4 or 40</div>
            <div style={{ marginTop: '8px' }}>
              <div style={label}>The value of a digit's position:</div>
              {S('place-value')}
            </div>
          </div>

        </div>
      </div>

      {/* The full number / Base-10 system label */}
      <div style={{ background: '#EBF8FF', border: '1px solid #BEE3F8', borderRadius: '8px', padding: '10px 14px' }}>
        <div style={{ fontSize: '11px', color: '#2C5282', marginBottom: '4px' }}>This whole number with a fractional part written using a dot — the number <strong>3.147</strong> is called:</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '22px', fontWeight: 'bold', fontFamily: 'monospace', color: '#2D3748' }}>3.147</span>
          <span style={{ color: '#718096' }}>→</span>
          {S('decimal')}
        </div>
      </div>

      {/* Standard form vs Expanded form */}
      <div style={{ display: 'flex', gap: '10px' }}>

        <div style={{ background: '#fff', border: '2px solid #3182CE', borderRadius: '10px', padding: '14px', flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: '#4A5568', marginBottom: '8px' }}>Digits written as a number in the usual way:</div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2D3748', fontFamily: 'monospace', marginBottom: '10px' }}>3.147</div>
          {S('standard-form')}
        </div>

        <div style={{ background: '#fff', border: '2px solid #38A169', borderRadius: '10px', padding: '14px', flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: '#4A5568', marginBottom: '8px' }}>Shows the value of each digit separately:</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2D3748', fontFamily: 'monospace', marginBottom: '4px' }}>3 + 0.1 + 0.04 + 0.007</div>
          <div style={{ fontSize: '13px', color: '#4A5568', marginBottom: '10px' }}>= 3 + 1/10 + 4/100 + 7/1000</div>
          {S('expanded-form')}
        </div>

      </div>

    </div>
  )
}
