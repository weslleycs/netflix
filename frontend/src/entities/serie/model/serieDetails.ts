export type SerieSeason = {
  id: number
  seasonNumber: number
  episodeCount: number
}

export type SerieDetails = {
  id: number
  title: string
  description: string
  imageUrl: string
  genre: string[]
  rate: number
  seasons: SerieSeason[]
}
