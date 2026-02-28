import { useMemo } from 'react'
import { ExhibitProps } from '../../types'
import { InlineSlot } from '../dnd/InlineSlot'
import { shuffleArray } from '../../utils/shuffle'

export function Room1OperationsExhibit({ filledSlots, correctSlots, shakingSlot, accentColor }: ExhibitProps) {
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

  const rowStyle = { display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' as const, marginBottom: '8px' }
  const label = { fontSize: '12px', color: '#718096', marginBottom: '4px' }

  // Shuffle order computed once per mount
  const opsOrder = useMemo(() => shuffleArray(['addition', 'subtraction', 'multiplication', 'division']), [])
  const row2Order = useMemo(() => shuffleArray(['factor', 'estimate', 'round']), [])
  const compOrder = useMemo(() => shuffleArray(['less-than', 'greater-than', 'inequality']), [])
  const sectionOrder = useMemo(() => shuffleArray(['ops-row', 'row2', 'comparisons']), [])

  const renderOp = (id: string) => {
    switch (id) {
      case 'addition': return (
        <div key="addition" style={opBox('#2C7A7B')}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#2C7A7B', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Addition</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2D3748', marginBottom: '10px', fontFamily: 'monospace' }}>4 + 3 = 7</div>
          <div style={label}>Each number being added:</div>
          <div style={rowStyle}>{S('addend')}</div>
          <div style={label}>The answer:</div>
          <div style={rowStyle}>{S('sum')}</div>
        </div>
      )
      case 'subtraction': return (
        <div key="subtraction" style={opBox('#7B2D3E')}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#7B2D3E', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Subtraction</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2D3748', marginBottom: '10px', fontFamily: 'monospace' }}>9 − 4 = 5</div>
          <div style={label}>The answer:</div>
          <div style={rowStyle}>{S('difference')}</div>
        </div>
      )
      case 'multiplication': return (
        <div key="multiplication" style={opBox('#38A169')}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#38A169', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Multiplication</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2D3748', marginBottom: '10px', fontFamily: 'monospace' }}>6 × 7 = 42</div>
          <div style={label}>The answer:</div>
          <div style={rowStyle}>{S('product')}</div>
        </div>
      )
      case 'division': return (
        <div key="division" style={opBox('#553C9A')}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#553C9A', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Division</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2D3748', marginBottom: '10px', fontFamily: 'monospace' }}>12 ÷ 3 = 4</div>
          <div style={label}>The answer:</div>
          <div style={rowStyle}>{S('quotient')}</div>
        </div>
      )
      default: return null
    }
  }

  const renderRow2 = (id: string) => {
    switch (id) {
      case 'factor': return (
        <div key="factor" style={{ background: '#F5ECD7', border: '2px solid #C9A84C', borderRadius: '10px', padding: '14px', flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2D3748', marginBottom: '8px', fontFamily: 'monospace' }}>6 × 7 = 42</div>
          <div style={label}>6 and 7 are each a ___? (numbers you multiply together)</div>
          <div style={rowStyle}>{S('factor')}</div>
        </div>
      )
      case 'estimate': return (
        <div key="estimate" style={{ background: '#F5ECD7', border: '2px solid #C9A84C', borderRadius: '10px', padding: '14px', flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2D3748', marginBottom: '8px', fontFamily: 'monospace' }}>38 ≈ 40</div>
          <div style={label}>A close guess of the actual value:</div>
          <div style={rowStyle}>{S('estimate')}</div>
        </div>
      )
      case 'round': return (
        <div key="round" style={{ background: '#F5ECD7', border: '2px solid #C9A84C', borderRadius: '10px', padding: '14px', flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2D3748', marginBottom: '8px', fontFamily: 'monospace' }}>37 → 40</div>
          <div style={label}>Approximate to the nearest place value:</div>
          <div style={rowStyle}>{S('round')}</div>
        </div>
      )
      default: return null
    }
  }

  const renderComp = (id: string) => {
    switch (id) {
      case 'less-than': return (
        <div key="less-than">
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#7B2D3E', marginBottom: '6px', fontFamily: 'monospace' }}>3 &lt; 7</div>
          <div style={label}>Used when first number is smaller:</div>
          <div style={rowStyle}>{S('less-than')}</div>
        </div>
      )
      case 'greater-than': return (
        <div key="greater-than">
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#7B2D3E', marginBottom: '6px', fontFamily: 'monospace' }}>8 &gt; 2</div>
          <div style={label}>Used when first number is larger:</div>
          <div style={rowStyle}>{S('greater-than')}</div>
        </div>
      )
      case 'inequality': return (
        <div key="inequality">
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#7B2D3E', marginBottom: '6px', fontFamily: 'monospace' }}>3 ≠ 5</div>
          <div style={label}>A sentence comparing two quantities with &lt; or &gt;:</div>
          <div style={rowStyle}>{S('inequality')}</div>
        </div>
      )
      default: return null
    }
  }

  const sections: Record<string, React.ReactElement> = {
    'ops-row': (
      <div key="ops-row" style={{ display: 'flex', gap: '10px' }}>
        {opsOrder.map(renderOp)}
      </div>
    ),
    'row2': (
      <div key="row2" style={{ display: 'flex', gap: '10px' }}>
        {row2Order.map(renderRow2)}
      </div>
    ),
    'comparisons': (
      <div key="comparisons" style={{ background: '#EEF2F7', border: '2px solid #4A5568', borderRadius: '10px', padding: '14px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#4A5568', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Comparisons</div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {compOrder.map(renderComp)}
        </div>
      </div>
    ),
  }

  return (
    <div style={{ padding: '16px', background: '#FAF3E0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {sectionOrder.map(id => sections[id])}
    </div>
  )
}
