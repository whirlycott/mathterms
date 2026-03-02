export type RoomId =
  | 'operations'
  | 'division'
  | 'fractions'
  | 'decimals'
  | 'properties'
  | 'expressions'
  | 'measurement'
  | 'coordinates'

export type RoomStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'scrambled'

export interface TermRecord {
  id: string         // normalized lowercase slug
  displayTerm: string // capitalized display name
  definition: string
  roomId: RoomId
}

export interface SlotDefinition {
  id: string      // matches TermRecord.id
  label: string   // hint text shown when empty
  top: string     // percentage of ExhibitWrapper height
  left: string    // percentage of ExhibitWrapper width
  width: string   // fixed pixel width
}

export interface BonusQuestion {
  question: string
  options: string[]
  correctIndex: number
  dynamic?: boolean
}

export interface RoomDefinition {
  id: RoomId
  title: string
  subtitle: string
  accentColor: string    // CSS color value
  unlockAfter: RoomId[]  // rooms that must be completed first
  termIds: string[]      // which terms belong here
  slots: SlotDefinition[]
  bonusQuestions: BonusQuestion[]
  exhibitDescription: string
}

export interface RoomState {
  status: RoomStatus
  filledSlots: Record<string, string>  // slotId → termId placed there
  correctSlots: string[]               // array of correctly filled slotIds
  bonusAnswered: boolean
  confidence: Record<string, number>   // termId → 0-3
}

// Props passed to every exhibit component
export interface ExhibitProps {
  filledSlots: Record<string, string>  // slotId → displayTerm (already resolved)
  correctSlots: string[]
  shakingSlot: string | null
  accentColor: string
  numbers?: unknown  // Room-specific randomized exhibit numbers (typed per-component)
}

export interface GameState {
  screen: 'welcome' | 'museum' | 'room'
  activeRoomId: RoomId | null
  playerName: string
  badgeColor: string
  isMuted: boolean
  rooms: Record<RoomId, RoomState>
  errBotVisible: boolean
}
