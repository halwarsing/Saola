export type NewsInfo = {
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
  text?: string
  isActive?: boolean
  isFavorite?: boolean
}

export type FilterItemsOptions = {
  isActive: boolean
  onlyMyItems: boolean
  onlyFavorites: boolean
  group: string
}
