interface Props {
  glitching?: boolean
  size?: number
}

export function ErrBotAvatar({ glitching = false, size = 60 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      style={{
        animation: glitching ? 'errBotGlitch 0.3s steps(2) infinite' : undefined,
      }}
    >
      <style>{`
        @keyframes errBotGlitch {
          0%   { transform: translate(0, 0) skew(0deg); filter: hue-rotate(0deg); }
          25%  { transform: translate(-2px, 1px) skew(3deg); filter: hue-rotate(90deg); }
          50%  { transform: translate(2px, -1px) skew(-2deg); filter: hue-rotate(180deg); }
          75%  { transform: translate(-1px, 2px) skew(1deg); filter: hue-rotate(270deg); }
          100% { transform: translate(0, 0) skew(0deg); filter: hue-rotate(360deg); }
        }
      `}</style>
      {/* Body */}
      <rect x="10" y="20" width="40" height="32" rx="6" fill="#E53E3E"/>
      {/* Head */}
      <rect x="14" y="6" width="32" height="20" rx="5" fill="#FC8181"/>
      {/* Eyes */}
      <rect x="18" y="10" width="8" height="8" rx="2" fill="#FFF" />
      <rect x="34" y="10" width="8" height="8" rx="2" fill="#FFF"/>
      {/* Eye pupils (glitch = red, else black) */}
      <rect x="21" y="12" width="4" height="4" rx="1" fill={glitching ? '#ff0' : '#2D3748'}/>
      <rect x="37" y="12" width="4" height="4" rx="1" fill={glitching ? '#ff0' : '#2D3748'}/>
      {/* Mouth */}
      <rect x="20" y="32" width="20" height="6" rx="2" fill={glitching ? '#FBBF24' : '#FFF'}/>
      {/* Antenna */}
      <line x1="30" y1="6" x2="30" y2="2" stroke="#E53E3E" strokeWidth="2"/>
      <circle cx="30" cy="1" r="2" fill="#FC8181"/>
      {/* Arms */}
      <rect x="2" y="24" width="8" height="4" rx="2" fill="#E53E3E"/>
      <rect x="50" y="24" width="8" height="4" rx="2" fill="#E53E3E"/>
      {/* Legs */}
      <rect x="16" y="50" width="8" height="8" rx="2" fill="#C53030"/>
      <rect x="36" y="50" width="8" height="8" rx="2" fill="#C53030"/>
    </svg>
  )
}
