import React, { useMemo } from 'react'
import { ExhibitProps } from '../../types'
import { InlineSlot } from '../dnd/InlineSlot'
import { shuffleArray } from '../../utils/shuffle'

export function Room6ExpressionExhibit({ filledSlots, correctSlots, shakingSlot, accentColor }: ExhibitProps) {
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

  // Shuffle order computed once per mount
  const symbolsOrder = useMemo(() => shuffleArray(['parentheses', 'brackets', 'braces']), [])
  const midOrder = useMemo(() => shuffleArray(['expression', 'equation', 'evaluate']), [])
  const sectionOrder = useMemo(() => shuffleArray(['grouping', 'mid-row', 'order-ops']), [])

  const renderSymbol = (id: string) => {
    switch (id) {
      case 'parentheses': return (
        <div key="parentheses" style={{ textAlign: 'center', background: '#fff', border: '2px solid #3182CE', borderRadius: '8px', padding: '12px 16px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3182CE', fontFamily: 'monospace', lineHeight: 1, marginBottom: '6px' }}>( )</div>
          <div style={{ fontSize: '11px', color: '#4A5568', marginBottom: '6px' }}>round symbols<br />innermost — solve first</div>
          <div style={label}>These symbols:</div>
          {S('parentheses')}
        </div>
      )
      case 'brackets': return (
        <div key="brackets" style={{ textAlign: 'center', background: '#fff', border: '2px solid #DD6B20', borderRadius: '8px', padding: '12px 16px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#DD6B20', fontFamily: 'monospace', lineHeight: 1, marginBottom: '6px' }}>[ ]</div>
          <div style={{ fontSize: '11px', color: '#4A5568', marginBottom: '6px' }}>square symbols<br />used when ( ) isn't enough</div>
          <div style={label}>These symbols:</div>
          {S('brackets')}
        </div>
      )
      case 'braces': return (
        <div key="braces" style={{ textAlign: 'center', background: '#fff', border: '2px solid #E53E3E', borderRadius: '8px', padding: '12px 16px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#E53E3E', fontFamily: 'monospace', lineHeight: 1, marginBottom: '6px' }}>{'{ }'}</div>
          <div style={{ fontSize: '11px', color: '#4A5568', marginBottom: '6px' }}>curly symbols<br />outermost — solve last</div>
          <div style={label}>These symbols:</div>
          {S('braces')}
        </div>
      )
      default: return null
    }
  }

  const renderMid = (id: string) => {
    switch (id) {
      case 'expression': return (
        <div key="expression" style={{ background: '#fff', border: '2px solid #805AD5', borderRadius: '10px', padding: '14px', flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#805AD5', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>No Equal Sign</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#553C9A', fontFamily: 'monospace', marginBottom: '8px' }}>3 × (4 + 2)</div>
          <div style={{ fontSize: '12px', color: '#4A5568', marginBottom: '8px' }}>A math phrase — operations without an = sign</div>
          <div style={label}>A math phrase with no equal sign:</div>
          {S('expression')}
        </div>
      )
      case 'equation': return (
        <div key="equation" style={{ background: '#fff', border: '2px solid #38A169', borderRadius: '10px', padding: '14px', flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#38A169', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Has an Equal Sign</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#276749', fontFamily: 'monospace', marginBottom: '8px' }}>3×(4+2) = 18</div>
          <div style={{ fontSize: '12px', color: '#4A5568', marginBottom: '8px' }}>A number sentence — both sides balance</div>
          <div style={label}>A number sentence with an = sign:</div>
          {S('equation')}
        </div>
      )
      case 'evaluate': return (
        <div key="evaluate" style={{ background: '#fff', border: '2px solid #3182CE', borderRadius: '10px', padding: '14px', flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#3182CE', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Finding the Value</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2D3748', fontFamily: 'monospace', marginBottom: '8px' }}>3×(4+2) = <span style={{ color: '#3182CE' }}>18</span></div>
          <div style={{ fontSize: '12px', color: '#4A5568', marginBottom: '8px' }}>Substitute numbers → find the answer</div>
          <div style={label}>To find the value of an expression:</div>
          {S('evaluate')}
        </div>
      )
      default: return null
    }
  }

  const sections: Record<string, React.ReactElement> = {
    'grouping': (
      <div key="grouping" style={{ background: '#F0FFF4', border: '2px solid #38A169', borderRadius: '10px', padding: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#38A169', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Grouping Symbols (from innermost to outermost)</div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {symbolsOrder.map(renderSymbol)}
          {/* Example box — fixed, not a term slot */}
          <div style={{ background: '#E6FFFA', border: '2px solid #38A169', borderRadius: '8px', padding: '12px 16px', flex: 1, minWidth: '200px' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2D3748', fontFamily: 'monospace', marginBottom: '8px' }}>{'{ 3×[(4+2)÷3]−1 }'}</div>
            <div style={{ fontSize: '11px', color: '#4A5568', lineHeight: 1.6 }}>
              1. Solve <strong style={{ color: '#3182CE' }}>(4+2)</strong> = 6<br />
              2. Solve <strong style={{ color: '#DD6B20' }}>[6÷3]</strong> = 2<br />
              3. Solve <strong style={{ color: '#E53E3E' }}>{'{'}</strong>3×2−1<strong style={{ color: '#E53E3E' }}>{'}'}</strong> = 5
            </div>
          </div>
        </div>
      </div>
    ),
    'mid-row': (
      <div key="mid-row" style={{ display: 'flex', gap: '10px' }}>
        {midOrder.map(renderMid)}
      </div>
    ),
    'order-ops': (
      /* Sequential step list — order carries meaning, not shuffled */
      <div key="order-ops" style={{ background: '#F5ECD7', border: '2px solid #C9A84C', borderRadius: '10px', padding: '14px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#7B2D3E', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Which Operations Go First?</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
          {[
            { step: '1', label: '( )', color: '#3182CE' },
            { step: '2', label: '[ ]', color: '#DD6B20' },
            { step: '3', label: '{ }', color: '#E53E3E' },
            { step: '4', label: '× ÷', color: '#805AD5' },
            { step: '5', label: '+ −', color: '#38A169' },
          ].map(({ step, label: lbl, color }, i, arr) => (
            <React.Fragment key={step}>
              <div style={{ background: '#fff', border: `2px solid ${color}`, borderRadius: '8px', padding: '8px 12px', textAlign: 'center', minWidth: '60px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color, marginBottom: '2px' }}>Step {step}</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'monospace', color: '#2D3748' }}>{lbl}</div>
              </div>
              {i < arr.length - 1 && <div style={{ fontSize: '18px', color: '#A0AEC0' }}>→</div>}
            </React.Fragment>
          ))}
        </div>
        <div style={{ fontSize: '12px', color: '#718096', marginBottom: '6px' }}>This system of rules for which operations to do first:</div>
        {S('order-of-operation')}
      </div>
    ),
  }

  return (
    <div style={{ padding: '16px', background: '#FAF3E0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {sectionOrder.map(id => sections[id])}
    </div>
  )
}
