import { ExhibitProps } from '../../types'
import { InlineSlot } from '../dnd/InlineSlot'

export function Room8CoordinateExhibit({ filledSlots, correctSlots, shakingSlot, accentColor }: ExhibitProps) {
  const S = (id: string) => (
    <InlineSlot
      id={id}
      displayTerm={filledSlots[id] ?? null}
      isCorrect={correctSlots.includes(id)}
      isShaking={shakingSlot === id}
      accentColor={accentColor}
    />
  )

  return (
    <div style={{ padding: '16px', background: '#FAF3E0', display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* Coordinate plane concepts */}
      <div style={{ background: '#EEF0FA', border: '2px solid #553C9A', borderRadius: '10px', padding: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#553C9A', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>The Coordinate Grid</div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Mini coordinate plane diagram */}
          <div style={{ position: 'relative', width: '180px', height: '180px', background: '#fff', border: '2px solid #553C9A', borderRadius: '8px', flexShrink: 0 }}>
            {/* Grid lines */}
            {[0,1,2,3,4].map(i => (
              <div key={`v${i}`} style={{ position: 'absolute', left: `${i*25}%`, top: 0, bottom: 0, width: '1px', background: '#E9D8FD' }} />
            ))}
            {[0,1,2,3,4].map(i => (
              <div key={`h${i}`} style={{ position: 'absolute', top: `${i*25}%`, left: 0, right: 0, height: '1px', background: '#E9D8FD' }} />
            ))}
            {/* Axes */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: '#553C9A' }} />
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: '#553C9A' }} />
            {/* Labels */}
            <div style={{ position: 'absolute', right: '2px', top: '47%', fontSize: '12px', fontWeight: 'bold', color: '#553C9A' }}>x</div>
            <div style={{ position: 'absolute', left: '48%', top: '2px', fontSize: '12px', fontWeight: 'bold', color: '#553C9A' }}>y</div>
            {/* Point */}
            <div style={{ position: 'absolute', left: '72%', top: '26%', width: '10px', height: '10px', borderRadius: '50%', background: '#E53E3E', transform: 'translate(-50%,-50%)' }} />
            <div style={{ position: 'absolute', left: '74%', top: '20%', fontSize: '10px', fontWeight: 'bold', color: '#E53E3E' }}>(3,4)</div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>

            <div style={{ background: '#F8F4FF', border: '1px solid #D6BCFA', borderRadius: '8px', padding: '10px' }}>
              <div style={{ fontSize: '13px', color: '#4A5568', marginBottom: '6px' }}>The flat surface formed by horizontal and vertical number lines intersecting at right angles:</div>
              {S('coordinate-plane')}
            </div>

            <div style={{ background: '#F8F4FF', border: '1px solid #D6BCFA', borderRadius: '8px', padding: '10px' }}>
              <div style={{ fontSize: '13px', color: '#4A5568', marginBottom: '4px' }}>The horizontal (x) and vertical (y) number lines on the grid:</div>
              {S('axis')}
            </div>

            <div style={{ background: '#FFF5F5', border: '1px solid #FEB2B2', borderRadius: '8px', padding: '10px' }}>
              <div style={{ fontSize: '13px', fontFamily: 'monospace', fontWeight: 'bold', color: '#E53E3E', marginBottom: '4px' }}>(3, 4)</div>
              <div style={{ fontSize: '13px', color: '#4A5568', marginBottom: '6px' }}>A pair of numbers that give the exact location of a point on the grid:</div>
              {S('coordinates')}
            </div>

            <div style={{ background: '#F8F4FF', border: '1px solid #D6BCFA', borderRadius: '8px', padding: '10px' }}>
              <div style={{ fontSize: '13px', color: '#4A5568', marginBottom: '6px' }}>The overall method of locating points using intersecting number lines:</div>
              {S('coordinate-system')}
            </div>

          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'flex', gap: '10px' }}>

        {/* Corresponding terms */}
        <div style={{ background: '#F0FFF4', border: '2px solid #38A169', borderRadius: '10px', padding: '14px', flex: 2 }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#38A169', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Two Sequences</div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#276749', marginBottom: '4px' }}>Rule A</div>
              {[2,4,6,8].map(n => (
                <div key={n} style={{ background: '#C6F6D5', borderRadius: '4px', padding: '2px 12px', marginBottom: '2px', fontSize: '14px', fontWeight: 'bold', color: '#276749' }}>{n}</div>
              ))}
            </div>
            <div style={{ fontSize: '20px', color: '#4A5568' }}>↔</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#C05621', marginBottom: '4px' }}>Rule B</div>
              {[3,6,9,12].map(n => (
                <div key={n} style={{ background: '#FEEBC8', borderRadius: '4px', padding: '2px 12px', marginBottom: '2px', fontSize: '14px', fontWeight: 'bold', color: '#C05621' }}>{n}</div>
              ))}
            </div>
            <div style={{ fontSize: '12px', color: '#4A5568' }}>2↔3, 4↔6 are terms<br />in the <strong>same position</strong></div>
          </div>
          <div style={{ fontSize: '12px', color: '#718096', marginBottom: '6px' }}>Terms that are in the same position in two sequences:</div>
          {S('corresponding-terms')}
        </div>

        {/* Base of solid figure */}
        <div style={{ background: '#EEF0FA', border: '2px solid #805AD5', borderRadius: '10px', padding: '14px', flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#805AD5', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>A 3D Shape</div>
          <svg width="80" height="70" viewBox="0 0 80 70" style={{ marginBottom: '6px' }}>
            <rect x="10" y="25" width="45" height="35" rx="2" fill="#D6BCFA" stroke="#805AD5" strokeWidth="1.5"/>
            <polygon points="10,25 30,10 75,10 55,25" fill="#B794F4" stroke="#805AD5" strokeWidth="1.5"/>
            <polygon points="55,25 75,10 75,45 55,60" fill="#9F7AEA" stroke="#805AD5" strokeWidth="1.5"/>
            <rect x="10" y="59" width="45" height="5" rx="1" fill="#E53E3E" opacity="0.8"/>
            <text x="32" y="75" textAnchor="middle" fontSize="9" fill="#E53E3E">face it rests on</text>
          </svg>
          <div style={{ fontSize: '12px', color: '#4A5568', marginBottom: '8px' }}>The face a solid figure rests on (highlighted in red)</div>
          <div style={{ fontSize: '12px', color: '#718096', marginBottom: '6px' }}>This face:</div>
          {S('base-of-a-solid-figure')}
        </div>

        {/* Base of exponent */}
        <div style={{ background: '#FFF5E6', border: '2px solid #DD6B20', borderRadius: '10px', padding: '14px', flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#DD6B20', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>A Power Expression</div>
          <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#DD6B20', fontFamily: 'monospace', lineHeight: 1, marginBottom: '4px', position: 'relative', display: 'inline-block' }}>
            2<sup style={{ fontSize: '24px', color: '#4A5568' }}>3</sup>
          </div>
          <div style={{ fontSize: '11px', color: '#E53E3E', marginBottom: '8px' }}>↑ this number (2)</div>
          <div style={{ fontSize: '12px', color: '#4A5568', marginBottom: '8px' }}>The number being raised to a power:</div>
          {S('base-of-an-exponent')}
        </div>

      </div>
    </div>
  )
}
