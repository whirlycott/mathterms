import { useState, useEffect } from 'react'

interface Props {
  onDismiss: () => void
}

const STEPS = [
  {
    text: 'These are the scrambled labels — drag one to the exhibit!',
    anchor: 'pool',
  },
  {
    text: 'Drop the label into the correct spot on the exhibit diagram.',
    anchor: 'exhibit',
  },
  {
    text: 'ERR-0R scrambled all the labels. Help restore the museum!',
    anchor: 'center',
  },
]

export function OnboardingOverlay({ onDismiss }: Props) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step >= STEPS.length) {
      onDismiss()
    }
  }, [step, onDismiss])

  if (step >= STEPS.length) return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.45)',
      zIndex: 500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    }}
      onClick={() => setStep(s => s + 1)}
    >
      <div style={{
        background: '#FAF3E0',
        border: '3px solid #C9A84C',
        borderRadius: '16px',
        padding: '28px 32px',
        maxWidth: '400px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#2D3748', lineHeight: 1.5, marginBottom: '16px' }}>
          {STEPS[step].text}
        </div>
        <div style={{ fontSize: '12px', color: '#718096' }}>
          Tap anywhere to continue ({step + 1}/{STEPS.length})
        </div>
      </div>
    </div>
  )
}
