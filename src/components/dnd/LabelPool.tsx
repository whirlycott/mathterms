import { DraggableLabel } from './DraggableLabel'
import { TermRecord } from '../../types'

interface Props {
  terms: TermRecord[]
  placedIds: Set<string>
}

export function LabelPool({ terms, placedIds }: Props) {
  const available = terms.filter(t => !placedIds.has(t.id))

  return (
    <div style={{
      background: '#F5ECD7',
      borderRadius: '12px',
      padding: '12px 16px',
      border: '1px solid #C9A84C',
      minHeight: '80px',
    }}>
      <div style={{
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: '#7B2D3E',
        marginBottom: '10px',
      }}>
        Scrambled Labels ({available.length} remaining)
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        {available.map(term => (
          <DraggableLabel
            key={term.id}
            id={term.id}
            displayTerm={term.displayTerm}
          />
        ))}
        {available.length === 0 && (
          <div style={{ color: '#38A169', fontWeight: 600, fontSize: '14px' }}>
            All labels placed correctly!
          </div>
        )}
      </div>
    </div>
  )
}
