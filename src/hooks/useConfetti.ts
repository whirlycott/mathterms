import { useCallback } from 'react'

export function useConfetti() {
  const burst = useCallback(() => {
    const container = document.createElement('div')
    container.style.cssText = `
      position: fixed; inset: 0; pointer-events: none;
      z-index: 9999; overflow: hidden;
    `
    document.body.appendChild(container)

    const colors = ['#2C7A7B', '#C9A84C', '#7B2D3E', '#805AD5', '#DD6B20', '#38A169']
    const count = 80

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div')
      const color = colors[Math.floor(Math.random() * colors.length)]
      const x = Math.random() * 100
      const delay = Math.random() * 0.5
      const size = Math.random() * 8 + 6
      const rotation = Math.random() * 360
      piece.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: -20px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        transform: rotate(${rotation}deg);
        animation: confettiFall ${1.5 + Math.random()}s ${delay}s ease-in forwards;
      `
      container.appendChild(piece)
    }

    // Inject keyframes if not already present
    if (!document.getElementById('confetti-style')) {
      const style = document.createElement('style')
      style.id = 'confetti-style'
      style.textContent = `
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `
      document.head.appendChild(style)
    }

    setTimeout(() => container.remove(), 2500)
  }, [])

  return { burst }
}
