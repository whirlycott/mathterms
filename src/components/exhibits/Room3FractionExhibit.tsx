import { ExhibitProps } from '../../types'
import { InlineSlot } from '../dnd/InlineSlot'
import { Room3Numbers } from '../../utils/exhibitNumbers'

// Panel order is intentional for pedagogical reasons: the fraction bar panel
// (introducing numerator and denominator) must appear first, before fraction
// types (proper, improper, mixed), and well before equivalent fractions,
// benchmark fractions, reciprocal, and simplification — all of which assume
// the student already knows numerator and denominator.
// Do not randomize — foundational vocabulary must precede dependent concepts.
export function Room3FractionExhibit({ filledSlots, correctSlots, shakingSlot, accentColor, numbers }: ExhibitProps) {
  const n = numbers as Room3Numbers | undefined
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
  const card = (color: string) => ({
    background: '#fff', border: `2px solid ${color}`, borderRadius: '10px', padding: '14px', flex: 1,
  } as React.CSSProperties)

  return (
    <div style={{ padding: '16px', background: '#FAF3E0', display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* Row 1: Numerator / Denominator + Fraction types */}
      <div style={{ display: 'flex', gap: '12px' }}>

        {/* Fraction bar */}
        <div style={{ background: '#FEF9E7', border: '2px solid #C9A84C', borderRadius: '10px', padding: '16px', minWidth: '180px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#C9A84C', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>A Fraction: {n ? `${n.mainNum}/${n.mainDen}` : '¾'}</div>

          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#C9A84C', fontFamily: 'monospace', background: '#fff', border: '2px solid #C9A84C', borderRadius: '6px', padding: '4px 16px', marginBottom: '4px', display: 'inline-block' }}>{n?.mainNum ?? 3}</div>
            <div style={label}>Top number:</div>
            {S('numerator')}
          </div>

          <div style={{ borderTop: '3px solid #7B2D3E', margin: '8px 0' }} />

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#C9A84C', fontFamily: 'monospace', background: '#fff', border: '2px solid #C9A84C', borderRadius: '6px', padding: '4px 16px', marginBottom: '4px', display: 'inline-block' }}>{n?.mainDen ?? 4}</div>
            <div style={label}>Bottom number:</div>
            {S('denominator')}
          </div>
        </div>

        {/* Fraction types */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={card('#38A169')}>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#38A169', fontFamily: 'monospace', marginBottom: '6px' }}>{n ? n.proper.map(f => `${f.num}/${f.den}`).join(', ') : '½, ¾, 2/5'}</div>
            <div style={{ fontSize: '12px', color: '#4A5568', marginBottom: '6px' }}>top number <strong>less than</strong> bottom number</div>
            <div style={label}>This type of fraction:</div>
            {S('proper-fraction')}
          </div>

          <div style={card('#E53E3E')}>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#E53E3E', fontFamily: 'monospace', marginBottom: '6px' }}>{n ? n.improper.map(f => `${f.num}/${f.den}`).join(', ') : '5/3, 7/4, 9/2'}</div>
            <div style={{ fontSize: '12px', color: '#4A5568', marginBottom: '6px' }}>top number <strong>greater than or equal to</strong> bottom</div>
            <div style={label}>This type of fraction:</div>
            {S('improper-fraction')}
          </div>

          <div style={card('#805AD5')}>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#805AD5', fontFamily: 'monospace', marginBottom: '6px' }}>{n ? n.mixed.map(m => `${m.whole} ${m.num}/${m.den}`).join(', ') : '1½, 2⅓, 3¾'}</div>
            <div style={{ fontSize: '12px', color: '#4A5568', marginBottom: '6px' }}>a whole number <strong>and</strong> a fraction together</div>
            <div style={label}>This type of number:</div>
            {S('mixed-number')}
          </div>
        </div>
      </div>

      {/* Row 2: Equivalent + Benchmark + Reciprocal */}
      <div style={{ display: 'flex', gap: '10px' }}>

        <div style={{ background: '#E8F5E9', border: '2px solid #38A169', borderRadius: '10px', padding: '14px', flex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              <div style={{ width: '40px', height: '24px', background: '#38A169', opacity: 0.5, borderRadius: '3px' }} />
              <div style={{ width: '40px', height: '24px', background: '#E2E8F0', borderRadius: '3px' }} />
            </div>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>=</span>
            <div style={{ display: 'flex', gap: '1px' }}>
              <div style={{ width: '20px', height: '24px', background: '#38A169', opacity: 0.5, borderRadius: '3px' }} />
              <div style={{ width: '20px', height: '24px', background: '#38A169', opacity: 0.5, borderRadius: '3px' }} />
              <div style={{ width: '20px', height: '24px', background: '#E2E8F0', borderRadius: '3px' }} />
              <div style={{ width: '20px', height: '24px', background: '#E2E8F0', borderRadius: '3px' }} />
            </div>
          </div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#38A169', fontFamily: 'monospace', marginBottom: '6px' }}>{n ? `${n.eqBase.num}/${n.eqBase.den} = ${n.eqEquiv.num}/${n.eqEquiv.den}` : '½ = 2/4'}</div>
          <div style={label}>Different fractions naming the same amount:</div>
          {S('equivalent-fractions')}
        </div>

        <div style={{ background: '#EEF0FA', border: '2px solid #553C9A', borderRadius: '10px', padding: '14px', flex: 1 }}>
          <div style={{ fontSize: '14px', color: '#553C9A', fontFamily: 'monospace', marginBottom: '6px' }}>0 · ¼ · ½ · ¾ · 1</div>
          <div style={{ fontSize: '12px', color: '#4A5568', marginBottom: '6px' }}>common fractions used as reference points</div>
          <div style={label}>These are called:</div>
          {S('benchmark-fractions')}
        </div>

        <div style={{ background: '#EEF0FA', border: '2px solid #553C9A', borderRadius: '10px', padding: '14px', flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#553C9A', fontFamily: 'monospace', marginBottom: '6px' }}>{n ? `${n.recipNum}/${n.recipDen} → ${n.recipDen}/${n.recipNum}` : '¾ → 4/3'}</div>
          <div style={{ fontSize: '12px', color: '#4A5568', marginBottom: '6px' }}>flip top and bottom (multiplicative inverse)</div>
          <div style={label}>The flipped fraction:</div>
          {S('reciprocal')}
        </div>

      </div>

      {/* Row 3: Simplification */}
      <div style={{ background: '#F5ECD7', border: '2px solid #C9A84C', borderRadius: '10px', padding: '14px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#7B2D3E', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Reducing a Fraction</div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>

          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2D3748', fontFamily: 'monospace', marginBottom: '6px' }}>{n ? `${n.simpStart.num}/${n.simpStart.den} → ${n.simpMid.num}/${n.simpMid.den} → ${n.simpEnd.num}/${n.simpEnd.den}` : '4/8 → 2/4 → 1/2'}</div>
            <div style={label}>Express in simpler form:</div>
            {S('simplify')}
          </div>

          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2D3748', fontFamily: 'monospace', marginBottom: '6px' }}>{n ? <>{n.simpStart.num}/{n.simpStart.den} = <span style={{ color: '#38A169' }}>{n.simpEnd.num}/{n.simpEnd.den}</span></> : <>4/8 = <span style={{ color: '#38A169' }}>1/2</span></>}</div>
            <div style={label}>When pieces can't be reduced further:</div>
            {S('simplest-form')}
          </div>

          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2D3748', fontFamily: 'monospace', marginBottom: '6px' }}>{n ? <>{n.simpStart.num}/{n.simpStart.den} = <span style={{ color: '#2C7A7B' }}>{n.simpEnd.num}/{n.simpEnd.den}</span></> : <>4/8 = <span style={{ color: '#2C7A7B' }}>1/2</span></>}</div>
            <div style={label}>Also called (same as simplest form):</div>
            {S('lowest-terms')}
          </div>

          <div style={{ borderLeft: '2px solid #C9A84C', paddingLeft: '16px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2D3748', fontFamily: 'monospace', marginBottom: '4px' }}>{n ? `${n.likeNum1}/${n.likeDen} + ${n.likeNum2}/${n.likeDen}` : '¼ + 2/4'} (same bottom)</div>
              <div style={label}>Fractions with same bottom number:</div>
              {S('like-denominators')}
            </div>
            <div style={{ marginTop: '10px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2D3748', fontFamily: 'monospace', marginBottom: '4px' }}>{n ? `${n.unlikeNum1}/${n.unlikeDen1} + ${n.unlikeNum2}/${n.unlikeDen2}` : '⅓ + ¼'} (different bottom)</div>
              <div style={label}>Fractions with different bottom numbers:</div>
              {S('unlike-denominators')}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
