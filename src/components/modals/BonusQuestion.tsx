import { useState } from 'react'
import { BonusQuestion as BonusQuestionType } from '../../types'

const MAX_ATTEMPTS = 3

interface Props {
  question: BonusQuestionType
  onAnswer: (correct: boolean) => void
}

export function BonusQuestion({ question, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [attempts, setAttempts] = useState(0)

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    const correct = idx === question.correctIndex
    const nextAttempts = attempts + 1
    setAttempts(nextAttempts)
    setSelected(idx)

    if (correct || nextAttempts >= MAX_ATTEMPTS) {
      setTimeout(() => onAnswer(correct), 800)
    } else {
      // Wrong with tries remaining — show feedback briefly, then reset
      setTimeout(() => setSelected(null), 1200)
    }
  }

  const exhausted = attempts >= MAX_ATTEMPTS
  const showFeedback = selected !== null
  // Only reveal the correct answer when the player got it right or is out of tries
  const revealCorrect = showFeedback && (selected === question.correctIndex || exhausted)
  const triesLeft = MAX_ATTEMPTS - attempts

  return (
    <div style={{ padding: '8px 0' }}>
      <div style={{
        fontSize: '14px',
        fontWeight: 600,
        color: '#2D3748',
        marginBottom: '16px',
        lineHeight: 1.5,
      }}>
        {question.question}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {question.options.map((opt, idx) => {
          const isSelected = selected === idx
          const isCorrect = idx === question.correctIndex
          let bg = '#F5ECD7'
          let border = '#C9A84C'
          if (showFeedback) {
            if (revealCorrect && isCorrect) { bg = '#C6F6D5'; border = '#38A169' }
            else if (isSelected && !isCorrect) { bg = '#FED7D7'; border = '#E53E3E' }
          }
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: `2px solid ${border}`,
                background: isSelected && showFeedback ? bg : '#F5ECD7',
                cursor: selected !== null ? 'default' : 'pointer',
                textAlign: 'left',
                fontSize: '13px',
                color: '#2D3748',
                transition: 'background 0.2s',
                fontWeight: revealCorrect && isCorrect ? 700 : 400,
              }}
            >
              {opt}
              {revealCorrect && isCorrect && ' ✓'}
              {isSelected && !isCorrect && showFeedback && ' ✗'}
            </button>
          )
        })}
      </div>
      {showFeedback && !revealCorrect && (
        <div style={{ fontSize: '12px', color: '#C05621', marginTop: '10px', fontWeight: 600 }}>
          Not quite — {triesLeft} {triesLeft === 1 ? 'try' : 'tries'} remaining!
        </div>
      )}
    </div>
  )
}
