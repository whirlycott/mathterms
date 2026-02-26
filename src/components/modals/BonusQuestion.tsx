import { useState } from 'react'
import { BonusQuestion as BonusQuestionType } from '../../types'

interface Props {
  question: BonusQuestionType
  onAnswer: (correct: boolean) => void
}

export function BonusQuestion({ question, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null)

  const handleSelect = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    setTimeout(() => onAnswer(idx === question.correctIndex), 800)
  }

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
          if (selected !== null) {
            if (isCorrect) { bg = '#C6F6D5'; border = '#38A169' }
            else if (isSelected) { bg = '#FED7D7'; border = '#E53E3E' }
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
                background: isSelected && selected !== null ? bg : '#F5ECD7',
                cursor: selected !== null ? 'default' : 'pointer',
                textAlign: 'left',
                fontSize: '13px',
                color: '#2D3748',
                transition: 'background 0.2s',
                fontWeight: isCorrect && selected !== null ? 700 : 400,
              }}
            >
              {opt}
              {selected !== null && isCorrect && ' ✓'}
              {isSelected && !isCorrect && selected !== null && ' ✗'}
            </button>
          )
        })}
      </div>
    </div>
  )
}
