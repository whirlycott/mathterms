import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { BonusQuestion } from './BonusQuestion'
import type { BonusQuestion as BonusQuestionType } from '../../types'

// The component uses setTimeout for feedback delays; fake timers let us control them.
beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

const sampleQuestion: BonusQuestionType = {
  question: 'What is the answer to an addition problem called?',
  options: ['Product', 'Sum', 'Quotient', 'Difference'],
  correctIndex: 1,
}

describe('BonusQuestion', () => {
  it('renders the question text', () => {
    render(<BonusQuestion question={sampleQuestion} onAnswer={vi.fn()} />)
    expect(screen.getByText(sampleQuestion.question)).toBeInTheDocument()
  })

  it('renders all four answer options', () => {
    render(<BonusQuestion question={sampleQuestion} onAnswer={vi.fn()} />)
    for (const opt of sampleQuestion.options) {
      expect(screen.getByText(opt)).toBeInTheDocument()
    }
  })

  it('calls onAnswer(true) after selecting the correct answer on first try', () => {
    const onAnswer = vi.fn()
    render(<BonusQuestion question={sampleQuestion} onAnswer={onAnswer} />)

    act(() => { fireEvent.click(screen.getByText('Sum')) })

    // onAnswer is deferred by 800 ms
    expect(onAnswer).not.toHaveBeenCalled()
    act(() => { vi.advanceTimersByTime(800) })
    expect(onAnswer).toHaveBeenCalledWith(true)
  })

  it('shows a checkmark on the correct option after a correct answer', () => {
    render(<BonusQuestion question={sampleQuestion} onAnswer={vi.fn()} />)
    act(() => { fireEvent.click(screen.getByText('Sum')) })
    expect(screen.getByText('Sum ✓')).toBeInTheDocument()
  })

  it('shows an X on the wrong option after an incorrect answer', () => {
    render(<BonusQuestion question={sampleQuestion} onAnswer={vi.fn()} />)
    act(() => { fireEvent.click(screen.getByText('Product')) })
    expect(screen.getByText('Product ✗')).toBeInTheDocument()
  })

  it('shows "tries remaining" feedback after a wrong answer', () => {
    render(<BonusQuestion question={sampleQuestion} onAnswer={vi.fn()} />)
    act(() => { fireEvent.click(screen.getByText('Product')) })
    expect(screen.getByText(/tries remaining/i)).toBeInTheDocument()
  })

  it('allows a second attempt after a wrong answer', () => {
    const onAnswer = vi.fn()
    render(<BonusQuestion question={sampleQuestion} onAnswer={onAnswer} />)

    // First attempt — wrong
    act(() => { fireEvent.click(screen.getByText('Product')) })
    // Wait for the 1200 ms reset timeout
    act(() => { vi.advanceTimersByTime(1200) })

    // Second attempt — correct
    act(() => { fireEvent.click(screen.getByText('Sum')) })
    act(() => { vi.advanceTimersByTime(800) })
    expect(onAnswer).toHaveBeenCalledWith(true)
  })

  it('calls onAnswer(false) after exhausting all 3 attempts', () => {
    const onAnswer = vi.fn()
    render(<BonusQuestion question={sampleQuestion} onAnswer={onAnswer} />)

    // Attempt 1 — wrong
    act(() => { fireEvent.click(screen.getByText('Product')) })
    act(() => { vi.advanceTimersByTime(1200) })

    // Attempt 2 — wrong
    act(() => { fireEvent.click(screen.getByText('Quotient')) })
    act(() => { vi.advanceTimersByTime(1200) })

    // Attempt 3 — wrong (exhausts all tries)
    act(() => { fireEvent.click(screen.getByText('Difference')) })
    act(() => { vi.advanceTimersByTime(800) })

    expect(onAnswer).toHaveBeenCalledWith(false)
  })

  it('reveals the correct answer after all attempts are exhausted', () => {
    render(<BonusQuestion question={sampleQuestion} onAnswer={vi.fn()} />)

    act(() => { fireEvent.click(screen.getByText('Product')) })
    act(() => { vi.advanceTimersByTime(1200) })
    act(() => { fireEvent.click(screen.getByText('Quotient')) })
    act(() => { vi.advanceTimersByTime(1200) })
    act(() => { fireEvent.click(screen.getByText('Difference')) })

    // After 3rd wrong answer the correct option should get a checkmark
    expect(screen.getByText('Sum ✓')).toBeInTheDocument()
  })

  it('disables buttons after a selection is made', () => {
    render(<BonusQuestion question={sampleQuestion} onAnswer={vi.fn()} />)
    act(() => { fireEvent.click(screen.getByText('Sum')) })
    const buttons = screen.getAllByRole('button')
    for (const btn of buttons) {
      expect(btn).toBeDisabled()
    }
  })

  it('does not call onAnswer a second time when a button is clicked while disabled', () => {
    const onAnswer = vi.fn()
    render(<BonusQuestion question={sampleQuestion} onAnswer={onAnswer} />)
    act(() => { fireEvent.click(screen.getByText('Sum')) })
    // Clicking again before the timer fires — button is disabled so this is a no-op
    fireEvent.click(screen.getByText('Product'))
    act(() => { vi.advanceTimersByTime(800) })
    expect(onAnswer).toHaveBeenCalledTimes(1)
  })
})
