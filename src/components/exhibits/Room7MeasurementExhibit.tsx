import { useMemo } from 'react'
import { ExhibitProps } from '../../types'
import { InlineSlot } from '../dnd/InlineSlot'
import { shuffleArray } from '../../utils/shuffle'

export function Room7MeasurementExhibit({ filledSlots, correctSlots, shakingSlot, accentColor }: ExhibitProps) {
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
  const card = (color: string) => ({ background: '#fff', border: `2px solid ${color}`, borderRadius: '10px', padding: '14px', flex: 1 } as React.CSSProperties)

  // Shuffle order computed once per mount
  const row1Order = useMemo(() => shuffleArray(['area', 'area-model', 'bar-model', 'attribute']), [])
  const row3Order = useMemo(() => shuffleArray(['cubic-unit', 'number-line']), [])
  const sectionOrder = useMemo(() => shuffleArray(['row1', 'metric', 'row3']), [])

  const renderRow1 = (id: string) => {
    switch (id) {
      case 'area': return (
        <div key="area" style={card('#DD6B20')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '64px', height: '44px', background: '#FED7AA', border: '2px solid #DD6B20', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#7B341E' }}>l × w</div>
            <div>
              <div style={{ fontSize: '13px', color: '#4A5568' }}>sq. units covering a shape</div>
            </div>
          </div>
          <div style={label}>The number of square units covering a shape:</div>
          {S('area')}
        </div>
      )
      case 'area-model': return (
        <div key="area-model" style={card('#DD6B20')}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', width: '80px', marginBottom: '8px' }}>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} style={{ height: '16px', background: '#FED7AA', border: '1px solid #DD6B20' }} />
            ))}
          </div>
          <div style={{ fontSize: '13px', color: '#4A5568', marginBottom: '8px' }}>pictorial grid showing multiplication</div>
          <div style={label}>A picture grid for multiplication:</div>
          {S('area-model')}
        </div>
      )
      case 'bar-model': return (
        <div key="bar-model" style={card('#DD6B20')}>
          <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', gap: '2px', marginBottom: '2px' }}>
              <div style={{ flex: 1, height: '24px', background: '#FED7AA', border: '1px solid #DD6B20', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#7B341E' }}>Part</div>
              <div style={{ flex: 1, height: '24px', background: '#FEEBC8', border: '1px solid #DD6B20', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#7B341E' }}>Part</div>
            </div>
            <div style={{ height: '20px', background: '#FBD38D', border: '1px solid #C05621', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#7B341E' }}>Whole</div>
          </div>
          <div style={{ fontSize: '13px', color: '#4A5568', marginBottom: '8px' }}>a visual diagram for word problems</div>
          <div style={label}>A visual model for word problems:</div>
          {S('bar-model')}
        </div>
      )
      case 'attribute': return (
        <div key="attribute" style={{ background: '#FFF3E6', border: '2px solid #DD6B20', borderRadius: '10px', padding: '14px', flex: 1 }}>
          <div style={{ fontSize: '13px', color: '#4A5568', marginBottom: '8px' }}>
            <strong>Color:</strong> red<br />
            <strong>Shape:</strong> circle<br />
            <strong>Size:</strong> small
          </div>
          <div style={label}>A characteristic of an object (color, shape, size):</div>
          {S('attribute')}
        </div>
      )
      default: return null
    }
  }

  const renderRow3 = (id: string) => {
    switch (id) {
      case 'cubic-unit': return (
        <div key="cubic-unit" style={{ background: '#EEF0FA', border: '2px solid #553C9A', borderRadius: '10px', padding: '14px', flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '6px' }}>⬛</div>
          <div style={{ fontSize: '13px', color: '#4A5568', marginBottom: '8px' }}>1 unit × 1 unit × 1 unit cube — measures volume</div>
          <div style={label}>A unit for measuring volume:</div>
          {S('cubic-unit')}
        </div>
      )
      case 'number-line': return (
        <div key="number-line" style={{ background: '#F0FFF4', border: '2px solid #38A169', borderRadius: '10px', padding: '14px', flex: 2 }}>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', height: '32px' }}>
              <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: '#38A169', top: '50%' }} />
              {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
                <div key={n} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '2px', height: '10px', background: '#38A169' }} />
                  <div style={{ fontSize: '10px', color: '#276749', marginTop: '2px' }}>{n}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: '13px', color: '#4A5568', marginBottom: '8px' }}>numbers placed at their correct position on a straight line</div>
          <div style={label}>A line with numbers at their correct positions:</div>
          {S('number-line')}
        </div>
      )
      default: return null
    }
  }

  const sections: Record<string, React.ReactElement> = {
    'row1': (
      <div key="row1" style={{ display: 'flex', gap: '10px' }}>
        {row1Order.map(renderRow1)}
      </div>
    ),
    'metric': (
      /* Metric unit progression (mm→cm→dm→m) carries scale meaning — panels kept in order */
      <div key="metric" style={{ background: '#E6F4FF', border: '2px solid #3182CE', borderRadius: '10px', padding: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#3182CE', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Units of Length</div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {[
            { val: '1 mm', desc: '1/10 of a cm · tiny', id: 'millimeter' },
            { val: '10 mm = 1 cm', desc: '100 cm = 1 m', id: 'centimeter' },
            { val: '10 cm = 1 dm', desc: '1/10 of a meter', id: 'decimeter' },
            { val: '100 cm = 1 m', desc: 'basic unit of length', id: 'meter' },
          ].map(({ val, desc, id }) => (
            <div key={id} style={{ background: '#fff', border: '2px solid #3182CE', borderRadius: '8px', padding: '10px 14px', textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#2B6CB0', fontFamily: 'monospace', marginBottom: '4px' }}>{val}</div>
              <div style={{ fontSize: '11px', color: '#4A5568', marginBottom: '8px' }}>{desc}</div>
              {S(id)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #BEE3F8', paddingTop: '10px' }}>
          <div style={{ fontSize: '13px', color: '#4A5568', marginBottom: '6px' }}>1 m = 10 dm = 100 cm = 1,000 mm — a base-10 system of measuring:</div>
          {S('metric-system')}
        </div>
      </div>
    ),
    'row3': (
      <div key="row3" style={{ display: 'flex', gap: '10px' }}>
        {row3Order.map(renderRow3)}
      </div>
    ),
  }

  return (
    <div style={{ padding: '16px', background: '#FAF3E0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {sectionOrder.map(id => sections[id])}
    </div>
  )
}
