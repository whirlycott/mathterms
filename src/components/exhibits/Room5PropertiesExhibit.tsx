import { useMemo } from 'react'
import { ExhibitProps } from '../../types'
import { InlineSlot } from '../dnd/InlineSlot'
import { shuffleArray } from '../../utils/shuffle'

export function Room5PropertiesExhibit({ filledSlots, correctSlots, shakingSlot, accentColor }: ExhibitProps) {
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

  const panel = (bg: string, border: string) => ({
    background: bg, border: `2px solid ${border}`, borderRadius: '10px', padding: '14px', flex: 1,
  } as React.CSSProperties)

  // Shuffle order computed once per mount
  const commutativeOrder = useMemo(() => shuffleArray(['commutative-add', 'commutative-mult']), [])
  const associativeOrder = useMemo(() => shuffleArray(['associative-add', 'associative-mult']), [])
  const sectionOrder = useMemo(() => shuffleArray(['commutative-row', 'associative-row', 'distributive']), [])

  const renderCommutative = (id: string) => {
    switch (id) {
      case 'commutative-add': return (
        <div key="commutative-add" style={panel('#F3EEFF', '#805AD5')}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#805AD5', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Addition — Order</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#553C9A', fontFamily: 'monospace', marginBottom: '8px' }}>3 + 5 = 5 + 3</div>
          <div style={{ fontSize: '12px', color: '#4A5568', marginBottom: '8px' }}>Swap the order of the addends → same sum<br /><em>a + b = b + a</em></div>
          <div style={label}>The rule that lets you swap the order when adding:</div>
          {S('commutative-property-of-addition')}
        </div>
      )
      case 'commutative-mult': return (
        <div key="commutative-mult" style={panel('#F3EEFF', '#805AD5')}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#805AD5', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Multiplication — Order</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#553C9A', fontFamily: 'monospace', marginBottom: '8px' }}>4 × 6 = 6 × 4</div>
          <div style={{ fontSize: '12px', color: '#4A5568', marginBottom: '8px' }}>Swap the order of the factors → same product<br /><em>a × b = b × a</em></div>
          <div style={label}>The rule that lets you swap the order when multiplying:</div>
          {S('commutative-property-of-multiplication')}
        </div>
      )
      default: return null
    }
  }

  const renderAssociative = (id: string) => {
    switch (id) {
      case 'associative-add': return (
        <div key="associative-add" style={panel('#EBF5FF', '#3182CE')}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#3182CE', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Addition — Grouping</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2B6CB0', fontFamily: 'monospace', marginBottom: '8px' }}>(2+3)+4 = 2+(3+4)</div>
          <div style={{ fontSize: '12px', color: '#4A5568', marginBottom: '8px' }}>Change how you group addends → same sum<br /><em>(a+b)+c = a+(b+c)</em></div>
          <div style={label}>The rule that lets you regroup when adding:</div>
          {S('associative-property-of-addition')}
        </div>
      )
      case 'associative-mult': return (
        <div key="associative-mult" style={panel('#EBF5FF', '#3182CE')}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#3182CE', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Multiplication — Grouping</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2B6CB0', fontFamily: 'monospace', marginBottom: '8px' }}>(2×3)×4 = 2×(3×4)</div>
          <div style={{ fontSize: '12px', color: '#4A5568', marginBottom: '8px' }}>Change how you group factors → same product<br /><em>(a×b)×c = a×(b×c)</em></div>
          <div style={label}>The rule that lets you regroup when multiplying:</div>
          {S('associative-property-of-multiplication')}
        </div>
      )
      default: return null
    }
  }

  const sections: Record<string, React.ReactElement> = {
    'commutative-row': (
      <div key="commutative-row" style={{ display: 'flex', gap: '10px' }}>
        {commutativeOrder.map(renderCommutative)}
      </div>
    ),
    'associative-row': (
      <div key="associative-row" style={{ display: 'flex', gap: '10px' }}>
        {associativeOrder.map(renderAssociative)}
      </div>
    ),
    'distributive': (
      <div key="distributive" style={panel('#FFF5E6', '#DD6B20')}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#DD6B20', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Spreading Multiplication Over Addition</div>
        <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#C05621', fontFamily: 'monospace', marginBottom: '8px' }}>3×(4+2) = 3×4 + 3×2 = 18</div>
        <div style={{ fontSize: '12px', color: '#4A5568', marginBottom: '8px' }}>Multiply each addend separately, then add the products<br /><em>a×(b+c) = a×b + a×c</em></div>
        <div style={label}>The rule that lets you multiply across a sum:</div>
        {S('distributive-property')}
      </div>
    ),
  }

  return (
    <div style={{ padding: '16px', background: '#FAF3E0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {sectionOrder.map(id => sections[id])}
    </div>
  )
}
