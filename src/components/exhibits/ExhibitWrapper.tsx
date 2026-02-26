import React from 'react'

interface Props {
  description: string
  children: React.ReactNode
}

export function ExhibitWrapper({ description, children }: Props) {
  return (
    <div
      role="region"
      aria-label={description}
      style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #E2E8F0' }}
    >
      {children}
    </div>
  )
}
