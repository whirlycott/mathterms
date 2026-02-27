import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LabelPool } from './LabelPool'
import type { TermRecord } from '../../types'

// DraggableLabel uses @dnd-kit/core's useDraggable hook, which requires a
// DndContext ancestor. We mock the DraggableLabel at the module level so the
// LabelPool tests stay focused on filtering and rendering logic.
vi.mock('./DraggableLabel', () => ({
  DraggableLabel: ({ displayTerm }: { displayTerm: string }) => (
    <span data-testid="draggable-label">{displayTerm}</span>
  ),
}))

const sampleTerms: TermRecord[] = [
  { id: 'sum',        displayTerm: 'Sum',        definition: 'The answer to an addition problem', roomId: 'operations' },
  { id: 'difference', displayTerm: 'Difference', definition: 'The result of subtraction',         roomId: 'operations' },
  { id: 'product',    displayTerm: 'Product',    definition: 'The result of multiplication',      roomId: 'operations' },
]

describe('LabelPool', () => {
  it('renders all terms when none are placed', () => {
    render(<LabelPool terms={sampleTerms} placedIds={new Set()} />)
    expect(screen.getByText('Sum')).toBeInTheDocument()
    expect(screen.getByText('Difference')).toBeInTheDocument()
    expect(screen.getByText('Product')).toBeInTheDocument()
  })

  it('shows the count of remaining labels', () => {
    render(<LabelPool terms={sampleTerms} placedIds={new Set()} />)
    expect(screen.getByText(/3 remaining/)).toBeInTheDocument()
  })

  it('filters out terms whose ids are in placedIds', () => {
    render(<LabelPool terms={sampleTerms} placedIds={new Set(['sum'])} />)
    expect(screen.queryByText('Sum')).not.toBeInTheDocument()
    expect(screen.getByText('Difference')).toBeInTheDocument()
    expect(screen.getByText('Product')).toBeInTheDocument()
  })

  it('updates the remaining count when some terms are placed', () => {
    render(<LabelPool terms={sampleTerms} placedIds={new Set(['sum', 'difference'])} />)
    expect(screen.getByText(/1 remaining/)).toBeInTheDocument()
  })

  it('shows the "all placed" message when every term is placed', () => {
    const allIds = new Set(sampleTerms.map(t => t.id))
    render(<LabelPool terms={sampleTerms} placedIds={allIds} />)
    expect(screen.getByText(/all labels placed correctly/i)).toBeInTheDocument()
  })

  it('does not render any draggable labels when all are placed', () => {
    const allIds = new Set(sampleTerms.map(t => t.id))
    render(<LabelPool terms={sampleTerms} placedIds={allIds} />)
    expect(screen.queryAllByTestId('draggable-label')).toHaveLength(0)
  })

  it('renders correctly with an empty terms array', () => {
    render(<LabelPool terms={[]} placedIds={new Set()} />)
    expect(screen.getByText(/0 remaining/)).toBeInTheDocument()
    expect(screen.getByText(/all labels placed correctly/i)).toBeInTheDocument()
  })

  it('renders a DraggableLabel for each available term', () => {
    render(<LabelPool terms={sampleTerms} placedIds={new Set(['sum'])} />)
    const labels = screen.getAllByTestId('draggable-label')
    expect(labels).toHaveLength(2)
  })
})
