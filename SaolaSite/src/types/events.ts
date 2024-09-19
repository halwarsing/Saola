export type EventInfo = {
  id: string
  title: string
  author: string
  category: {
    id: string
    color: string
    label: string
  }
  created: Date
  tags: string[]
  updated?: Date
  editor?: number
  description?: string
  isActive?: boolean
  isFavorite?: boolean
}
